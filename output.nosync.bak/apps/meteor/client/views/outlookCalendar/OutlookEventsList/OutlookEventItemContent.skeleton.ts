## File: apps/meteor/client/views/outlookCalendar/OutlookEventsList/OutlookEventItemContent.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import DOMPurify from 'dompurify';

type SanitizeProps = {
	html: string;
	options?: {
		[key: string]: string;
	};
};

const OutlookEventItemContent = ({ html, options }: SanitizeProps) => {
    /* Implementation Hidden */
};

export default OutlookEventItemContent;

```