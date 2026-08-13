import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { Project } from 'ts-morph';
import { bindReference, referenceNodesOf } from '../../src/indexer/binding.js';

// A real Project with real files: binding is exactly the thing a per-file throwaway Project
// cannot do, so the fixtures must be a program the checker can actually resolve across.
const mkProject = (files: Record<string, string>) => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bind-'));
    for (const [rel, body] of Object.entries(files)) {
        const abs = path.join(root, rel);
        fs.mkdirSync(path.dirname(abs), { recursive: true });
        fs.writeFileSync(abs, body);
    }
    const project = new Project({
        skipAddingFilesFromTsConfig: true,
        compilerOptions: { allowJs: true, jsx: 4 /* ReactJSX */, target: 99, lib: ['lib.esnext.d.ts'] },
    });
    project.addSourceFilesAtPaths(path.join(root, '**/*.{ts,tsx}'));
    return { project, root };
};

const bindsIn = (root: string, project: any, rel: string) =>
    referenceNodesOf(project.getSourceFileOrThrow(path.join(root, rel)))
        .map(r => ({ edgeKind: r.edgeKind, bind: bindReference(r.node, root) }));

test('a chained builtin method binds to lib and is classified external, not to a same-named project symbol', () => {
    const { project, root } = mkProject({
        'src/util.ts': 'export function trim(s: string) { return s; }\nexport function map<T>(x: T) { return x; }\n',
        'src/use.ts': 'export function run(items: string[], text: string) {\n' +
                      '  const a = Object.keys({}).map(k => k);\n' +
                      '  const b = items.filter(Boolean).map(x => x);\n' +
                      '  const c = text.trim();\n' +
                      '  return [a, b, c];\n' +
                      '}\n',
    });
    const binds = bindsIn(root, project, 'src/use.ts');
    // every one of map/filter/map/trim resolves into lib.*.d.ts
    assert.ok(binds.length >= 4);
    assert.ok(binds.every(b => b.bind.kind !== 'def'),
        `expected no project bindings, got ${JSON.stringify(binds)}`);
    assert.ok(binds.some(b => b.bind.kind === 'external'));
});

test('builtin constructors produce no project binding', () => {
    const { project, root } = mkProject({
        'src/n.ts': 'export function f() { return [new Date(), new Map(), new Set(), new RegExp("x")]; }\n',
    });
    const binds = bindsIn(root, project, 'src/n.ts');
    assert.ok(binds.filter(b => b.edgeKind === 'new').length >= 4);
    assert.ok(binds.every(b => b.bind.kind !== 'def'));
});

test('an imported function binds to its defining declaration, across directories', () => {
    const { project, root } = mkProject({
        'packages/core/src/toast.ts': 'export function dispatchToastMessage(m: string) { return m; }\n',
        'apps/web/src/send.ts': 'import { dispatchToastMessage } from "../../../packages/core/src/toast.js";\n' +
                                'export function send() { dispatchToastMessage("hi"); }\n',
    });
    const binds = bindsIn(root, project, 'apps/web/src/send.ts');
    assert.ok(binds.some(b => b.bind.kind === 'def' &&
        (b.bind as any).defId === 'packages/core/src/toast.ts#dispatchToastMessage'));
});

test('two same-named functions in different files bind to their own declarations', () => {
    const { project, root } = mkProject({
        'src/rsa.ts': 'export function encrypt(x: string) { return x; }\n',
        'src/aes.ts': 'export function encrypt(x: string) { return x; }\n',
        'src/a.ts': 'import { encrypt } from "./rsa.js";\nexport function a() { encrypt("1"); }\n',
        'src/b.ts': 'import { encrypt } from "./aes.js";\nexport function b() { encrypt("2"); }\n',
    });
    const ids = (rel: string) => bindsIn(root, project, rel)
        .filter(b => b.bind.kind === 'def').map(b => (b.bind as any).defId);
    assert.deepEqual(ids('src/a.ts'), ['src/rsa.ts#encrypt']);
    assert.deepEqual(ids('src/b.ts'), ['src/aes.ts#encrypt']);
});

test('a method on a project type binds through the receiver, including chained receivers', () => {
    const { project, root } = mkProject({
        'src/api.ts': 'export class Data { isSubscribed() { return true; } }\n' +
                      'export class ChatAPI { get data(): Data { return new Data(); } }\n',
        'src/flow.ts': 'import type { ChatAPI } from "./api.js";\n' +
                       'export function flow(chat: ChatAPI) { return chat.data.isSubscribed(); }\n',
    });
    const ids = bindsIn(root, project, 'src/flow.ts')
        .filter(b => b.bind.kind === 'def').map(b => (b.bind as any).defId);
    assert.ok(ids.includes('src/api.ts#Data.isSubscribed'), JSON.stringify(ids));
});

test('JSX tags and type references are reference nodes with their own edge kinds', () => {
    const { project, root } = mkProject({
        'src/ui.tsx': 'export const Box = (p: { children?: unknown }) => null;\n' +
                      'export interface Props { id: string }\n' +
                      'export const App = (p: Props) => <Box />;\n',
    });
    const binds = bindsIn(root, project, 'src/ui.tsx');
    assert.ok(binds.some(b => b.edgeKind === 'jsx' && b.bind.kind === 'def' &&
        (b.bind as any).defId === 'src/ui.tsx#Box'));
    assert.ok(binds.some(b => b.edgeKind === 'type' && b.bind.kind === 'def' &&
        (b.bind as any).defId === 'src/ui.tsx#Props'));
});

test('an unresolvable reference is unbound with a reason, never guessed', () => {
    const { project, root } = mkProject({
        'src/any.ts': 'declare const box: any;\nexport function f() { return box.whatever(); }\n',
    });
    const binds = bindsIn(root, project, 'src/any.ts');
    const w = binds.find(b => b.edgeKind === 'call');
    assert.equal(w!.bind.kind, 'unbound');
    assert.ok((w!.bind as any).reason.length > 0);
});

test('an ambient declaration in a repo .d.ts is external, not a dangling def', () => {
    const { project, root } = mkProject({
        // buildShard excludes .d.ts when collecting defs, so a binding that pointed here would
        // name a defId that exists in no shard. Measured before this rule: 2 of 200 sampled edges.
        'types/globals.d.ts': 'declare function legacyHelper(x: string): string;\n',
        'src/uses.ts': 'export function f() { return legacyHelper("x"); }\n',
    });
    const binds = bindsIn(root, project, 'src/uses.ts');
    const call = binds.find(b => b.edgeKind === 'call');
    assert.equal(call!.bind.kind, 'external');
});
