## File: packages/livechat/src/components/Form/HookFormExample/stories.tsx

```typescript
import type { Meta, StoryFn } from '@storybook/preact';
import type { ComponentProps } from 'preact';
import type { JSXInternal } from 'preact/src/jsx';
import { Controller, useForm } from 'react-hook-form';
import { action } from 'storybook/actions';

import { Form, PasswordInput, SelectInput, TextInput, FormField } from '..';
import { Button } from '../../Button';
import { ButtonGroup } from '../../ButtonGroup';

export default {
	title: 'Forms/HookFormExample',
	component: Form,
	args: {
		onSubmit: (event) => {
			action('submit')(event);
		},
	},
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<ComponentProps<typeof Form>>;

export const Default: StoryFn<ComponentProps<typeof Form>> = (args) => {
    /* Implementation Hidden */
};
Default.storyName = 'default';

```