## File: apps/meteor/app/utils/lib/restrictions.ts

```typescript
export const fileUploadMediaWhiteList = function (customWhiteList: string): string[] | undefined {
    /* Implementation Hidden */
};

const fileUploadMediaBlackList = function (customBlackList: string): string[] | undefined {
    /* Implementation Hidden */
};

const isTypeOnList = function (type?: string, list?: string[]): boolean {
    /* Implementation Hidden */
};

export const fileUploadIsValidContentTypeFromSettings = function (
	type: string | undefined,
	customWhiteList: string,
	customBlackList: string,
): boolean {
    /* Implementation Hidden */
};

```