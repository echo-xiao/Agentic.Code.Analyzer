// dispatch-budget.ts — the regression guard behind the non-zero self-check.
//
// This is not a metric and no percentage is ever derived from it. It exists because a broken idiom
// and a working one look identical everywhere else: measured twice in this work, once when a
// guessed class name matched 0 rows, and once when streamer registrations sat at 0 while every
// unit test was green and the build reported success.
//
// Two rules, both deliberately blunt:
//   zero        -> fail. A trunk that yields no keys is dead, whatever the tests say.
//   below half  -> fail. Normal drift as the target repo moves is not flagged; a collapse is.
//
// Counts are stored per keyspaceScope and only ever compared within one. The same registry yields
// 141 / 136 / 78 keys depending on the range scanned, and all three are correct — comparing across
// ranges would read a range change as a regression.
import * as fs from 'fs';
import * as path from 'path';
import type { SelfCheckRow } from './idioms.js';

export interface BudgetSpace { keys: number; bothSidesKeys: number }
export interface BudgetScope { spaces: Record<string, BudgetSpace> }
export interface Budget { scopes: Record<string, BudgetScope> }

export interface BudgetResult {
    status: 'ok' | 'baseline-written' | 'failed';
    failures: string[];
}

export function readBudget(file: string): Budget {
    try {
        const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
        if (raw && typeof raw === 'object' && raw.scopes) return raw as Budget;
    } catch { /* absent or unreadable: the first run writes it */ }
    return { scopes: {} };
}

// Merges rather than replaces: one run measures one package, and overwriting the file would erase
// every other scope's baseline on each build.
export function writeBudget(file: string, patch: Budget): void {
    const current = readBudget(file);
    const merged: Budget = { scopes: { ...current.scopes, ...patch.scopes } };
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(merged, null, 2) + '\n', 'utf8');
}

export function checkAgainstBudget(rows: SelfCheckRow[], scope: string, file: string): BudgetResult {
    const budget = readBudget(file);
    const known = budget.scopes[scope];

    const spaces: Record<string, BudgetSpace> = {};
    for (const r of rows) spaces[r.space] = { keys: r.keys, bothSidesKeys: r.bothSidesKeys };

    // Zero fails even with no baseline to compare against — that is the whole point of the check,
    // and a first run that produces nothing must not be allowed to enshrine nothing as the target.
    const failures: string[] = [];
    for (const r of rows) {
        if (r.keys === 0) {
            failures.push(
                `${r.space}: 0 keys under ${scope}. An idiom that matches nothing is ` +
                `indistinguishable from one that works — check its declaration anchors.`);
        }
    }
    if (failures.length > 0) return { status: 'failed', failures };

    if (!known) {
        writeBudget(file, { scopes: { [scope]: { spaces } } });
        return { status: 'baseline-written', failures: [] };
    }

    for (const r of rows) {
        const before = known.spaces[r.space];
        if (!before) continue;                       // a newly added trunk has nothing to fall from
        if (r.keys * 2 <= before.keys) {
            failures.push(
                `${r.space}: ${r.keys} keys, down from ${before.keys} under ${scope}. ` +
                `A halving is a collapsed idiom, not repo drift.`);
        }
    }
    return failures.length > 0
        ? { status: 'failed', failures }
        : { status: 'ok', failures: [] };
}
