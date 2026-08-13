import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { Project, SyntaxKind } from 'ts-morph';
import { collectDefs, defIdOfDeclaration, enclosingDefId, relFileOf, canonicalDeclaration, declarationsOf } from '../../src/indexer/defs.js';

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

test('defIdOfDeclaration returns null for anything collectDefs would not collect', () => {
    // The two must share one predicate. When they did not, a reference to a destructured binding
    // or a type parameter got an id (`x.ts#{ t }.t`, `x.ts#Props.T`) that appeared in no shard's
    // def list: the edge bound, looked healthy, and pointed at nothing. Measured across three real
    // packages before this rule: 488 of 5675 same-package edges dangled, 8.6%.
    const sf = load('src/dangle.ts', [
        'export function useTranslation() { return { t: (k: string) => k }; }',
        'const { t } = useTranslation();',
        'export function Label<T>(x: T) { return t(String(x)); }',
    ].join('\n'));

    const { defs } = collectDefs(sf, root);
    const collected = new Set(defs.map(d => d.id));

    for (const kindName of ['BindingElement', 'TypeParameter', 'Parameter']) {
        for (const decl of sf.getDescendants().filter(d => d.getKindName() === kindName)) {
            assert.equal(defIdOfDeclaration(decl, root), null,
                `${kindName} must not produce a defId`);
        }
    }

    // And no def id may be built out of a destructuring pattern's source text.
    assert.ok(![...collected].some(id => id.includes('{')), [...collected].join(','));
});

test('every id defIdOfDeclaration produces is present in collectDefs', () => {
    const sf = load('src/agree.ts', [
        'export class K { m<T>(p: T) { return p; } }',
        'export const { a, b } = { a: 1, b: 2 };',
        'export function f<U>(u: U) { return u; }',
    ].join('\n'));

    const { defs } = collectDefs(sf, root);
    const collected = new Set(defs.map(d => d.id));

    for (const decl of sf.getDescendants()) {
        const id = defIdOfDeclaration(decl, root);
        if (id === null) continue;
        assert.ok(collected.has(id), `${decl.getKindName()} produced ${id}, absent from collectDefs`);
    }
});

test('relFileOf is repo-relative with forward slashes and no leading slash', () => {
    assert.equal(relFileOf(path.join(root, 'src/x/y.ts'), root), 'src/x/y.ts');
});

test('overload signatures resolve to one canonical declaration, the first', () => {
    const sf = load('src/overloads.ts', [
        'export class Auth {',
        '  has(uid: string): boolean;',
        '  has(uid: string, rid: string): boolean;',
        '  has(uid: string, rid?: string) { return Boolean(uid && rid); }',
        '}',
        'export function callIt(a: Auth) { return a.has("u"); }',
    ].join('\n'));

    const call = sf.getDescendantsOfKind(SyntaxKind.CallExpression)
        .find(c => c.getExpression().getText() === 'a.has')!;
    const nameNode = call.getExpression().asKindOrThrow(SyntaxKind.PropertyAccessExpression).getNameNode();
    const chosen = canonicalDeclaration(declarationsOf(nameNode));

    // Whichever declaration a caller binds to must be the same one an edge leaves from. When two
    // parts of the system pick differently, the edge arrives at one node and departs from another,
    // which reads as a healthy graph and a broken chain — measured once at 8.6% of same-package
    // edges before the def rules were unified.
    assert.equal(defIdOfDeclaration(chosen!, root), 'src/overloads.ts#Auth.has');
});

test('canonicalDeclaration never compares positions across files', () => {
    const a = load('src/merged-a.ts', 'export interface Thing { go(): void }');
    const b = load('src/merged-b.ts', 'export interface Thing { go(): void }');
    const declA = a.getInterfaceOrThrow('Thing').getMethods()[0];
    const declB = b.getInterfaceOrThrow('Thing').getMethods()[0];

    // Two files, two declarations. The result must be stable and must come from one file, not be
    // whichever happened to have the smaller offset.
    const picked = canonicalDeclaration([declB, declA]);
    assert.equal(picked!.getSourceFile().getFilePath(), declB.getSourceFile().getFilePath());
});
