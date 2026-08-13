## File: packages/ui-kit/src/blocks/WithTranslations.ts

```typescript
export type WithTranslations<T> = T & {
	i18n?: {
		key: string;
		args?: { [key: string]: string | number };
	};
};

```