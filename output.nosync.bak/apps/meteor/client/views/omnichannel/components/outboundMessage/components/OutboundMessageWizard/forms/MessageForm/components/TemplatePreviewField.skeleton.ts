## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/forms/MessageForm/components/TemplatePreviewField.tsx

```typescript
import type { IOutboundProviderTemplate } from '@rocket.chat/core-typings';
import type { Control } from 'react-hook-form';
import { useWatch } from 'react-hook-form';

import TemplatePreview from '../../../../TemplatePreview';
import type { MessageFormData } from '../MessageForm';

type TemplatePreviewFieldProps = {
	control: Control<MessageFormData>;
	template: IOutboundProviderTemplate;
};

/**
 * This component exists to isolate the re-rendering that happens whenever templateParameters changes.
 */
const TemplatePreviewField = ({ control, template }: TemplatePreviewFieldProps) => {
    /* Implementation Hidden */
};

export default TemplatePreviewField;

```