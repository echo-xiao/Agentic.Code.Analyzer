## File: packages/core-services/src/types/ILicense.ts

```typescript
import type { IServiceClass } from './ServiceClass';

export interface ILicense extends IServiceClass {
	hasModule(feature: string): boolean;

	hasValidLicense(): boolean;

	getModules(): string[];

	getGuestPermissions(): string[];
}

```