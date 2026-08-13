## File: apps/meteor/client/views/omnichannel/components/outboundMessage/utils/outbound-message.ts

```typescript
import type {
	IOutboundMessage,
	IOutboundProviderTemplate,
	TemplateComponent,
	TemplateParameter as CoreTemplateParameter,
} from '@rocket.chat/core-typings';

import type { SubmitPayload } from '../components/OutboundMessageWizard/forms';
import type { MessageFormSubmitPayload } from '../components/OutboundMessageWizard/forms/MessageForm';
import type { RecipientFormSubmitPayload } from '../components/OutboundMessageWizard/forms/RecipientForm/RecipientForm';
import type { RepliesFormSubmitPayload } from '../components/OutboundMessageWizard/forms/RepliesForm';
import type { TemplateParameter, TemplateParameters } from '../types/template';

export const isRecipientStepValid = (data: Partial<SubmitPayload>): data is Required<RecipientFormSubmitPayload> => {
    /* Implementation Hidden */
};

export const isMessageStepValid = (data: Partial<SubmitPayload>): data is Required<MessageFormSubmitPayload> => {
    /* Implementation Hidden */
};

export const isRepliesStepValid = (data: Partial<SubmitPayload>): data is RepliesFormSubmitPayload => {
    /* Implementation Hidden */
};

const formatParameterForOutboundMessage = (parameter: TemplateParameter): CoreTemplateParameter => {
    /* Implementation Hidden */
};

const formatOutboundMessageComponents = (
	components: IOutboundProviderTemplate['components'],
	parameters: TemplateParameters,
): TemplateComponent[] => {
    /* Implementation Hidden */
};

export const formatOutboundMessagePayload = ({
	recipient,
	sender,
	template,
	type = 'template',
	templateParameters,
	departmentId,
	agentId,
}: {
	type: IOutboundMessage['type'];
	recipient: string;
	sender: string;
	template: IOutboundProviderTemplate;
	templateParameters: TemplateParameters;
	departmentId?: string;
	agentId?: string;
}): IOutboundMessage => {
    /* Implementation Hidden */
};

```