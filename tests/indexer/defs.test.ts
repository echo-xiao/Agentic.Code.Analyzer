import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { Project, SyntaxKind } from 'ts-morph';
import { collectDefs, defIdOfDeclaration, enclosingDefId, relFileOf } from '../../src/indexer/defs.js';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'defs-'));
const load = (rel: string, body: string) => {
    const abs = path.join(root, rel);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, body);
    const project = new Project({ skipAddingFilesFromTsConfig: true, compilerOptions: { allowJs: true } });
    return project.addSourceFileAtPath(abs);
};

test('collectDefs ids every declaration kind by file and qualified name', () => {
    const sf = load('src/a.ts', [
        'export function sendMessage() { return 1; }',
        'export class Room {',
        '  save() {}',
        '  private cache = new Map();',
        '}',
        'export interface IRoom { id: string }',
        'export type RoomId = string;',
        'export enum Kind { A }',
        'export const helper = () => 2;',
    ].join('\n'));

    const { defs } = collectDefs(sf, root);
    const ids = defs.map(d => d.id).sort();
    // Interface members ARE defs. A call on an interface-typed receiver
    // (`svc.saveRoom()` where `svc: IRoomService`) resolves to a MethodSignature, so if
    // MethodSignature/PropertySignature are not collected, that edge points at a defId
    // absent from `defs` — a dangling node. Verified against ts-morph directly.
    // The `#<module>` def is always present — see collectDefs' comment on why it is unconditional.
    assert.deepEqual(ids, [
        'src/a.ts#<module>', 'src/a.ts#IRoom', 'src/a.ts#IRoom.id', 'src/a.ts#Kind',
        'src/a.ts#Room', 'src/a.ts#Room.cache', 'src/a.ts#Room.save', 'src/a.ts#RoomId',
        'src/a.ts#helper', 'src/a.ts#sendMessage',
    ]);

    const room = defs.find(d => d.id === 'src/a.ts#Room')!;
    assert.equal(room.kind, 'class');
    assert.equal(room.name, 'Room');
    assert.equal(room.exported, true);
    assert.equal(room.line, 2);
    assert.equal(room.endLine, 5);
    assert.equal(defs.find(d => d.id === 'src/a.ts#Room.save')!.kind, 'method');
});

test('top-level statements belong to a synthetic module def named after the path, not the basename', () => {
    const a = load('src/one/index.ts', 'register("x", () => {});');
    const b = load('src/two/index.ts', 'register("y", () => {});');
    const idA = collectDefs(a, root).defs.find(d => d.kind === 'module')!.id;
    const idB = collectDefs(b, root).defs.find(d => d.kind === 'module')!.id;
    assert.equal(idA, 'src/one/index.ts#<module>');
    assert.notEqual(idA, idB);            // basename naming collapsed these into one symbol
});

test('same qualified name twice in one file gets a stable ordinal', () => {
    const sf = load('src/dup.ts', [
        'function outer1() { function inner() {} return inner; }',
        'function outer2() { function inner() {} return inner; }',
    ].join('\n'));
    const ids = collectDefs(sf, root).defs.map(d => d.id).filter(i => i.includes('inner'));
    assert.deepEqual(ids.sort(), ['src/dup.ts#outer1.inner', 'src/dup.ts#outer2.inner']);
});

test('defIdOfDeclaration agrees with collectDefs for the same declaration', () => {
    const sf = load('src/b.ts', 'export function target() {}');
    const decl = sf.getFunctionOrThrow('target');
    assert.equal(defIdOfDeclaration(decl, root), 'src/b.ts#target');
    assert.equal(collectDefs(sf, root).defs.find(d => d.name === 'target')!.id, 'src/b.ts#target');
});

test('enclosingDefId returns the innermost range containing a position', () => {
    const sf = load('src/c.ts', 'export class K {\n  m() { helper(); }\n}');
    const { ranges } = collectDefs(sf, root);
    const call = sf.getDescendantsOfKind(SyntaxKind.CallExpression)[0];
    assert.equal(enclosingDefId(call.getStart(), ranges), 'src/c.ts#K.m');
});

test('relFileOf is repo-relative with forward slashes and no leading slash', () => {
    assert.equal(relFileOf(path.join(root, 'src/x/y.ts'), root), 'src/x/y.ts');
});
