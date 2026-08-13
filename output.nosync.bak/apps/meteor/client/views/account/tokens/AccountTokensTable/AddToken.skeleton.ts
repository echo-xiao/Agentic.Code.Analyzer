## File: apps/meteor/client/views/account/tokens/AccountTokensTable/AddToken.tsx

```typescript
import type { SelectOption } from '@rocket.chat/fuselage';
import { Box, TextInput, Button, Margins, Select, FieldError, FieldGroup, Field, FieldRow } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { useSetModal, useToastMessageDispatch, useUserId, useEndpoint } from '@rocket.chat/ui-contexts';
import { useCallback, useId, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

type AddTokenFormData = {
	name: string;
	bypassTwoFactor: string;
};

export type AddTokenProps = {
	reload: () => void;
};

const AddToken = ({ reload }: AddTokenProps) => {
    /* Implementation Hidden */
};

export default AddToken;

```