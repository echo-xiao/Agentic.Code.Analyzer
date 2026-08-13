## File: apps/meteor/client/views/audit/utils/getAppTypeTranslation.ts

```typescript
export const getTypeTranslation = (type: 'app' | 'system') => (type === 'app' ? 'App' : 'System');

```