import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { GLOBAL_INDEX, resetGlobalIndex } from '../../src/indexer/state.js';
import { readDefinition } from '../../src/engine/source-defs.js';
import type { Def } from '../../src/indexer/defs.js';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'src-'));
const write = (rel: string, body: string) => {
    const abs = path.join(root, rel);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, body);
};
const def = (o: Partial<Def> & Pick<Def, 'id' | 'file' | 'line' | 'endLine'>): Def => ({
    name: o.id.split('#')[1], qualifiedName: o.id.split('#')[1], kind: 'function',
    signature: '', exported: true, ...o,
} as Def);

beforeEach(() => resetGlobalIndex());

test('an implementation is read from the definition line range, with no name lookup', () => {
    write('src/a.ts', ['// header', 'export function target() {', '  return 42;', '}', 'export function other() {}'].join('\n'));
    GLOBAL_INDEX.defs.set('src/a.ts#target', def({ id: 'src/a.ts#target', file: 'src/a.ts', line: 2, endLine: 4 }));

    const impl = readDefinition('src/a.ts#target', root)!;

    assert.equal(impl.startLine, 2);
    assert.equal(impl.endLine, 4);
    assert.match(impl.text, /return 42/);
    assert.ok(!impl.text.includes('other'));
});

test('two same-named definitions read their own bodies', () => {
    write('src/rsa.ts', ['export function encrypt() {', '  return "rsa";', '}'].join('\n'));
    write('src/aes.ts', ['export function encrypt() {', '  return "aes";', '}'].join('\n'));
    GLOBAL_INDEX.defs.set('src/rsa.ts#encrypt', def({ id: 'src/rsa.ts#encrypt', file: 'src/rsa.ts', line: 1, endLine: 3 }));
    GLOBAL_INDEX.defs.set('src/aes.ts#encrypt', def({ id: 'src/aes.ts#encrypt', file: 'src/aes.ts', line: 1, endLine: 3 }));

    // The reading layer had its own name->file guess, distinct from the traversal's, so a
    // correctly anchored skeleton could still be handed the other file's body.
    assert.match(readDefinition('src/rsa.ts#encrypt', root)!.text, /rsa/);
    assert.match(readDefinition('src/aes.ts#encrypt', root)!.text, /aes/);
});

test('an unknown definition returns null instead of guessing a file', () => {
    assert.equal(readDefinition('src/nope.ts#missing', root), null);
});

test('a definition whose file has since shrunk is clamped, not thrown', () => {
    write('src/short.ts', 'export const a = 1;\n');
    GLOBAL_INDEX.defs.set('src/short.ts#a', def({ id: 'src/short.ts#a', file: 'src/short.ts', line: 1, endLine: 999 }));

    const impl = readDefinition('src/short.ts#a', root)!;

    assert.equal(impl.startLine, 1);
    assert.ok(impl.endLine <= 2);
});

test('a dispatch node has no body to read', () => {
    assert.equal(readDefinition('#dispatch/callbacks/afterSave', root), null);
});
