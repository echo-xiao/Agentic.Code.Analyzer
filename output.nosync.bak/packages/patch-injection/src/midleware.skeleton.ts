## File: packages/patch-injection/src/midleware.ts

```typescript
type Middleware<F extends (...args: any[]) => any> = (ctx: Parameters<F>, next: NextFunction<F>) => ReturnType<F>;
type NextFunction<F extends (...args: any[]) => any> = (...args: Parameters<F> | []) => ReturnType<F>;

export function withMiddleware<F extends (...args: any[]) => any>(fn: F) {
    /* Implementation Hidden */
}

```