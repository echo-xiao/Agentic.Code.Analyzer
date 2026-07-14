/**
 * wiki-selectpages-gate.test.ts — fixture 单测（零 API，零真实 data/ 读取）。
 *
 * 不调 ensureIndex()，不读 data/wiki-map.json / module-graph.json。
 * 全部用 fixture map + fixture claude-truth + fixture testcases 验证逻辑正确性。
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';

import { expectedPages, runGate, readCitationRate } from '../../src/eval/wiki-selectpages-gate.js';
import type { WikiMap } from '../../src/wikimap/schema.js';
import type { ClaudeTruthMap } from '../../src/eval/utils/truth-io.js';
import type { TestCase } from '../../src/eval/utils/load-testcases.js';

// ── Fixture helpers ───────────────────────────────────────────────────────────

/** Minimal WikiPage that satisfies the schema fields used by selectPages + expectedPages. */
function mkPage(page: string, modules: string[], sections: string[] = []): WikiMap['pages'][number] {
    return {
        id: page.toLowerCase().replace(/\s+/g, '-'),
        title: page,
        category: 'Test',
        scope: '',
        modules,
        seedFiles: [],
        page,
        sections,
        diagrams: [],
        source_files: {},
    };
}

/**
 * Fixture WikiMap with 3 pages:
 *   - "Messaging Core"     modules: ['meteor/lib/server']
 *   - "Push Notifications" modules: ['meteor/push']
 *   - "UI Components"      modules: ['meteor/client/ui']
 */
const FIXTURE_MAP: WikiMap = {
    repo: 'test/repo',
    generated_at: '2026-01-01T00:00:00Z',
    derived_from: 'self-generated test',
    pages: [
        mkPage('Messaging Core', ['meteor/lib/server'], ['Send Message', 'Message Validation']),
        mkPage('Push Notifications', ['meteor/push'], ['Push Flow', 'Notification Queue']),
        mkPage('UI Components', ['meteor/client/ui'], ['Chat Box', 'Message Composer']),
    ],
    file_to_pages: {},
};

/**
 * Fixture file → module map.
 * Maps the core files from claude-truth fixture entries to module IDs.
 */
const FIXTURE_FILE_TO_MODULE: Record<string, string> = {
    'apps/meteor/app/lib/server/functions/sendMessage.ts': 'meteor/lib/server',
    'apps/meteor/app/lib/server/methods/sendMessage.ts': 'meteor/lib/server',
    'apps/meteor/app/notification-queue/server/NotificationQueue.ts': 'meteor/push',
    'apps/meteor/app/push-notifications/server/PushNotifications.ts': 'meteor/push',
    'apps/meteor/client/components/ChatBox.tsx': 'meteor/client/ui',
    // a file with no module mapping (for edge-case coverage)
    'apps/meteor/untracked/file.ts': '',
};

/** Fixture claude-truth: 2 entries with distinct core files. */
const FIXTURE_CLAUDE_TRUTH: ClaudeTruthMap = {
    'tc-send-message': {
        core: [
            'apps/meteor/app/lib/server/functions/sendMessage.ts',
            'apps/meteor/app/lib/server/methods/sendMessage.ts',
        ],
        supporting: [],
        chain: [],
        keySymbols: ['sendMessage'],
    },
    'tc-push': {
        core: [
            'apps/meteor/app/notification-queue/server/NotificationQueue.ts',
        ],
        supporting: [],
        chain: [],
        keySymbols: ['NotificationQueue'],
    },
};

/** Fixture testcases: 3 questions (2 with claude-truth, 1 without). */
const FIXTURE_TESTCASES: TestCase[] = [
    {
        id: 'tc-send-message',
        question: 'How does sendMessage work on the server?',
        questionType: 'call-chain',
        subsystem: 'messaging',
        difficulty: 'medium',
    },
    {
        id: 'tc-push',
        question: 'How does the push notification queue process messages?',
        questionType: 'architecture',
        subsystem: 'push',
        difficulty: 'medium',
    },
    {
        id: 'tc-no-truth',
        question: 'What is the UI component for video conferences?',
        questionType: 'locate',
        subsystem: 'video',
        difficulty: 'easy',
    },
];

// ── Tests ─────────────────────────────────────────────────────────────────────

test('expectedPages: maps core files → modules → pages correctly', () => {
    // tc-send-message: both core files belong to 'meteor/lib/server' → "Messaging Core"
    const pages = expectedPages(
        FIXTURE_CLAUDE_TRUTH['tc-send-message']!.core,
        FIXTURE_MAP,
        FIXTURE_FILE_TO_MODULE,
    );
    assert.deepEqual(pages, ['Messaging Core']);
});

test('expectedPages: returns multiple pages when core files span multiple modules', () => {
    // files in meteor/lib/server AND meteor/push → "Messaging Core" + "Push Notifications"
    const pages = expectedPages(
        [
            'apps/meteor/app/lib/server/functions/sendMessage.ts',
            'apps/meteor/app/notification-queue/server/NotificationQueue.ts',
        ],
        FIXTURE_MAP,
        FIXTURE_FILE_TO_MODULE,
    );
    assert.deepEqual(pages.sort(), ['Messaging Core', 'Push Notifications'].sort());
});

test('expectedPages: returns [] when no core file has a known module', () => {
    const pages = expectedPages(
        ['apps/meteor/untracked/file.ts', 'apps/meteor/totally-unknown.ts'],
        FIXTURE_MAP,
        FIXTURE_FILE_TO_MODULE,
    );
    assert.deepEqual(pages, []);
});

test('expectedPages: deduplicates pages when multiple core files share the same module', () => {
    // Both sendMessage files map to 'meteor/lib/server' → only 1 page
    const core = [
        'apps/meteor/app/lib/server/functions/sendMessage.ts',
        'apps/meteor/app/lib/server/methods/sendMessage.ts',
    ];
    const pages = expectedPages(core, FIXTURE_MAP, FIXTURE_FILE_TO_MODULE);
    assert.equal(pages.length, 1);
    assert.equal(pages[0], 'Messaging Core');
});

test('runGate: testcase without claude-truth entry goes into skipped', async () => {
    const result = await runGate({
        map: FIXTURE_MAP,
        fileToModule: FIXTURE_FILE_TO_MODULE,
        testcases: FIXTURE_TESTCASES,
        claudeTruth: FIXTURE_CLAUDE_TRUTH,
    });
    assert.ok(result.skipped.includes('tc-no-truth'), 'tc-no-truth should be skipped');
    assert.equal(result.skipped.length, 1);
});

test('runGate: perQuestion only contains entries with claude-truth', async () => {
    const result = await runGate({
        map: FIXTURE_MAP,
        fileToModule: FIXTURE_FILE_TO_MODULE,
        testcases: FIXTURE_TESTCASES,
        claudeTruth: FIXTURE_CLAUDE_TRUTH,
    });
    const ids = result.perQuestion.map(r => r.id);
    assert.ok(ids.includes('tc-send-message'));
    assert.ok(ids.includes('tc-push'));
    assert.ok(!ids.includes('tc-no-truth'));
    assert.equal(ids.length, 2);
});

test('runGate: hit=true — deterministic fixture forces selectPages to choose the expected page', async () => {
    // questionTokens('How does sendMessage work on the server?') produces:
    //   ["send", "message", "server"]
    //   ("how", "does", "work" are stopwords; camelCase split fires on sendMessage)
    // K = min(2, 3) = 2.  Top-2 token average must exceed PAGE_THRESHOLD (0.3).
    //
    // We craft a map with exactly ONE page whose title is "Send Message Server"
    // (exact token strings embedded → fuzzysort scores approach 1.0 per token)
    // and all other pages have unrelated text that cannot score ≥ 0.3 for these tokens.
    //
    // The gold core for tc-send-message maps to module 'meteor/lib/server' which
    // corresponds to page 'Send Message Server' in this fixture map.
    const deterministicMap: WikiMap = {
        repo: 'test/repo',
        generated_at: '2026-01-01T00:00:00Z',
        derived_from: 'deterministic test',
        pages: [
            // Target page: title embeds all three informative tokens → near-perfect score
            mkPage('Send Message Server', ['meteor/lib/server'], ['send message server handler']),
            // Decoy pages: completely unrelated vocabulary → cannot score ≥ 0.3 for ["send","message","server"]
            mkPage('Database Migration', ['meteor/db'], ['schema upgrade rollback']),
            mkPage('OAuth Login', ['meteor/auth'], ['token refresh credential']),
        ],
        file_to_pages: {},
    };

    const deterministicFileToModule: Record<string, string> = {
        'apps/meteor/app/lib/server/functions/sendMessage.ts': 'meteor/lib/server',
        'apps/meteor/app/lib/server/methods/sendMessage.ts': 'meteor/lib/server',
    };

    const deterministicTruth: ClaudeTruthMap = {
        'tc-send-message': {
            core: [
                'apps/meteor/app/lib/server/functions/sendMessage.ts',
                'apps/meteor/app/lib/server/methods/sendMessage.ts',
            ],
            supporting: [],
            chain: [],
            keySymbols: ['sendMessage'],
        },
    };

    const deterministicTestcases: TestCase[] = [
        {
            id: 'tc-send-message',
            question: 'How does sendMessage work on the server?',
            questionType: 'call-chain',
            subsystem: 'messaging',
            difficulty: 'medium',
        },
    ];

    const result = await runGate({
        map: deterministicMap,
        fileToModule: deterministicFileToModule,
        testcases: deterministicTestcases,
        claudeTruth: deterministicTruth,
    });

    const row = result.perQuestion.find(r => r.id === 'tc-send-message');
    assert.ok(row, 'tc-send-message row must exist');
    assert.deepEqual(row!.expected, ['Send Message Server'], 'expected page must be "Send Message Server"');
    // selectPages MUST have chosen "Send Message Server" — its title embeds the exact tokens,
    // so its score is guaranteed > PAGE_THRESHOLD (0.3). Assert unconditionally (no if/else).
    assert.ok(
        row!.chosen.includes('Send Message Server'),
        `selectPages must select "Send Message Server" for tokens ["send","message","server"]; chosen=${JSON.stringify(row!.chosen)}`,
    );
    assert.equal(row!.hit, true, 'hit must be true when the expected page was chosen');
});

test('runGate: hitRate=0.5 — 2-question fixture with exactly 1 hit and 1 miss designed a priori', async () => {
    // Design:
    //   tc-hit:  question "send message server" → tokens ["send","message","server"] (K=2)
    //            gold core → module 'mod/hit' → page "Send Message Server" (title embeds tokens)
    //            selectPages will score "Send Message Server" above PAGE_THRESHOLD → HIT
    //
    //   tc-miss: question "database query optimize" → tokens ["databas","queri","optim"] (singularized)
    //            gold core → module 'mod/miss' → page "Push Notification Queue"
    //            The only page that can score for ["databas","queri","optim"] is "Database Query Optimize",
    //            but that page belongs to module 'mod/other' (not 'mod/miss') →
    //            expected = ["Push Notification Queue"], chosen ∩ expected = ∅ → MISS
    //
    // Expected hitRate = 1/2 = 0.5, known purely from fixture design.

    const splitMap: WikiMap = {
        repo: 'test/repo',
        generated_at: '2026-01-01T00:00:00Z',
        derived_from: 'hitrate split test',
        pages: [
            // Scores high for tc-hit's tokens; belongs to mod/hit → tc-hit HIT
            mkPage('Send Message Server', ['mod/hit'], ['send message server handler']),
            // Scores high for tc-miss's tokens; belongs to mod/other (NOT mod/miss) → tc-miss MISS
            mkPage('Database Query Optimize', ['mod/other'], ['database query optimize index']),
            // The page tc-miss EXPECTS; belongs to mod/miss but unrelated text → won't be chosen
            mkPage('Push Notification Queue', ['mod/miss'], ['push notification queue async']),
        ],
        file_to_pages: {},
    };

    const splitFileToModule: Record<string, string> = {
        'src/hit/handler.ts': 'mod/hit',
        'src/miss/queue.ts': 'mod/miss',
    };

    const splitTruth: ClaudeTruthMap = {
        'tc-hit': {
            core: ['src/hit/handler.ts'],    // mod/hit → expected = ["Send Message Server"]
            supporting: [], chain: [], keySymbols: [],
        },
        'tc-miss': {
            core: ['src/miss/queue.ts'],     // mod/miss → expected = ["Push Notification Queue"]
            supporting: [], chain: [], keySymbols: [],
        },
    };

    const splitTestcases: TestCase[] = [
        {
            id: 'tc-hit',
            // tokens after questionTokens: ["send","message","server"] — matches "Send Message Server"
            question: 'send message server',
            questionType: 'call-chain', subsystem: 'msg', difficulty: 'easy',
        },
        {
            id: 'tc-miss',
            // tokens after questionTokens: ["databas","queri","optim"] (singularized)
            // → matches "Database Query Optimize" (mod/other), but expected is "Push Notification Queue" (mod/miss)
            question: 'databases queries optimize',
            questionType: 'architecture', subsystem: 'db', difficulty: 'easy',
        },
    ];

    const result = await runGate({
        map: splitMap,
        fileToModule: splitFileToModule,
        testcases: splitTestcases,
        claudeTruth: splitTruth,
    });

    assert.equal(result.perQuestion.length, 2, '2 scored questions');
    // Assert specific per-question outcomes derived from fixture design:
    const hitRow = result.perQuestion.find(r => r.id === 'tc-hit');
    const missRow = result.perQuestion.find(r => r.id === 'tc-miss');
    assert.ok(hitRow, 'tc-hit row must exist');
    assert.ok(missRow, 'tc-miss row must exist');
    assert.equal(hitRow!.hit, true, 'tc-hit must be HIT (fixture designed so "Send Message Server" is chosen)');
    assert.equal(missRow!.hit, false, 'tc-miss must be MISS ("Push Notification Queue" cannot be chosen for db/query tokens)');
    // hitRate must equal exactly 0.5 — derived from fixture design, not from result counting
    assert.equal(result.hitRate, 0.5, `hitRate must be 0.5; got ${result.hitRate}`);
    assert.equal(result.perQuestion.filter(r => r.hit).length, 1, 'exactly 1 of 2 questions hit');
});

test('runGate: hitRate=0 when no testcases scored (empty claude-truth)', async () => {
    const result = await runGate({
        map: FIXTURE_MAP,
        fileToModule: FIXTURE_FILE_TO_MODULE,
        testcases: FIXTURE_TESTCASES,
        claudeTruth: {},
    });
    assert.equal(result.hitRate, 0);
    assert.equal(result.perQuestion.length, 0);
    assert.equal(result.skipped.length, 3);
});

test('readCitationRate: parses percentage from wiki-verify.md', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wiki-gate-test-'));
    const tmpFile = path.join(tmpDir, 'wiki-verify.md');
    fs.writeFileSync(tmpFile, [
        '# wiki:verify Report',
        '',
        '**citation_validity_rate:** 92.5%',
        '**uncited_chapters:** 3 (chapters with zero citations; excluded from rate)',
    ].join('\n'));
    const rate = readCitationRate(tmpFile);
    assert.ok(rate !== null, 'rate should not be null');
    assert.ok(Math.abs(rate! - 0.925) < 1e-9, `rate should be ~0.925, got ${rate}`);
    fs.rmSync(tmpDir, { recursive: true });
});

test('readCitationRate: returns null when file does not exist', () => {
    const rate = readCitationRate('/tmp/this-file-does-not-exist-wiki-gate.md');
    assert.equal(rate, null);
});

test('runGate: verifyPath injection — citationRate equals rate parsed from injected temp file', async () => {
    // Inject a temp wiki-verify.md with a known rate (75.0%) via GateOpts.verifyPath.
    // runGate must read from verifyPath instead of the hardcoded WIKI_VERIFY_PATH,
    // so result.citationRate must equal 0.75 regardless of what lives on real disk.
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wiki-gate-verifypath-'));
    const tmpFile = path.join(tmpDir, 'wiki-verify.md');
    fs.writeFileSync(tmpFile, [
        '# wiki:verify Report',
        '',
        '**citation_validity_rate:** 75.0%',
    ].join('\n'));
    try {
        const result = await runGate({
            map: FIXTURE_MAP,
            fileToModule: FIXTURE_FILE_TO_MODULE,
            testcases: FIXTURE_TESTCASES,
            claudeTruth: FIXTURE_CLAUDE_TRUTH,
            verifyPath: tmpFile,
        });
        assert.ok(result.citationRate !== null, 'citationRate must not be null when verifyPath file exists');
        assert.ok(
            Math.abs(result.citationRate! - 0.75) < 1e-9,
            `citationRate must be 0.75 from injected file; got ${result.citationRate}`,
        );
    } finally {
        fs.rmSync(tmpDir, { recursive: true });
    }
});

test('runGate: verifyPath pointing at nonexistent file → citationRate === null', async () => {
    const result = await runGate({
        map: FIXTURE_MAP,
        fileToModule: FIXTURE_FILE_TO_MODULE,
        testcases: FIXTURE_TESTCASES,
        claudeTruth: FIXTURE_CLAUDE_TRUTH,
        verifyPath: '/tmp/nonexistent-wiki-verify-gate-test.md',
    });
    assert.equal(result.citationRate, null, 'citationRate must be null when verifyPath does not exist');
});
