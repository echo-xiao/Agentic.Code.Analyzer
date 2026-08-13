## File: apps/meteor/client/views/admin/oauthApps/EditOauthApp.tsx

```typescript
import type { IOAuthApps, Serialized } from '@rocket.chat/core-typings';
import {
	Button,
	ButtonGroup,
	TextInput,
	Field,
	FieldLabel,
	FieldRow,
	FieldError,
	FieldHint,
	PasswordInput,
	TextAreaInput,
	ToggleSwitch,
	FieldGroup,
} from '@rocket.chat/fuselage';
import { GenericModal, ContextualbarScrollableContent } from '@rocket.chat/ui-client';
import { useSetModal, useToastMessageDispatch, useRoute, useAbsoluteUrl, useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import type { ComponentProps } from 'react';
import { useCallback, useId, useMemo } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, Controller } from 'react-hook-form';

type EditOAuthAddAppPayload = {
	name: string;
	active: boolean;
	redirectUri: string;
};

export type EditOauthAppProps = {
	onChange: () => void;
	data: Serialized<IOAuthApps>;
} & Omit<ComponentProps<typeof ContextualbarScrollableContent>, 'data'>;

const EditOauthApp = ({ onChange, data, ...props }: EditOauthAppProps) => {
    /* Implementation Hidden */
};

export default EditOauthApp;

```