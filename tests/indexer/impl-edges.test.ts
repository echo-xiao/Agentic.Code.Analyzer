import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Project } from 'ts-morph';
import { implementationEdges } from '../../src/indexer/impl-edges.js';

const project = (files: Record<string, string>): Project => {
    const p = new Project({ useInMemoryFileSystem: true, compilerOptions: { target: 99, strict: false } });
    for (const [name, body] of Object.entries(files)) p.createSourceFile(`/repo/${name}`, body);
    return p;
};
const edgesIn = (p: Project, file: string) =>
    implementationEdges(p.getSourceFileOrThrow(`/repo/${file}`), '/repo');

test('an interface method reaches the class that implements it', () => {
    const p = project({
        'IAuthorization.ts': `
            export interface IAuthorization {
                canAccessRoom(room: unknown, user: unknown): Promise<boolean>;
            }
        `,
        // The real shape: extends a base class AND implements the interface at the same time.
        'service.ts': `
            import type { IAuthorization } from './IAuthorization';
            export abstract class ServiceClassInternal { protected name = ''; }
            export class AuthorizationService extends ServiceClassInternal implements IAuthorization {
                async canAccessRoom(room: unknown, user: unknown) { void room; void user; return true; }
            }
        `,
    });

    const edges = edgesIn(p, 'service.ts');

    // Direction is interface -> implementation: the traversal needs to know where to go after it
    // arrives at the interface. Without this edge the chain stops at a signature with no body,
    // which is what made six of seven regressed questions regress.
    assert.deepEqual(edges, [{
        from: 'IAuthorization.ts#IAuthorization.canAccessRoom',
        to: 'service.ts#AuthorizationService.canAccessRoom',
        implCount: 1,
    }]);
});

test('an abstract method reaches its concrete override', () => {
    const p = project({
        'UserBridge.ts': `
            export abstract class UserBridge {
                protected abstract getBySipExtension(extension: string): Promise<unknown>;
            }
            export class ConcreteUserBridge extends UserBridge {
                protected async getBySipExtension(extension: string) { return extension; }
            }
        `,
    });

    const edges = edgesIn(p, 'UserBridge.ts');

    assert.deepEqual(edges.map(e => `${e.from} -> ${e.to}`), [
        'UserBridge.ts#UserBridge.getBySipExtension -> UserBridge.ts#ConcreteUserBridge.getBySipExtension',
    ]);
});

test('two classes implementing one interface produce two edges, both marked', () => {
    const p = project({
        'IStore.ts': `export interface IStore { save(x: unknown): void }`,
        'a.ts': `
            import type { IStore } from './IStore';
            export class MemoryStore implements IStore { save(x: unknown) { void x; } }
        `,
        'b.ts': `
            import type { IStore } from './IStore';
            export class DiskStore implements IStore { save(x: unknown) { void x; } }
        `,
    });

    const all = [...edgesIn(p, 'a.ts'), ...edgesIn(p, 'b.ts')];

    // Both are connected and both say how many there are. Silently picking one is the worst
    // option: the graph looks complete and the reader never learns there is a fork.
    assert.equal(all.length, 2);
    assert.deepEqual([...new Set(all.map(e => e.implCount))], [2]);
    assert.deepEqual(all.map(e => e.to).sort(), ['a.ts#MemoryStore.save', 'b.ts#DiskStore.save']);
});

test('a same-named method on an unrelated class is not an implementation', () => {
    const p = project({
        'IStore.ts': `export interface IStore { save(x: unknown): void }`,
        'mixed.ts': `
            import type { IStore } from './IStore';
            export class RealStore implements IStore { save(x: unknown) { void x; } }
            export class Unrelated { save(x: unknown) { void x; } }
        `,
    });

    // Matching by name across the repo is exactly what the old name-keyed graph did, and why it
    // connected calls to the wrong declaration. The heritage clause is the evidence.
    assert.deepEqual(edgesIn(p, 'mixed.ts').map(e => e.to), ['mixed.ts#RealStore.save']);
});

test('an interface with no implementer produces no edge', () => {
    const p = project({ 'IOrphan.ts': `export interface IOrphan { doThing(): void }` });

    assert.deepEqual(edgesIn(p, 'IOrphan.ts'), []);
});

test('a class method that no interface declares produces no edge', () => {
    const p = project({
        'plain.ts': `export class Plain { helper() { return 1; } }`,
    });

    assert.deepEqual(edgesIn(p, 'plain.ts'), []);
});

test('overloaded interface methods yield one edge, from the declaration callers bind to', () => {
    const p = project({
        'IAuth.ts': `
            export interface IAuth {
                has(uid: string): Promise<boolean>;
                has(uid: string, rid: string): Promise<boolean>;
            }
        `,
        'service.ts': `
            import type { IAuth } from './IAuth';
            export class AuthService implements IAuth {
                async has(uid: string, rid?: string) { return Boolean(uid && rid); }
            }
        `,
    });

    const edges = edgesIn(p, 'service.ts');

    // One edge, and it must start at the SAME declaration bindReference resolves a call to.
    // Deduplicating by any other rule would leave callers arriving at one signature while the
    // edge departs from another — a healthy-looking graph with a broken chain.
    assert.equal(edges.length, 1);
    assert.equal(edges[0].from, 'IAuth.ts#IAuth.has');
});
