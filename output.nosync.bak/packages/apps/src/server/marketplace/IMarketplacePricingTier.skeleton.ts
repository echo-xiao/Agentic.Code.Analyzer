## File: packages/apps/src/server/marketplace/IMarketplacePricingTier.ts

```typescript
export interface IMarketplacePricingTier {
	perUnit: boolean;
	minimum: number;
	maximum: number;
	price: number;
}

```