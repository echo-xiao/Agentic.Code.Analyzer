import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { SkeletonGenerator } from './skeleton.js';

function withTempFile(content: string, fn: (p: string) => void) {
    const p = path.join(os.tmpdir(), `sk-${process.pid}-${Math.round(process.hrtime()[1])}.ts`);
    fs.writeFileSync(p, content);
    try { fn(p); } finally { fs.rmSync(p, { force: true }); }
}

test('skeleton: 函数 symbol 带 endLine 与 signature', () => {
    withTempFile(
        `export function addTwo(a: number, b: number): number {\n  return a + b;\n}\n`,
        (p) => {
            const { mapping } = SkeletonGenerator.generate(p);
            const fn = mapping.symbols.find((s: any) => s.name === 'addTwo');
            assert.ok(fn, 'addTwo symbol 应存在');
            assert.equal(fn.line, 1);
            assert.ok(fn.endLine >= 3, `endLine=${fn.endLine} 应覆盖整个函数`);
            assert.match(fn.signature, /addTwo\(a: number, b: number\): number/);
            assert.ok(!fn.signature.includes('return a + b'), 'signature 不含实现体');
        }
    );
});

test('skeleton: 类方法带 containerClass', () => {
    withTempFile(
        `export class Calc {\n  add(a: number): number { return a; }\n}\n`,
        (p) => {
            const { mapping } = SkeletonGenerator.generate(p);
            const m = mapping.symbols.find((s: any) => s.qualifiedName === 'Calc.add');
            assert.ok(m, 'Calc.add 应存在');
            assert.equal(m.containerClass, 'Calc');
            assert.ok(m.endLine >= 2);
        }
    );
});
