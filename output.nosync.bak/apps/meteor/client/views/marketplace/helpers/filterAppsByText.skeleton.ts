## File: apps/meteor/client/views/marketplace/helpers/filterAppsByText.ts

```typescript
export const filterAppsByText = (name: string, text: string): boolean => name.toLowerCase().indexOf(text.toLowerCase()) > -1;

```