// overrides.ts — coverage mode (spec: 2026-08-13-binding-resolution-design.md §2.7).
//
// Adds no edges. Records that a key has a second implementation and what gates it, so a reader
// does not take an edge pointing at the CE class for the only thing that can run. It does NOT
// decide which implementation wins: `registerModel` resolves by module import order and the EE
// half sits behind a dynamic import, so `resolvedAt: 'runtime'` states that ignorance instead of
// hiding it.
//
// Two stages, because the halves live in different packages — CE in packages/models and
// apps/meteor/server/models, EE in apps/meteor/ee/server/models. A shard sees one side at most:
//
//   extractOverrides(files)   per package: every registration site, plus its condition
//   pairOverrides(sites)      globally: a key with two or more implementations becomes an override
//
// The condition is one level removed from the registration, which is the thing worth remembering:
//
//   ee/server/models/startup.ts   void License.onLicense('livechat-enterprise', () => {
//                                     import('./LivechatDepartment');
//                                 });
//   ee/server/models/LivechatDepartment.ts
//                                 registerModel('ILivechatDepartmentModel', new ...EE(...));
//
// The registration is top level in its own module; the MODULE is what the license gates. Looking
// for a registration lexically inside the callback finds nothing in the real repo.
import { Node, SourceFile, SyntaxKind } from 'ts-morph';
import * as path from 'path';
import { defIdOfDeclaration, enclosingDefId, collectDefs, relFileOf } from './defs.js';
import type { ExtractOpts, Variant } from './idioms.js';

export interface Condition {
    kind: 'license' | 'setting' | 'transport';
    module?: string;
    expr?: string;
    evalAt: 'import' | 'call';
}

export type OverrideSource =
    | 'registerModel' | 'patch-injection' | 'module-override'
    | 'class-on-license' | 'slot-replacement' | 'monkey-patch' | 'deployment-cutoff';

// One registration observed in one file. Not yet an override: being the only implementation of a
// key is the normal case.
export interface OverrideSite {
    key: string;
    impl: string;                    // defId of the class being installed
    at: string;                      // defId of the enclosing definition
    file: string;
    source: OverrideSource;
    condition?: Condition;
    variant?: Variant;
}

export interface Override {
    key: string;
    target: string;                  // the implementation registered first
    by: string;                      // the one registered later
    source: OverrideSource;
    condition?: Condition;
    variant?: Variant;
    resolvedAt: 'runtime';
}

// Modules pulled in by a dynamic import inside a `License.onLicense(mod, cb)` callback. Everything
// those modules register at top level is conditional on `mod`, however deep the file sits.
function licenseGatedModules(sf: SourceFile, repoRoot: string): Map<string, string> {
    const gated = new Map<string, string>();       // resolved file path -> license module
    const dir = path.dirname(sf.getFilePath());

    sf.forEachDescendant(node => {
        if (!Node.isCallExpression(node)) return;
        const callee = node.getExpression();
        const name = Node.isPropertyAccessExpression(callee) ? callee.getName() : null;
        if (name !== 'onLicense') return;

        const args = node.getArguments();
        const mod = args[0];
        if (!mod || !Node.isStringLiteral(mod)) return;
        const licenseModule = mod.getLiteralValue();

        const body = args[1];
        if (!body) return;
        body.forEachDescendant(inner => {
            if (!Node.isCallExpression(inner)) return;
            if (inner.getExpression().getKind() !== SyntaxKind.ImportKeyword) return;
            const spec = inner.getArguments()[0];
            if (!spec || !Node.isStringLiteral(spec)) return;
            // `import('./LivechatDepartment')` — resolve against the gating file's directory.
            const rel = spec.getLiteralValue().replace(/^\.\//, '');
            for (const ext of ['.ts', '.tsx', '/index.ts']) {
                gated.set(relFileOf(path.join(dir, rel + ext), repoRoot), licenseModule);
            }
        });
    });
    return gated;
}

export function extractOverrides(files: SourceFile[], opts: ExtractOpts): OverrideSite[] {
    const { repoRoot } = opts;

    // Pass one: which modules are gated, and by what.
    const gated = new Map<string, string>();
    for (const sf of files) {
        for (const [file, mod] of licenseGatedModules(sf, repoRoot)) gated.set(file, mod);
    }

    // Pass two: the registrations themselves.
    const sites: OverrideSite[] = [];
    for (const sf of files) {
        const file = relFileOf(sf.getFilePath(), repoRoot);
        const licenseModule = gated.get(file);
        const { ranges } = collectDefs(sf, repoRoot);

        sf.forEachDescendant(node => {
            if (!Node.isCallExpression(node)) return;
            const callee = node.getExpression();
            const name = Node.isPropertyAccessExpression(callee) ? callee.getName()
                : Node.isIdentifier(callee) ? callee.getText() : null;
            if (name !== 'registerModel') return;

            const args = node.getArguments();
            const keyArg = args[0];
            const instance = args[1];
            if (!keyArg || !Node.isStringLiteral(keyArg)) return;
            if (!instance || !Node.isNewExpression(instance)) return;

            const ctor = instance.getExpression();
            let implId: string | null = null;
            try {
                const sym = ctor.getSymbol();
                const decl = ((sym?.getAliasedSymbol() ?? sym)?.getDeclarations() ?? [])[0];
                implId = decl ? defIdOfDeclaration(decl, repoRoot) : null;
            } catch { implId = null; }
            if (implId === null) return;

            sites.push({
                key: keyArg.getLiteralValue(),
                impl: implId,
                at: enclosingDefId(node.getStart(), ranges) ?? `${file}#<module>`,
                file,
                source: 'registerModel',
                ...(licenseModule
                    ? { condition: { kind: 'license' as const, module: licenseModule, evalAt: 'import' as const } }
                    : {}),
            });
        });
    }
    return sites;
}

// A key with one implementation is the normal case and produces nothing. With two or more, every
// implementation after the first is recorded as an override of it.
//
// Order is by file path rather than by discovery order so the output does not depend on which
// shard was built first.
export function pairOverrides(sites: OverrideSite[]): Override[] {
    const byKey = new Map<string, OverrideSite[]>();
    for (const s of sites) {
        if (!byKey.has(s.key)) byKey.set(s.key, []);
        byKey.get(s.key)!.push(s);
    }

    const out: Override[] = [];
    for (const [key, group] of [...byKey.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
        const unique = [...new Map(group.map(s => [s.impl, s])).values()]
            .sort((a, b) => a.impl.localeCompare(b.impl));
        if (unique.length < 2) continue;

        // The unconditional registration is the base when there is one: a licensed implementation
        // is the thing layered on top, not the thing being replaced.
        const base = unique.find(s => !s.condition) ?? unique[0];
        for (const s of unique) {
            if (s === base) continue;
            out.push({
                key, target: base.impl, by: s.impl, source: s.source,
                ...(s.condition ? { condition: s.condition } : {}),
                ...(s.variant ? { variant: s.variant } : {}),
                resolvedAt: 'runtime',
            });
        }
    }
    return out;
}

export function multiImplementationKeys(overrides: Override[]): Array<{ key: string; implementations: string[] }> {
    const byKey = new Map<string, Set<string>>();
    for (const o of overrides) {
        if (!byKey.has(o.key)) byKey.set(o.key, new Set());
        byKey.get(o.key)!.add(o.target);
        byKey.get(o.key)!.add(o.by);
    }
    return [...byKey.entries()]
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([key, impls]) => ({ key, implementations: [...impls].sort() }));
}
