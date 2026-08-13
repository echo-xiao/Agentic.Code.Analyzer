## File: apps/meteor/client/lib/voip/parseOutboundPhoneNumber.ts

```typescript
export const parseOutboundPhoneNumber = (phoneNumber: string | undefined): string => (phoneNumber ? phoneNumber.replace(/\*/g, '+') : '');

```