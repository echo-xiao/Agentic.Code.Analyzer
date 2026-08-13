## File: apps/meteor/client/components/message/content/urlPreviews/OEmbedCollapsible.tsx

```typescript
import { MessageGenericPreview } from '@rocket.chat/fuselage';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import OEmbedPreviewContent from './OEmbedPreviewContent';
import type { OEmbedPreviewMetadata } from './OEmbedPreviewMetadata';
import MessageCollapsible from '../../MessageCollapsible';

export type OEmbedCollapsibleProps = { children?: ReactNode } & OEmbedPreviewMetadata;

const OEmbedCollapsible = ({ children, ...props }: OEmbedCollapsibleProps) => {
    /* Implementation Hidden */
};

export default OEmbedCollapsible;

```