// idioms.ts — the six communication trunks (spec: 2026-08-13-binding-resolution-design.md §二).
// STUB: contract only. No behaviour yet — the tests in tests/indexer/idioms.test.ts drive it.
import type { Node, SourceFile } from 'ts-morph';

export type Space =
    | 'callbacks' | 'service-events' | 'rest' | 'streamer' | 'api-call' | 'meteor-methods'
    | 'slash-commands';
export type Role = 'register' | 'dispatch';
export type Form = '1a' | '1b' | '1c' | '1d';
export type Variant = 'monolith' | 'microservices';

export interface Idiom {
    id: string;
    space: Space;
    role: Role;
    argIndex: number;
    realm: 'server' | 'client';
    form: Form;
    keyResolution: string;
    scope?: 'out';
    match(decl: Node): boolean;
}

export interface Slot {
    space: Space; role: Role; decl: string; argIndex: number; key: string;
    at: string; handler?: string; realm: 'server' | 'client'; form: Form;
    keyResolution: string; keyspaceScope: string; variant?: Variant;
    evidence: 'static'; scope?: 'out';
}

export interface Unbound { at: string; text: string; reason: string }

export interface ExtractOpts { repoRoot: string; keyspaceScope: string; variant?: Variant }

export interface SelfCheckRow {
    space: Space; keys: number; registerSites: number; dispatchSites: number; bothSidesKeys: number;
}

export const IDIOMS: Idiom[] = [];

export function extractSlots(_sf: SourceFile, _opts: ExtractOpts): { slots: Slot[]; unbound: Unbound[] } {
    return { slots: [], unbound: [] };
}

export function selfCheckIdioms(_slots: Slot[], _opts?: { throwOnZero?: boolean }): SelfCheckRow[] {
    return [];
}
