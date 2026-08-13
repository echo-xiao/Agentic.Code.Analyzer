// defs.ts — declaration identity.
//
// A defId is `<repo-relative file>#<qualified name>`. It is derived from the declaration node
// alone so that both sides of a cross-package edge compute the same id without either side
// loading the other's shard. When one file declares the same qualified name twice, declarations
// are ordered by start position and the second onward get a `~n` suffix, which keeps ids stable
// for a given source revision.
import { Node, SourceFile, SyntaxKind } from 'ts-morph';
import * as path from 'path';

export type DefKind = 'function' | 'method' | 'class' | 'interface' | 'type'
                    | 'enum' | 'variable' | 'property' | 'module';

export interface Def {
    id: string; file: string; name: string; qualifiedName: string;
    kind: DefKind; line: number; endLine: number; signature: string; exported: boolean;
}

export interface DefRange { id: string; start: number; end: number }

export const MODULE_NAME = '<module>';

export function relFileOf(absFile: string, repoRoot: string): string {
    return path.relative(repoRoot, absFile).split(path.sep).join('/');
}

const KIND_OF: Array<[SyntaxKind, DefKind]> = [
    [SyntaxKind.FunctionDeclaration, 'function'],
    [SyntaxKind.MethodDeclaration, 'method'],
    [SyntaxKind.MethodSignature, 'method'],
    [SyntaxKind.Constructor, 'method'],
    [SyntaxKind.GetAccessor, 'method'],
    [SyntaxKind.SetAccessor, 'method'],
    [SyntaxKind.ClassDeclaration, 'class'],
    [SyntaxKind.InterfaceDeclaration, 'interface'],
    [SyntaxKind.TypeAliasDeclaration, 'type'],
    [SyntaxKind.EnumDeclaration, 'enum'],
    [SyntaxKind.VariableDeclaration, 'variable'],
    [SyntaxKind.PropertyDeclaration, 'property'],
    [SyntaxKind.PropertySignature, 'property'],
];

function kindOf(decl: Node): DefKind | null {
    for (const [syntax, kind] of KIND_OF) if (decl.getKind() === syntax) return kind;
    return null;
}

function ownName(decl: Node): string | null {
    if (decl.getKind() === SyntaxKind.Constructor) return 'constructor';
    const name = (decl as any).getName?.();
    return typeof name === 'string' && name.length > 0 ? name : null;
}

// Walk up through named ancestors so a method reads `Room.save` and a nested function reads
// `outer.inner`. Anonymous ancestors (arrow functions, object literals) are skipped rather than
// breaking the chain: `Room.save` is more useful than giving up.
function qualifiedNameOf(decl: Node): string | null {
    const own = ownName(decl);
    if (own === null) return null;
    const parts = [own];
    for (let a = decl.getParent(); a; a = a.getParent()) {
        if (kindOf(a) === null) continue;
        const n = ownName(a);
        if (n !== null) parts.unshift(n);
    }
    return parts.join('.');
}

function isDeclarationNode(decl: Node): boolean {
    return kindOf(decl) !== null && ownName(decl) !== null;
}

// All named declarations in a file, in source order. One traversal, reused by collectDefs and by
// the ordinal computation in defIdOfDeclaration, so both see the same sequence.
function orderedDeclarations(sf: SourceFile): Node[] {
    const out: Node[] = [];
    sf.forEachDescendant(node => { if (isDeclarationNode(node)) out.push(node); });
    return out.sort((a, b) => a.getStart() - b.getStart());
}

function idFor(relFile: string, qualifiedName: string, ordinal: number): string {
    return ordinal === 0 ? `${relFile}#${qualifiedName}` : `${relFile}#${qualifiedName}~${ordinal}`;
}

export function defIdOfDeclaration(decl: Node, repoRoot: string): string | null {
    const qualifiedName = qualifiedNameOf(decl);
    if (qualifiedName === null) return null;
    const sf = decl.getSourceFile();
    const relFile = relFileOf(sf.getFilePath(), repoRoot);

    let ordinal = 0;
    for (const other of orderedDeclarations(sf)) {
        if (other === decl) break;
        if (qualifiedNameOf(other) === qualifiedName) ordinal++;
    }
    return idFor(relFile, qualifiedName, ordinal);
}

function signatureOf(decl: Node): string {
    try {
        const start = decl.getStart();
        const body = typeof (decl as any).getBody === 'function' ? (decl as any).getBody() : undefined;
        const text = decl.getText();
        const cut = body ? body.getStart() - start : -1;
        const head = cut >= 0 ? text.slice(0, cut)
            : (text.includes('{') ? text.slice(0, text.indexOf('{')) : text.split('\n')[0]);
        return head.replace(/\s+/g, ' ').trim().slice(0, 400);
    } catch { return ''; }
}

function isExported(decl: Node): boolean {
    try { return (decl as any).isExported?.() ?? (decl as any).hasExportKeyword?.() ?? false; }
    catch { return false; }
}

// Module-top-level statements (bare registration calls, startup blocks) sit inside no declaration,
// so references there would have no caller. They are attributed to a synthetic module def keyed by
// the FULL path: naming it after the basename collapsed 59 different `index.ts` files into one.
//
// It is added UNCONDITIONALLY, not only for files that look like they have orphan code. Deciding
// "does this file have statements outside declarations" needs an allowlist of statement kinds, and
// that allowlist is wrong in open-ended ways: `export default defineConfig({...})` parses as an
// ExportAssignment, a namespace body hides statements one level down, and top-level await and
// labeled statements are further cases. Adding it always costs one inert def per file and cannot
// misclassify anything, because enclosingDefId picks the SMALLEST containing range — a whole-file
// module range never outranks a declaration that actually contains the reference.
export function collectDefs(sf: SourceFile, repoRoot: string): { defs: Def[]; ranges: DefRange[] } {
    const relFile = relFileOf(sf.getFilePath(), repoRoot);
    const defs: Def[] = [];
    const ranges: DefRange[] = [];
    const seen = new Map<string, number>();

    for (const decl of orderedDeclarations(sf)) {
        const qualifiedName = qualifiedNameOf(decl)!;
        const ordinal = seen.get(qualifiedName) ?? 0;
        seen.set(qualifiedName, ordinal + 1);
        const id = idFor(relFile, qualifiedName, ordinal);
        defs.push({
            id, file: relFile, name: ownName(decl)!, qualifiedName,
            kind: kindOf(decl)!,
            line: decl.getStartLineNumber(), endLine: decl.getEndLineNumber(),
            signature: signatureOf(decl), exported: isExported(decl),
        });
        ranges.push({ id, start: decl.getStart(), end: decl.getEnd() });
    }

    const moduleId = `${relFile}#${MODULE_NAME}`;
    defs.push({
        id: moduleId, file: relFile, name: MODULE_NAME, qualifiedName: MODULE_NAME,
        kind: 'module', line: 1, endLine: sf.getEndLineNumber(), signature: relFile, exported: false,
    });
    ranges.push({ id: moduleId, start: sf.getStart(), end: sf.getEnd() });

    return { defs, ranges };
}

// Innermost wins: a call inside a method belongs to the method, not to its class or the module.
export function enclosingDefId(pos: number, ranges: DefRange[]): string | null {
    let best: DefRange | null = null;
    for (const r of ranges) {
        if (pos < r.start || pos >= r.end) continue;
        if (best === null || (r.end - r.start) < (best.end - best.start)) best = r;
    }
    return best?.id ?? null;
}
