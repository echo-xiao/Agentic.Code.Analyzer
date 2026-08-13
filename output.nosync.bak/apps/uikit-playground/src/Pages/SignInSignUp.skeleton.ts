## File: apps/uikit-playground/src/Pages/SignInSignUp.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { FlexContainer, Box, InputBox, Button, Label } from '@rocket.chat/fuselage';
import { RocketChatLogo } from '@rocket.chat/logo';
import { useNavigate } from 'react-router-dom';

import routes from '../Routes/Routes';

const labels = {
	[routes.login]: {
		header: 'Sign in to your workspace',
		description: 'Sign in to your workspace',
		button: 'Continue',
		footer: 'dont have a workspace?',
		footerButton: 'Create one',
	},
	[routes.signup]: {
		header: 'First, enter your email',
		description: 'We suggest using the email address you use at work.',
		button: 'Create a workspace',
		footer: 'Already have a workspace?',
		footerButton: 'Sign in',
	},
};

const SignInSignUp = ({ route }: { route: string }) => {
    /* Implementation Hidden */
};

export default SignInSignUp;

```