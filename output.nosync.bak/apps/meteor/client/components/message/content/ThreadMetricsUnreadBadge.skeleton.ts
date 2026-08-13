## File: apps/meteor/client/components/message/content/ThreadMetricsUnreadBadge.tsx

```typescript
import { Badge } from '@rocket.chat/fuselage';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useTranslation } from '@rocket.chat/ui-contexts';
import type { ComponentProps } from 'react';

const getBadgeVariantAndTitle = (
	unread: boolean,
	mention: boolean,
	all: boolean,
): false | [ComponentProps<typeof Badge>['variant'], TranslationKey] => {
    /* Implementation Hidden */
};

export type ThreadMetricsUnreadBadgeProps = { unread: boolean; mention: boolean; all: boolean };

const ThreadMetricsUnreadBadge = ({ unread, mention, all }: ThreadMetricsUnreadBadgeProps) => {
    /* Implementation Hidden */
};

export default ThreadMetricsUnreadBadge;

```