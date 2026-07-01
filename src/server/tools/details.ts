// details — read the full source of ONE located symbol (the expensive step; call on 1-2 key
// points, not on everything graph surfaced). Guarded: search/graph must run first so the agent
// reads code it has actually located, not guessed paths from training data.
import { GLOBAL_INDEX } from '../../indexer/state.js';
import { SESSION } from '../session.js';
import { getClassMethod, getImplementation } from '../engine/source.js';
import { relPath } from '../engine/common.js';

export function runDetails(args: { symbolName?: string; filename?: string }): string {
    const { symbolName, filename } = args;
    if (!symbolName) return 'Missing parameter: symbolName';
    if (!filename) return 'Missing parameter: filename — provide the exact file path from search/graph results.';

    if (!SESSION.hasCalledSearchOrGraph) {
        return (
            `⚠️ Use search or graph first to locate symbols before reading implementations.\n` +
            `Example: search("${symbolName}") → find the file → then details.`
        );
    }

    // ClassName.methodName syntax reads one method's full source.
    if (symbolName.includes('.')) {
        const [className, methodName] = symbolName.split('.', 2);
        const method = getClassMethod(className, methodName, filename);
        if (!method) {
            return `Method "${methodName}" not found in class "${className}" in "${filename}". Use details("${className}", "${filename}") to see available methods.`;
        }
        return `## ${className}.${methodName} — ${relPath(method.filePath)}\n\n\`\`\`typescript\n${method.text}\n\`\`\`\n\n💡 **Next:** graph("${methodName}", move="down") to trace callees, or move="up" for callers.`;
    }

    const impl = getImplementation(symbolName, filename);
    if (!impl) {
        const paths = GLOBAL_INDEX.symbols.get(symbolName);
        if (paths && paths.size > 0) {
            return (
                `Symbol "${symbolName}" not found in "${filename}".\n` +
                `It exists in:\n${Array.from(paths).map((p, i) => `${i + 1}. ${p}`).join('\n')}\n` +
                `Retry with the correct filename.`
            );
        }
        return `Symbol "${symbolName}" not found. Use search to confirm the name.`;
    }

    let result = `## File: ${relPath(impl.filePath)}\n\n\`\`\`typescript\n${impl.text}\n\`\`\``;

    // For classes: list methods and hint to use ClassName.methodName
    if (impl.kind === 'class' && impl.methods && impl.methods.length > 0) {
        result += `\n\n📋 **Methods (${impl.methods.length}):** ${impl.methods.join(', ')}\n`;
        result += `💡 To read a specific method: details("${symbolName}.methodName", "${filename}")`;
    }

    result += `\n\n💡 **Next:** graph("${symbolName}", move="down") to trace callees, or move="up" for callers.`;
    return result;
}
