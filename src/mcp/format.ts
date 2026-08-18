// What a host receives instead of a run report.
//
// The answer prompt imposes no citation format (see tests/pipeline/answer.test.ts), so the model
// refers to skeleton node ids -- "[8b]" -- rather than file:line. The benchmark resolves those
// against the recap its report carries; a host has no report, so the mapping has to travel with
// the answer or every reference in it is unverifiable. Built from the trace, costing no request.
interface ReadMaterial {
    nodeId: string;
    file: string;
    startLine: number;
    endLine: number;
}

export function formatToolResult(answer: string, materials: ReadMaterial[]): string {
    if (materials.length === 0) return answer;
    const lines = materials.map(m => `  ${m.nodeId}  ${m.file}:${m.startLine}-${m.endLine}`);
    return `${answer}\n\n---\nRead (node -> source):\n${lines.join('\n')}`;
}
