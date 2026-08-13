## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessagePreview/OutboundMessagePreview.tsx

```typescript
import type {
	ILivechatAgent,
	ILivechatDepartment,
	IOutboundProviderMetadata,
	IOutboundProviderTemplate,
	ILivechatContact,
} from '@rocket.chat/core-typings';
import { Box, Margins } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import PreviewItem from './PreviewItem';
import { formatPhoneNumber } from '../../../../../../lib/formatPhoneNumber';
import type { TemplateParameters } from '../../types/template';
import TemplatePreview from '../TemplatePreview';

type OutboundMessagePreviewProps = ComponentProps<typeof Box> & {
	template?: IOutboundProviderTemplate;
	contactName?: ILivechatContact['name'];
	providerName?: IOutboundProviderMetadata['providerName'];
	providerType?: IOutboundProviderMetadata['providerType'];
	departmentName?: ILivechatDepartment['name'];
	agentName?: ILivechatAgent['name'];
	agentUsername?: ILivechatAgent['username'];
	sender?: string;
	recipient?: string;
	templateParameters?: TemplateParameters;
};

const formatContact = (rawValue?: string, providerType?: IOutboundProviderMetadata['providerType']) => {
    /* Implementation Hidden */
};

const OutboundMessagePreview = ({
	template,
	contactName,
	providerName,
	providerType,
	departmentName,
	agentName,
	agentUsername,
	sender: rawSender,
	recipient: rawRecipient,
	templateParameters,
	...props
}: OutboundMessagePreviewProps) => {
    /* Implementation Hidden */
};

export default OutboundMessagePreview;

```