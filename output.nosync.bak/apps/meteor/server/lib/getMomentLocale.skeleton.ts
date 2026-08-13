## File: apps/meteor/server/lib/getMomentLocale.ts

```typescript
import { Meteor } from 'meteor/meteor';

const mapLocaleToMomentLocale: Record<string, string> = {
	ug: 'ug-cn',
	zh: 'zh-cn',
};

export async function getMomentLocale(locale: string): Promise<string | undefined> {
    /* Implementation Hidden */
}

```