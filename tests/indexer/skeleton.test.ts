import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { SkeletonGenerator } from '../../src/indexer/skeleton.js';

function withTempFile(content: string, fn: (p: string) => void) {
    const p = path.join(os.tmpdir(), `sk-${process.pid}-${Math.round(process.hrtime()[1])}.ts`);
    fs.writeFileSync(p, content);
    try { fn(p); } finally { fs.rmSync(p, { force: true }); }
}

test('skeleton: function symbol carries endLine and signature', () => {
    withTempFile(
        `export function addTwo(a: number, b: number): number {\n  return a + b;\n}\n`,
        (p) => {
            const { mapping } = SkeletonGenerator.generate(p);
            const fn = mapping.symbols.find((s: any) => s.name === 'addTwo');
            assert.ok(fn, 'addTwo symbol should exist');
            assert.equal(fn.line, 1);
            assert.ok(fn.endLine >= 3, `endLine=${fn.endLine} should cover the whole function`);
            assert.match(fn.signature, /addTwo\(a: number, b: number\): number/);
            assert.ok(!fn.signature.includes('return a + b'), 'signature should not include the implementation body');
        }
    );
});

test('skeleton: class method carries containerClass', () => {
    withTempFile(
        `export class Calc {\n  add(a: number): number { return a; }\n}\n`,
        (p) => {
            const { mapping } = SkeletonGenerator.generate(p);
            const m = mapping.symbols.find((s: any) => s.qualifiedName === 'Calc.add');
            assert.ok(m, 'Calc.add should exist');
            assert.equal(m.containerClass, 'Calc');
            assert.ok(m.endLine >= 2);
        }
    );
});

test('skeleton: signatures with destructured/object parameters are not truncated', () => {
    withTempFile(
        `export function route({ path, method }: { path: string; method: string }): number {\n  return path.length;\n}\n`,
        (p) => {
            const { mapping } = SkeletonGenerator.generate(p);
            const fn = mapping.symbols.find((s: any) => s.name === 'route');
            assert.ok(fn.signature.includes('path'), `signature should include the parameter: ${fn.signature}`);
            assert.ok(fn.signature.includes(': number'), `signature should include the return type: ${fn.signature}`);
            assert.ok(!fn.signature.includes('return path.length'), 'signature should not include the implementation body');
        }
    );
});
