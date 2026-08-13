// binding.ts — the binding rule.
//
// One rule replaces every heuristic the old extractor used to guess whether a name belonged to
// this project: two builtin blacklists, a name-length guard, a JSX capital-letter filter, and a
// candidate-path search for imports. The checker knows the answer; ask it.
//
// A declaration inside the target repo is a project binding. A declaration in lib.*.d.ts or under
// node_modules is external and produces no edge — that is what kills `arr.filter().map()` binding
// to a project function named `map`. Anything the checker cannot resolve is unbound: recorded,
// counted, and dropped. It is never guessed by name.
import { Node, SourceFile, SyntaxKind } from 'ts-morph';
import * as path from 'path';
import { defIdOfDeclaration } from './defs.js';

export type StaticEdgeKind = 'call' | 'new' | 'jsx' | 'type';

export type Bind =
    | { kind: 'def'; defId: string }
    | { kind: 'external' }
    | { kind: 'unbound'; reason: string };

// `.d.ts` counts as outside even when the file sits in the repo: buildShard excludes declaration
// files when collecting defs, so binding to one would name a defId present in no shard. Measured
// on a 200-edge sample before this rule existed: 2 dangling edges, 0.08% of apps/meteor's edges.
function isInsideRepo(declFile: string, repoRoot: string): boolean {
    const rel = path.relative(repoRoot, declFile);
    if (rel.startsWith('..') || path.isAbsolute(rel)) return false;
    if (rel.endsWith('.d.ts')) return false;
    return !rel.split(path.sep).includes('node_modules');
}

export function bindReference(node: Node, repoRoot: string): Bind {
    let symbol;
    try { symbol = node.getSymbol(); } catch { return { kind: 'unbound', reason: 'checker threw' }; }
    if (!symbol) return { kind: 'unbound', reason: 'no symbol' };

    // Import aliases point at the local binding; the aliased symbol is the real declaration.
    let target = symbol;
    try { target = symbol.getAliasedSymbol() ?? symbol; } catch { /* not an alias */ }

    const decls = target.getDeclarations();
    if (decls.length === 0) return { kind: 'unbound', reason: 'no declarations' };

    // Overloads and declaration merging give several declarations; the first one inside the repo
    // is the project's own, and anything else is ambient or third-party.
    let inRepoWithoutDef: Node | null = null;
    for (const decl of decls) {
        if (!isInsideRepo(decl.getSourceFile().getFilePath(), repoRoot)) continue;
        const defId = defIdOfDeclaration(decl, repoRoot);
        if (defId !== null) return { kind: 'def', defId };
        if (inRepoWithoutDef === null) inRepoWithoutDef = decl;
    }

    // The declaration is ours but is not a node kind that can be an edge target: a destructured
    // binding, a parameter, a type parameter. Reported as unbound with the kind named, never as
    // external — this is the largest unbound category (13,721 references, 77% of the total) and
    // the only one where recall could still be won back, by following the type instead of the
    // declaration. Filing it under external would erase it from the accounting entirely.
    if (inRepoWithoutDef !== null) {
        return { kind: 'unbound', reason: `in-repo ${inRepoWithoutDef.getKindName()} is not a def kind` };
    }
    return { kind: 'external' };
}

// Every syntactic position that names something: the callee of a call, the constructor of a `new`,
// a JSX tag, a type reference, and a heritage clause type (which is emitted as a `type` edge —
// heritage lives on the class declaration, outside any method).
export function referenceNodesOf(sf: SourceFile): Array<{ node: Node; edgeKind: StaticEdgeKind }> {
    const out: Array<{ node: Node; edgeKind: StaticEdgeKind }> = [];
    const nameNodeOf = (expr: Node): Node =>
        Node.isPropertyAccessExpression(expr) ? expr.getNameNode() : expr;

    sf.forEachDescendant(node => {
        if (Node.isCallExpression(node)) {
            out.push({ node: nameNodeOf(node.getExpression()), edgeKind: 'call' });
        } else if (Node.isNewExpression(node)) {
            out.push({ node: nameNodeOf(node.getExpression()), edgeKind: 'new' });
        } else if (Node.isJsxOpeningElement(node) || Node.isJsxSelfClosingElement(node)) {
            const tag = node.getTagNameNode();
            if (tag) out.push({ node: tag, edgeKind: 'jsx' });
        } else if (node.getKind() === SyntaxKind.TypeReference) {
            const typeName = (node as any).getTypeName?.();
            if (typeName) out.push({ node: typeName, edgeKind: 'type' });
        } else if (Node.isExpressionWithTypeArguments(node)) {
            const e = node.getExpression();
            if (e) out.push({ node: nameNodeOf(e), edgeKind: 'type' });
        }
    });
    return out;
}
