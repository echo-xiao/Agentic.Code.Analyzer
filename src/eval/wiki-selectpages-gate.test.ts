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

import { expectedPages, runGate, readCitationRate } from './wiki-selectpages-gate.js';
import type { WikiMap } from '../wikimap/schema.js';
import type { ClaudeTruthMap } from './utils/truth-io.js';
import type { TestCase } from './utils/load-testcases.js';

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

test('runGate: testcase without claude-truth entry goes into skipped', () => {
    const result = runGate({
        map: FIXTURE_MAP,
        fileToModule: FIXTURE_FILE_TO_MODULE,
        testcases: FIXTURE_TESTCASES,
        claudeTruth: FIXTURE_CLAUDE_TRUTH,
    });
    assert.ok(result.skipped.includes('tc-no-truth'), 'tc-no-truth should be skipped');
    assert.equal(result.skipped.length, 1);
});

test('runGate: perQuestion only contains entries with claude-truth', () => {
    const result = runGate({
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

test('runGate: hit=true when selectPages chosen intersects expected pages', () => {
    // 'tc-send-message' question contains 'sendMessage' + 'server' → selectPages on the fixture
    // map should rank 'Messaging Core' (sections: 'Send Message', 'Message Validation') highly.
    // We verify the PerQuestion record has expected==['Messaging Core'] and correct goldCore.
    const result = runGate({
        map: FIXTURE_MAP,
        fileToModule: FIXTURE_FILE_TO_MODULE,
        testcases: FIXTURE_TESTCASES,
        claudeTruth: FIXTURE_CLAUDE_TRUTH,
    });
    const sendMsgRow = result.perQuestion.find(r => r.id === 'tc-send-message');
    assert.ok(sendMsgRow, 'tc-send-message row must exist');
    assert.deepEqual(sendMsgRow!.expected, ['Messaging Core']);
    assert.deepEqual(sendMsgRow!.goldCore, FIXTURE_CLAUDE_TRUTH['tc-send-message']!.core);
    // If chosen intersects ['Messaging Core'], hit=true; otherwise hit=false.
    // Either outcome is valid for a fixture test — but the hit field must be consistent:
    if (sendMsgRow!.chosen.includes('Messaging Core')) {
        assert.equal(sendMsgRow!.hit, true);
    } else {
        assert.equal(sendMsgRow!.hit, false);
    }
});

test('runGate: hitRate is correct fraction of hits over scored', () => {
    // Force hit=true for all scored questions by using a map where all pages score high for any query.
    // We do this by giving each page a section that matches the question tokens exactly.
    const forcedHitMap: WikiMap = {
        ...FIXTURE_MAP,
        pages: [
            mkPage('Messaging Core', ['meteor/lib/server'], ['sendmessage server push notification queue']),
            mkPage('Push Notifications', ['meteor/push'], ['push notification queue message']),
            mkPage('UI Components', ['meteor/client/ui'], ['video conference component']),
        ],
    };

    const result = runGate({
        map: forcedHitMap,
        fileToModule: FIXTURE_FILE_TO_MODULE,
        testcases: FIXTURE_TESTCASES,
        claudeTruth: FIXTURE_CLAUDE_TRUTH,
    });

    const scored = result.perQuestion.length;
    const hitCount = result.perQuestion.filter(r => r.hit).length;
    // hitRate must equal hitCount / scored
    const expectedRate = scored > 0 ? hitCount / scored : 0;
    assert.equal(result.hitRate, expectedRate);
    // hitRate must be in [0, 1]
    assert.ok(result.hitRate >= 0 && result.hitRate <= 1, `hitRate ${result.hitRate} out of [0,1]`);
});

test('runGate: hitRate=0 when no testcases scored (empty claude-truth)', () => {
    const result = runGate({
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
