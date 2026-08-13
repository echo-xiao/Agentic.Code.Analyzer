## File: apps/meteor/client/views/omnichannel/contactInfo/tabs/ContactInfoChannels/useBlockChannel.tsx

```typescript
import type { ILivechatContactVisitorAssociation } from '@rocket.chat/core-typings';
import { useEndpoint, useSetModal, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import BlockChannelModal from './BlockChannelModal';
import { useHasLicenseModule } from '../../../../../hooks/useHasLicenseModule';
import AdvancedContactModal from '../../AdvancedContactModal';

export const useBlockChannel = ({ blocked, association }: { blocked: boolean; association: ILivechatContactVisitorAssociation }) => {
    /* Implementation Hidden */
};

```