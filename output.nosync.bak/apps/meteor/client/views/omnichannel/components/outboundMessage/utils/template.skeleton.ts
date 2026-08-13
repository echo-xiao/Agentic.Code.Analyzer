## File: apps/meteor/client/views/omnichannel/components/outboundMessage/utils/template.ts

```typescript
import type { IOutboundProviderTemplate } from '@rocket.chat/core-typings';
import { capitalize } from '@rocket.chat/string-helpers';

import type { ComponentType, TemplateParameterMetadata, TemplateParameter } from '../types/template';

const placeholderPattern = new RegExp('{{(.*?)}}', 'g'); // e.g {{1}} or {{text}}

export const extractParameterMetadata = (template: Pick<IOutboundProviderTemplate, 'id' | 'components'>) => {
    /* Implementation Hidden */
};

export const parseComponentText = (
	templateId: string,
	componentType: ComponentType,
	text: string | undefined,
	format: TemplateParameter['format'] = 'text',
): TemplateParameterMetadata[] => {
    /* Implementation Hidden */
};

export const replacePlaceholders = (text = '', replacer: (substring: string, captured: number) => string) => {
    /* Implementation Hidden */
};

const replaceLineBreaks = (text: string) => {
    /* Implementation Hidden */
};

export const processTemplatePreviewText = (text: string, parameters: TemplateParameter[] = []): string => {
    /* Implementation Hidden */
};

```