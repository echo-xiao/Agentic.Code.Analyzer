// Shared progress bar: uniform UX across refresh steps. In an interactive terminal it's a live-refresh
// bar; when piped to a nohup log (non-TTY) it prints one line every 5s (noTTYOutput), so a backgrounded
// run can still be watched with tail -f.
import cliProgress from 'cli-progress';

export function makeBar(label: string): cliProgress.SingleBar {
    return new cliProgress.SingleBar({
        format: `  ${label} [{bar}] {percentage}% | {value}/{total} | elapsed {elapsed} | eta {eta_fmt} | {status}`,
        noTTYOutput: true, notTTYSchedule: 5000, hideCursor: true, etaBuffer: 8, clearOnComplete: false,
    }, cliProgress.Presets.shades_classic);
}

export function fmtSec(sec: number): string {
    return sec >= 60 ? `${Math.floor(sec / 60)}m${Math.round(sec % 60)}s` : `${Math.round(sec)}s`;
}

// Convenience wrapper: wrap a loop of known length in a progress bar. fn processes item i and returns
// an optional status fragment.
export async function withBar<T>(
    label: string, items: T[], fn: (item: T, i: number) => Promise<string | void>,
): Promise<void> {
    const bar = makeBar(label);
    const t0 = Date.now();
    bar.start(items.length, 0, { elapsed: '0s', eta_fmt: '?', status: '' });
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
