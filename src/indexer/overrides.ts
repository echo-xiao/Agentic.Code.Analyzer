// overrides.ts — coverage mode (spec: 2026-08-13-binding-resolution-design.md §2.7).
// STUB: contract only. Driven by tests/indexer/overrides.test.ts.
import type { SourceFile } from 'ts-morph';
import type { ExtractOpts, Variant } from './idioms.js';

export interface Condition { kind: 'license' | 'setting' | 'transport'; module?: string; expr?: string; evalAt: 'import' | 'call' }

export interface Override {
    key: string; target: string; by: string;
    source: 'registerModel' | 'patch-injection' | 'module-override' | 'class-on-license' | 'slot-replacement' | 'monkey-patch' | 'deployment-cutoff';
    condition?: Condition; variant?: Variant; resolvedAt: 'runtime';
}

export function extractOverrides(_files: SourceFile[], _opts: ExtractOpts): Override[] {
    return [];
}

export function multiImplementationKeys(_o: Override[]): Array<{ key: string; implementations: string[] }> {
    return [];
}
