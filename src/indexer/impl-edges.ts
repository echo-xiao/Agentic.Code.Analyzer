// impl-edges.ts — interface member to the class members that implement it.
//
// A call on a proxified service resolves, correctly, to an interface method signature:
//
//     const Authorization = proxify<IAuthorization>('authorization');
//     await Authorization.canAccessRoom(room, user);   ->  IAuthorization.canAccessRoom
//
// A signature has no body and no out-edges, so the chain stops there and the real permission
// logic is never reached. Measured on the whole repo: 634 interface methods with in-edges and no
// out-edges, absorbing 2332 edges; six of the seven questions that regressed against v35 stopped
// exactly this way.
//
// The old name-keyed graph got through this layer by accident — it matched the bare name
// `canAccessRoom` against every same-named definition and happened to hit the implementation.
// That is not reproduced here: the heritage clause is the evidence, and a same-named method on an
// unrelated class is not an implementation.
import { Node, SourceFile, SyntaxKind } from 'ts-morph';
import { canonicalDeclaration, defIdOfDeclaration } from './defs.js';

export interface ImplEdge {
    from: string;          // interface or abstract member
    to: string;            // concrete member
    // How many classes implement the same member. 78% are 1; the rest must render as a fork
    // rather than silently showing the first, for the same reason coverage mode annotates a key
    // with a second implementation.
    implCount: number;
}

// Members declared by a type the class extends or implements. Walks the heritage chain one level;
// a base class's own heritage is handled when that base class is visited in its own right.
function declaredMembers(cls: Node, repoRoot: string): Array<{ name: string; defId: string }> {
    if (!Node.isClassDeclaration(cls)) return [];
    const out: Array<{ name: string; defId: string }> = [];

    for (const hc of cls.getHeritageClauses()) {
        for (const typeNode of hc.getTypeNodes()) {
            let sym;
            try { sym = typeNode.getExpression().getSymbol(); } catch { continue; }
            const target = (() => { try { return sym?.getAliasedSymbol() ?? sym; } catch { return sym; } })();
            for (const decl of target?.getDeclarations() ?? []) {
                const members = Node.isInterfaceDeclaration(decl) ? decl.getMembers()
                    : Node.isClassDeclaration(decl) ? decl.getMembers()
                    : [];
                // Overloads declare the same member several times. Group them and keep the one
                // canonicalDeclaration picks — the same declaration bindReference resolves a call
                // to — so an edge leaves exactly where callers arrive.
                const byName = new Map<string, Node[]>();
                for (const m of members) {
                    const hasBody = typeof (m as any).getBody === 'function' && (m as any).getBody();
                    if (hasBody) continue;      // a base method with a body is called, not implemented
                    if (!Node.isMethodSignature(m) && !Node.isMethodDeclaration(m)) continue;
                    const name = (m as any).getName?.();
                    if (typeof name !== 'string') continue;
                    byName.set(name, [...(byName.get(name) ?? []), m]);
                }
                for (const [name, group] of byName) {
                    const chosen = canonicalDeclaration(group);
                    const defId = chosen ? defIdOfDeclaration(chosen, repoRoot) : null;
                    if (defId) out.push({ name, defId });
                }
            }
        }
    }
    return out;
}

// How many classes implement each member, built once per Program and cached.
//
// The first version counted per member by rescanning every class in the Program, which is
// O(members x classes x members) and ran past five minutes on apps/meteor against 98 seconds
// without it. One pass over the classes, keyed by member, is O(classes x members).
const implCountCache = new WeakMap<object, Map<string, number>>();

function implCounts(sf: SourceFile, repoRoot: string): Map<string, number> {
    const project = sf.getProject() as unknown as object;
    const cached = implCountCache.get(project);
    if (cached) return cached;

    const counts = new Map<string, number>();
    for (const other of sf.getProject().getSourceFiles()) {
        if (other.getFilePath().includes('/node_modules/')) continue;
        for (const cls of other.getClasses()) {
            for (const { name, defId } of declaredMembers(cls, repoRoot)) {
                const impl = cls.getMethod(name);
                if (!impl || !impl.getBody()) continue;
                counts.set(defId, (counts.get(defId) ?? 0) + 1);
            }
        }
    }
    implCountCache.set(project, counts);
    return counts;
}

export function implementationEdges(sf: SourceFile, repoRoot: string): ImplEdge[] {
    const edges: ImplEdge[] = [];
    let counts: Map<string, number> | null = null;

    for (const cls of sf.getClasses()) {
        for (const { name, defId: memberDefId } of declaredMembers(cls, repoRoot)) {
            const impl = cls.getMethod(name);
            if (!impl || !impl.getBody()) continue;          // still abstract here
            const to = defIdOfDeclaration(impl, repoRoot);
            if (!to || to === memberDefId) continue;

            counts ??= implCounts(sf, repoRoot);             // only when this file has any
            edges.push({ from: memberDefId, to, implCount: Math.max(1, counts.get(memberDefId) ?? 1) });
        }
    }
    return edges;
}
