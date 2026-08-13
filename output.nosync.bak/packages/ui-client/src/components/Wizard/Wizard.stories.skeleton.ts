## File: packages/ui-client/src/components/Wizard/Wizard.stories.tsx

```typescript
import { Box, Button, States, StatesIcon, StatesTitle } from '@rocket.chat/fuselage';
import type { Meta, StoryObj } from '@storybook/react';

import Wizard from './Wizard';
import WizardActions from './WizardActions';
import WizardBackButton from './WizardBackButton';
import WizardContent from './WizardContent';
import WizardNextButton from './WizardNextButton';
import WizardTabs from './WizardTabs';
import { useWizard } from './useWizard';

export default {
	component: Wizard,
	subcomponents: {
		WizardActions,
		WizardBackButton,
		WizardContent,
		WizardNextButton,
		WizardTabs,
	},
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<Box>
				<Story />
			</Box>
		),
	],
} satisfies Meta<typeof Wizard>;

const WizardExample = ({ ordered = false }: { ordered?: boolean }) => {
    /* Implementation Hidden */
};

export const BasicWizard: StoryObj<typeof Wizard> = { render: () => <WizardExample /> };

export const OrderedTabsWizard: StoryObj<typeof Wizard> = { render: () => <WizardExample ordered /> };

```