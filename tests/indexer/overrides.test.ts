// overrides.test.ts — coverage mode (spec: 2026-08-13-binding-resolution-design.md §2.7).
//
// Coverage mode adds no edges. It records that a key has a second implementation and what gates it.
// It does NOT decide which one wins: `registerModel` resolves by module import order and the EE
// registration sits behind a dynamic import, so `resolvedAt: 'runtime'` is how that ignorance is
// recorded rather than hidden.
//
// Fixtures follow the shape verified in Rocket.Chat e75965c05d on 2026-08-13, which is two levels
// deep and NOT what a first reading suggests:
//
//     ee/server/models/startup.ts     void License.onLicense('livechat-enterprise', () => {
//                                         import('./LivechatDepartment');
//                                     });
//     ee/server/models/LivechatDepartment.ts
//                                     registerModel('ILivechatDepartmentModel', new ...EE(...));
//
// The registration is top level in its module; the MODULE is what the license gates. A rule
// looking for a registration lexically inside the onLicense callback matches zero rows.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Project } from 'ts-morph';
import { extractOverrides, pairOverrides, multiImplementationKeys } from '../../src/indexer/overrides.js';

const OPTS = { repoRoot: '/repo', keyspaceScope: 'test@extractor-v12' };

function project(files: Record<string, string>): Project {
    const p = new Project({ useInMemoryFileSystem: true, compilerOptions: { target: 99, strict: false } });
    for (const [name, body] of Object.entries(files)) p.createSourceFile(`/repo/${name}`, body);
    return p;
}

const MODELS = `
export function registerModel(name: string, instance: unknown) { void name; void instance; }
export const License = { onLicense(mod: string, cb: () => void) { void mod; void cb; } };
`;

// CE and EE halves live in different packages in the real repo (packages/models and
// apps/meteor/ee/server/models), so pairing cannot happen inside one shard.
const CE_AND_EE = {
    'models.ts': MODELS,
    'server/models/LivechatDepartment.ts': `
        import { registerModel } from '../../models';
        export class LivechatDepartmentRaw {}
        registerModel('ILivechatDepartmentModel', new LivechatDepartmentRaw());
    `,
    'ee/server/models/startup.ts': `
        import { License } from '../../../models';
        void License.onLicense('livechat-enterprise', () => {
            import('./LivechatDepartment');
        });
    `,
    'ee/server/models/LivechatDepartment.ts': `
        import { registerModel } from '../../../models';
        export class LivechatDepartmentEE {}
        registerModel('ILivechatDepartmentModel', new LivechatDepartmentEE());
    `,
};

const sitesOf = (p: Project) => extractOverrides(p.getSourceFiles(), OPTS);

test('a registration site records its key and the implementation it installs', () => {
    const sites = sitesOf(project(CE_AND_EE));

    assert.deepEqual(sites.map((s) => s.key).sort(),
        ['ILivechatDepartmentModel', 'ILivechatDepartmentModel']);
    assert.deepEqual(sites.map((s) => s.impl).sort(), [
        'ee/server/models/LivechatDepartment.ts#LivechatDepartmentEE',
        'server/models/LivechatDepartment.ts#LivechatDepartmentRaw',
    ]);
    assert.deepEqual([...new Set(sites.map((s) => s.source))], ['registerModel']);
});

test('the license condition comes from the gate on the module import, not from lexical nesting', () => {
    const sites = sitesOf(project(CE_AND_EE));

    const ee = sites.find((s) => s.impl.includes('EE'))!;
    const ce = sites.find((s) => s.impl.includes('Raw'))!;

    // The EE registration is top level in its own file; nothing lexically encloses it.
    assert.equal(ee.condition?.kind, 'license');
    assert.equal(ee.condition?.module, 'livechat-enterprise');
    assert.equal(ee.condition?.evalAt, 'import');
    assert.equal(ce.condition, undefined);
});

test('pairing happens across packages, not inside one shard', () => {
    const p = project(CE_AND_EE);
    const all = sitesOf(p);

    // Each half alone yields no override: one implementation is not an override of anything.
    const ceOnly = all.filter((s) => !s.impl.includes('ee/'));
    assert.deepEqual(pairOverrides(ceOnly), []);

    const overrides = pairOverrides(all);
    assert.equal(overrides.length, 1);
    assert.equal(overrides[0].key, 'ILivechatDepartmentModel');
    assert.equal(overrides[0].target, 'server/models/LivechatDepartment.ts#LivechatDepartmentRaw');
    assert.equal(overrides[0].by, 'ee/server/models/LivechatDepartment.ts#LivechatDepartmentEE');
});

test('an override never claims to know which implementation wins', () => {
    const overrides = pairOverrides(sitesOf(project(CE_AND_EE)));

    // Import order decides, and the EE side is behind a dynamic import. Static analysis cannot
    // answer this and must not pretend to.
    assert.equal(overrides[0].resolvedAt, 'runtime');
    assert.equal(overrides[0].condition?.module, 'livechat-enterprise');
});

test('an unconditional second registration is still an override, with no condition', () => {
    const p = project({
        'models.ts': MODELS,
        'a.ts': `
            import { registerModel } from './models';
            export class ARaw {}
            registerModel('IThing', new ARaw());
        `,
        'b.ts': `
            import { registerModel } from './models';
            export class BRaw {}
            registerModel('IThing', new BRaw());
        `,
    });

    const overrides = pairOverrides(sitesOf(p));

    assert.equal(overrides.length, 1);
    assert.equal(overrides[0].condition, undefined);
    assert.equal(overrides[0].resolvedAt, 'runtime');
});

test('overrides are enumerable as a multi-implementation list', () => {
    const p = project({
        ...CE_AND_EE,
        'server/models/Users.ts': `
            import { registerModel } from '../../models';
            export class UsersRaw {}
            registerModel('IUsersModel', new UsersRaw());
        `,
    });

    const list = multiImplementationKeys(pairOverrides(sitesOf(p)));

    // IUsersModel is registered once and must not appear.
    assert.deepEqual(list.map((e) => e.key), ['ILivechatDepartmentModel']);
    assert.equal(list[0].implementations.length, 2);
});

test('a single registration produces no override', () => {
    const p = project({
        'models.ts': MODELS,
        'only.ts': `
            import { registerModel } from './models';
            export class UsersRaw {}
            export class RoomsRaw {}
            registerModel('IUsersModel', new UsersRaw());
            registerModel('IRoomsModel', new RoomsRaw());
        `,
    });

    // Positive control: sites are found, they just do not pair.
    assert.equal(sitesOf(p).length, 2);
    assert.deepEqual(pairOverrides(sitesOf(p)), []);
});
