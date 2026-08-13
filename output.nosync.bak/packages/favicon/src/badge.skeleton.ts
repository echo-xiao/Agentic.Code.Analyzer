## File: packages/favicon/src/badge.ts

```typescript
export type Badge = number | string | null | undefined;

const getBadgeText = (badge: NonNullable<Badge>) => {
    /* Implementation Hidden */
};

const getBadgeStyle = (badge: NonNullable<Badge>) => {
    /* Implementation Hidden */
};

export const drawBadge = (badge: Badge, context: CanvasRenderingContext2D) => {
    /* Implementation Hidden */
};

```