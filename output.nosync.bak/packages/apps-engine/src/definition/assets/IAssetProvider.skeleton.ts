## File: packages/apps-engine/src/definition/assets/IAssetProvider.ts

```typescript
import type { IAsset } from './IAsset';

export interface IAssetProvider {
	getAssets(): Array<IAsset>;
}

```