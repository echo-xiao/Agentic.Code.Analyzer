## File: apps/meteor/client/views/omnichannel/reports/utils/formatAttachmentName.ts

```typescript
export const formatAttachmentName = (attachmentName: string, start: string, end: string): string =>
	`${attachmentName.toLocaleLowerCase().replace(/ /g, '_')}_${start}_${end}`;

```