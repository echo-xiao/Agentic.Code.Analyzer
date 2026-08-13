## File: apps/meteor/client/views/account/security/ChangePassphrase.tsx

```typescript
import { Box, Field, FieldError, FieldGroup, FieldHint, FieldLabel, FieldRow, PasswordInput, Button } from '@rocket.chat/fuselage';
import { PasswordVerifierList } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, usePasswordPolicy } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useId } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import { e2e } from '../../../lib/e2ee/rocketchat.e2e';
import { useE2EEState } from '../../room/hooks/useE2EEState';

const PASSPHRASE_POLICY = Object.freeze({
	enabled: true,
	minLength: 30,
	mustContainAtLeastOneLowercase: true,
	mustContainAtLeastOneUppercase: true,
	mustContainAtLeastOneNumber: true,
	mustContainAtLeastOneSpecialCharacter: true,
	forbidRepeatingCharacters: false,
});

const useKeysExist = () => {
    /* Implementation Hidden */
};

const useValidatePassphrase = (passphrase: string) => {
    /* Implementation Hidden */
};

const useChangeE2EPasswordMutation = () => {
    /* Implementation Hidden */
};

const defaultValues = {
	passphrase: '',
	confirmationPassphrase: '',
};

export const ChangePassphrase = () => {
    /* Implementation Hidden */
};

```