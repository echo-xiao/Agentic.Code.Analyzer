## File: apps/meteor/client/components/message/content/urlPreviews/OEmbedPreviewContent.tsx

```typescript
import {
	MessageGenericPreviewContent,
	MessageGenericPreviewTitle,
	MessageGenericPreviewDescription,
	MessageGenericPreviewFooter,
	Box,
} from '@rocket.chat/fuselage';
import type { ReactElement, ReactNode } from 'react';

import type { OEmbedPreviewMetadata } from './OEmbedPreviewMetadata';
import MarkdownText from '../../../MarkdownText';

export type OEmbedPreviewContentProps = { thumb?: ReactElement<any>; children?: ReactNode } & OEmbedPreviewMetadata;

const OEmbedPreviewContent = ({ title, description, url, thumb, authorName, authorUrl, siteName, siteUrl }: OEmbedPreviewContentProps) => {
    /* Implementation Hidden */
};

export default OEmbedPreviewContent;

```