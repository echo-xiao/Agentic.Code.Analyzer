## File: packages/core-typings/src/omnichannel/reports.ts

```typescript
export type ReportResult = { total: number; data: { label: string; value: number }[] };

export type ReportWithUnmatchingElements = ReportResult & { unspecified: number };

```