## File: apps/meteor/client/views/admin/oauthApps/OAuthAddApp.tsx

```typescript
import {
	Button,
	ButtonGroup,
	TextInput,
	Field,
	FieldLabel,
	FieldRow,
	FieldError,
	FieldHint,
	TextAreaInput,
	ToggleSwitch,
	FieldGroup,
} from '@rocket.chat/fuselage';
import { ContextualbarScrollableContent } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useRoute, useEndpoint } from '@rocket.chat/ui-contexts';
import { useCallback, useId } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type OAuthAddAppPayload = {
	name: string;
	active: boolean;
	redirectUri: string;
};

const OAuthAddApp = () => {
    /* Implementation Hidden */
};

export default OAuthAddApp;

```