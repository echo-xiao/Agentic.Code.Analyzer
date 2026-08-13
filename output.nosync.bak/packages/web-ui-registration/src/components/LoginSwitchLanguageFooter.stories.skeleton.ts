## File: packages/web-ui-registration/src/components/LoginSwitchLanguageFooter.stories.tsx

```typescript
import { Box, Tile } from '@rocket.chat/fuselage';
import { mockAppRoot } from '@rocket.chat/mock-providers';
import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import LoginSwitchLanguageFooter from './LoginSwitchLanguageFooter';

function ExampleTranslationDecorator({ children }: { children: ReactNode }) {
    /* Implementation Hidden */
}

export default {
	component: LoginSwitchLanguageFooter,
	decorators: [
		(Story) => (
			<ExampleTranslationDecorator>
				<Story />
			</ExampleTranslationDecorator>
		),
		mockAppRoot()
			.withSetting('Language', 'fi')
			.withTranslations('en', 'registration', { 'component.switchLanguage': 'Change to <1>{{ name }}</1>' })
			.withTranslations('en', 'example', { text: 'Hello!' })
			.withTranslations('fi', 'registration', { 'component.switchLanguage': 'Vaihda kieleksi <1>{{ name }}</1>' })
			.withTranslations('fi', 'example', { text: 'Hei!' })
			.withTranslations('pt-BR', 'registration', { 'component.switchLanguage': 'Mudar para <1>{{ name }}</1>' })
			.withTranslations('pt', 'example', { text: 'Olá!' })
			.buildStoryDecorator(),
	],
	args: {
		browserLanguage: 'pt-BR',
	},
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof LoginSwitchLanguageFooter>;

export const Example: StoryObj<typeof LoginSwitchLanguageFooter> = {};

```