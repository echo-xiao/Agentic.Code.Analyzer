// 共享进度条：refresh 各步骤统一 UX。交互终端是实时刷新条；管到 nohup 日志（非 TTY）时
// 每 5 秒打一行（noTTYOutput），所以后台挂起也能 tail -f 看进度。
import cliProgress from 'cli-progress';

export function makeBar(label: string): cliProgress.SingleBar {
    return new cliProgress.SingleBar({
        format: `  ${label} [{bar}] {percentage}% | {value}/{total} | 已用 {elapsed} | 剩余 {eta_fmt} | {status}`,
        noTTYOutput: true, notTTYSchedule: 5000, hideCursor: true, etaBuffer: 8, clearOnComplete: false,
    }, cliProgress.Presets.shades_classic);
}

export function fmtSec(sec: number): string {
    return sec >= 60 ? `${Math.floor(sec / 60)}分${Math.round(sec % 60)}秒` : `${Math.round(sec)}秒`;
}

// 便捷封装：给一个已知总数的循环包进度条。fn 处理第 i 项，返回可选的 status 片段。
export async function withBar<T>(
    label: string, items: T[], fn: (item: T, i: number) => Promise<string | void>,
): Promise<void> {
    const bar = makeBar(label);
    const t0 = Date.now();
    bar.start(items.length, 0, { elapsed: '0秒', eta_fmt: '?', status: '' });
    for (let i = 0; i < items.length; i++) {
        let status = '';
        try { status = (await fn(items[i], i)) || ''; }
        catch (e: any) { status = `err: ${(e?.message ?? e).toString().slice(0, 40)}`; }
        const elapsed = (Date.now() - t0) / 1000;
        const eta = i > 0 ? (elapsed / (i + 1)) * (items.length - i - 1) : 0;
        bar.update(i + 1, { elapsed: fmtSec(elapsed), eta_fmt: fmtSec(eta), status });
    }
    bar.stop();
}
