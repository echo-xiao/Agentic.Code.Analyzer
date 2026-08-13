## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/TemplatePreview.tsx

```typescript
import type { IOutboundProviderTemplate } from '@rocket.chat/core-typings';
import { Box, Callout } from '@rocket.chat/fuselage';
import { useId, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import MarkdownText from '../../../../../components/MarkdownText';
import type { TemplateParameters, ComponentType } from '../types/template';
import { processTemplatePreviewText } from '../utils/template';

type TemplatePreviewProps = {
	template: IOutboundProviderTemplate;
	parameters?: TemplateParameters;
};

const TemplatePreview = ({ template, parameters = {} }: TemplatePreviewProps) => {
    /* Implementation Hidden */
};

export default TemplatePreview;

```