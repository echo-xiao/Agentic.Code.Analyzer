## File: apps/meteor/client/lib/e2ee/codec.ts

```typescript
export interface ICodec<TIn, TOut, TEnc = TIn> {
	decode: (data: TIn) => TOut;
	encode: (data: TOut) => TEnc;
}

```