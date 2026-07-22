import { test } from 'node:test';
import assert from 'node:assert/strict';
import { questionTokens } from '../../../../src/server/engine/walker/affinity.js';
import { selectPages, resolveWikiFiles, selectSeedForPage, informativeTokens } from '../../../../src/server/engine/walker/entry.js';
import type { WikiMap, WikiPage } from '../../../../src/wikimap/schema.js';

const PAGE_NOTIF: WikiPage = {
    id: 'notifications', title: 'Notifications', category: '', scope: '', modules: [], seedFiles: [],
    page: 'Notifications',
    sections: ['Push Pipeline', 'Email Notifications'],
    diagrams: [{ nodes: { PUSH: 'sendPushNotification / push.ts' }, edges: [], subgraphs: [] }],
    source_files: { 'apps/meteor/server/lib/push.ts': ['1-10'], 'apps/meteor/gone.ts': [] },
};
const PAGE_AUTH: WikiPage = {
    id: 'authentication-and-authorization', title: 'Authentication and Authorization', category: '', scope: '', modules: [], seedFiles: [],
    page: 'Authentication and Authorization',
    sections: ['LDAP', 'OAuth'],
    diagrams: [{ nodes: {}, edges: [], subgraphs: [] }],
    source_files: { 'apps/meteor/server/auth.ts': [] },
};
const MAP: WikiMap = {
    repo: 'r', generated_at: '2026-01-01T00:00:00.000Z', derived_from: 'd',
    pages: [PAGE_NOTIF, PAGE_AUTH],
    file_to_pages: { 'apps/meteor/server/lib/push.ts': ['Notifications'] },
};

test('selectPages: a push question hits the Notifications page, with hitOn and score', () => {
    const tokens = questionTokens('How are push notifications triggered?');
    const step = selectPages(tokens, MAP)!;
    assert.equal(step.chosen[0], 'Notifications');
    assert.ok(step.options[0].score > 0.3);
    assert.ok(step.options[0].hitOn.length > 0);
    assert.ok(step.reason.includes('Notifications'));
});

test('selectPages: all below threshold returns null (triggers fallback)', () => {
    const step = selectPages(['zzzzqq'], MAP);
    assert.equal(step, null);
});

test('resolveWikiFiles: endsWith matches real paths, missing files go into missing', () => {
    const all = ['/abs/repo/apps/meteor/server/lib/push.ts', '/abs/repo/other.ts'];
    const { resolved, missing } = resolveWikiFiles(Object.keys(PAGE_NOTIF.source_files), all);
    assert.equal(resolved.get('apps/meteor/server/lib/push.ts'), '/abs/repo/apps/meteor/server/lib/push.ts');
    assert.deepEqual(missing, ['apps/meteor/gone.ts']);
});

test('selectSeedForPage: picks the best symbol per page by lexical score, with options and reason', () => {
    const tokens = questionTokens('How are push notifications triggered?');
    const { resolved } = resolveWikiFiles(Object.keys(PAGE_NOTIF.source_files), ['/abs/repo/apps/meteor/server/lib/push.ts']);
    const symbolsOfFile = (p: string) => p.endsWith('push.ts') ? ['sendPushNotification', 'initPush'] : [];
    const step = selectSeedForPage(tokens, PAGE_NOTIF, resolved, symbolsOfFile);
    assert.equal(step.chosen, 'initPush');
    assert.equal(step.page, 'Notifications');
    assert.ok(step.options.length >= 1);
    assert.ok(step.reason.length > 0);
});

test('selectSeedForPage: chosen = null when the page has no resolvable files', () => {
    const step = selectSeedForPage(['push'], PAGE_NOTIF, new Map(), () => []);
    assert.equal(step.chosen, null);
});

test('selectSeedForPage: ties are broken by symbol alphabetical order', () => {
    // zebraPush and alphaPush should have the same score for the token 'push',
    // and the tie-break should pick alphaPush (earlier alphabetically)
    const tokens = ['push'];
    const pageWithSymbols: WikiPage = {
        id: 'tiebreakpage', title: 'TieBreakPage', category: '', scope: '', modules: [], seedFiles: [],
        page: 'TieBreakPage',
        sections: [],
        diagrams: [{ nodes: {}, edges: [], subgraphs: [] }],
        source_files: { 'tie/symbols.ts': [] },
    };
    const { resolved } = resolveWikiFiles(Object.keys(pageWithSymbols.source_files), ['/abs/repo/tie/symbols.ts']);
    const symbolsOfFile = (p: string) => p.endsWith('symbols.ts') ? ['zebraPush', 'alphaPush'] : [];
    const step = selectSeedForPage(tokens, pageWithSymbols, resolved, symbolsOfFile);
    // if the scores are equal, it should pick alphaPush (earlier alphabetically)
    assert.equal(step.chosen, 'alphaPush');
});

test('informativeTokens: generic words matching more than half the pages are dropped, specific words are kept', () => {
    const generic = (name: string): WikiPage => ({
        id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), title: name, category: '', scope: '', modules: [], seedFiles: [],
        page: name, sections: [],
        diagrams: [{ nodes: { X: 'rocketchat deployment server' }, edges: [], subgraphs: [] }],
        source_files: {},
    });
    const map3: WikiMap = {
        repo: 'r', generated_at: '2026-01-01T00:00:00.000Z', derived_from: 'd',
        pages: [
            { ...generic('CI/CD Pipeline') },
            { ...generic('Development Workflow') },
            { id: 'notifications', title: 'Notifications', category: '', scope: '', modules: [], seedFiles: [],
              page: 'Notifications', sections: ['Push Pipeline'],
              diagrams: [{ nodes: { P: 'sendPushNotification / rocketchat push' }, edges: [], subgraphs: [] }],
              source_files: {} },
        ],
        file_to_pages: {},
    };
    const { kept, dropped } = informativeTokens(['rocketchat', 'push'], map3);
    assert.deepEqual(kept, ['push']);                       // hits only 1/3 pages
    assert.equal(dropped.length, 1);
    assert.equal(dropped[0].token, 'rocketchat');           // hits 3/3 pages → generic word
    assert.equal(dropped[0].df, 3);
});

test('informativeTokens: when everything is a generic word, fall back to the original tokens rather than dropping them all', () => {
    const map1: WikiMap = {
        repo: 'r', generated_at: '2026-01-01T00:00:00.000Z', derived_from: 'd',
        pages: [{ id: 'overview', title: 'Overview', category: '', scope: '', modules: [], seedFiles: [],
            page: 'Overview', sections: [],
            diagrams: [{ nodes: { X: 'rocketchat core' }, edges: [], subgraphs: [] }], source_files: {} }],
        file_to_pages: {},
    };
    const { kept, dropped } = informativeTokens(['rocketchat'], map1);
    assert.deepEqual(kept, ['rocketchat']);
    assert.deepEqual(dropped, []);
});

const mapSem = {
  pages: [
    { page: 'Integrations, Webhooks & Slash Commands', sections: [], diagrams: [], source_files: { 'a.ts': ['L1'] } },
    { page: 'Room Views', sections: [], diagrams: [], source_files: { 'b.ts': ['L1'] } },
  ],
} as any;

test('selectPages: pure semantics lifts up a page that lexical selection could not pick', () => {
  const tok = ['qzxvwq'];   // deliberate gibberish token: below the 0.3 threshold on both mapSem pages lexically
  // no semScores → lexical picks nothing → null (proves it is not lexical doing the selecting)
  assert.equal(selectPages(tok, mapSem, 0.3), null);
  // give semantic scores → only semantics puts it in the candidates → Slash page wins
  const sem = new Map([['Integrations, Webhooks & Slash Commands', 0.8], ['Room Views', 0.2]]);
  const r = selectPages(tok, mapSem, 0.3, { semScores: sem });
  assert.ok(r);
  assert.equal(r!.chosen[0], 'Integrations, Webhooks & Slash Commands');
});

test('selectPages: not passing semScores is consistent with the status quo (pure lexical)', () => {
  const r = selectPages(['room'], mapSem, 0.3);
  assert.ok(r);   // 'room' hits Room Views lexically
  assert.equal(r!.chosen[0], 'Room Views');
});

test('after merging expanded terms into tokens, lexical matching succeeds', () => {
  // the original question 'slash' does not match; the expanded term 'commands' → hits the Slash page
  const r = selectPages(['zzz'], mapSem, 0.3, { expandedTokens: ['commands'] });
  assert.ok(r);
  assert.equal(r!.chosen[0], 'Integrations, Webhooks & Slash Commands');
});

const mMod = { pages: [
  { page: 'LDAP Directory', sections: [], diagrams: [], source_files: { 'l.ts': ['L1'] }, modules: ['ldap'] },
  { page: 'Room Views', sections: [], diagrams: [], source_files: { 'r.ts': ['L1'] }, modules: ['ui'] },
] } as any;

test('candidate modules OR-gate (rescue branch): only when lexical is empty do semantics/candidate modules enter the candidates', () => {
  const tok = ['qzxvwq'];                                   // lexical is < 0.3 on both pages
  const semLow = new Map([['LDAP Directory', 0.2], ['Room Views', 0.1]]);
  // no semScores, no candidate modules → lexical empty, no rescue → null (proves it is not lexical doing the selecting)
  assert.equal(selectPages(tok, mMod, 0.3), null);
  // give semantic scores → lexical empty takes the rescue path → the highest semScore, LDAP Directory, wins (proves the rescue branch is doing the selecting)
  const r = selectPages(tok, mMod, 0.3, { semScores: semLow });
  assert.ok(r);
  assert.equal(r!.chosen[0], 'LDAP Directory');
  // candidate modules are prioritized on the rescue path → same effect (module ldap → LDAP Directory still ranks first)
  const r2 = selectPages(tok, mMod, 0.3, { semScores: semLow, candidateModules: ['ldap'] });
  assert.ok(r2);
  assert.equal(r2!.chosen[0], 'LDAP Directory');
});

test('candidate modules no-sem branch: when lexical is null, candidate-module pages still enter chosen', () => {
  const tok = ['qzxvwq'];                                   // lexical is null
  assert.equal(selectPages(tok, mMod, 0.3), null);          // no candidates → null
  const r = selectPages(tok, mMod, 0.3, { candidateModules: ['ldap'] });
  assert.ok(r);
  assert.equal(r!.chosen[0], 'LDAP Directory');
});

test('selectPages: multi-token corroboration — a single-evidence page (only push hits) is pushed down by a double-evidence page', () => {
    const gitPage: WikiPage = {
        id: 'ci-pipeline', title: 'CI Pipeline', category: '', scope: '', modules: [], seedFiles: [],
        page: 'CI Pipeline', sections: ['Push to develop'],
        diagrams: [{ nodes: {}, edges: [], subgraphs: [] }], source_files: {},
    };
    const msgPage: WikiPage = {
        id: 'messaging', title: 'Messaging', category: '', scope: '', modules: [], seedFiles: [],
        page: 'Messaging', sections: ['Push Notifications'],
        diagrams: [{ nodes: {}, edges: [], subgraphs: [] }], source_files: {},
    };
    const m: WikiMap = { repo: 'r', generated_at: '2026-01-01T00:00:00.000Z', derived_from: 'd', pages: [gitPage, msgPage], file_to_pages: {} };
    const step = selectPages(['push', 'notifications'], m)!;
    assert.equal(step.chosen[0], 'Messaging');
    const git = step.options.find(o => o.page === 'CI Pipeline')!;
    const msg = step.options.find(o => o.page === 'Messaging')!;
    assert.ok(msg.score > git.score, `double evidence ${msg.score} should be > single evidence ${git.score}`);
});
