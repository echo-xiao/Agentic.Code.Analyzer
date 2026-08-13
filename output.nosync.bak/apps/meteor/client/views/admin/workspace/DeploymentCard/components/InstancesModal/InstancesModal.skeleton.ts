## File: apps/meteor/client/views/admin/workspace/DeploymentCard/components/InstancesModal/InstancesModal.tsx

```typescript
import { Accordion, AccordionItem } from '@rocket.chat/fuselage';
import type { IInstance } from '@rocket.chat/rest-typings';
import { GenericModal } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import DescriptionList from './DescriptionList';
import DescriptionListEntry from './DescriptionListEntry';
import { useFormatDateAndTime } from '../../../../../../hooks/useFormatDateAndTime';

export type InstancesModalProps = {
	instances: IInstance[];
	onClose: () => void;
};

const InstancesModal = ({ instances = [], onClose }: InstancesModalProps) => {
    /* Implementation Hidden */
};

export default InstancesModal;

```