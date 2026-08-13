## File: apps/meteor/client/views/home/cards/DocumentationCard.tsx

```typescript
import type { Card } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import { GenericCard, GenericCardButton } from '../../../components/GenericCard';
import { useExternalLink } from '../../../hooks/useExternalLink';
import { links } from '../../../lib/links';

const DOCS_URL = links.go.documentation;

const DocumentationCard = (props: Omit<ComponentProps<typeof Card>, 'type'>) => {
    /* Implementation Hidden */
};

export default DocumentationCard;

```