## File: apps/meteor/client/views/account/security/TwoFactorTOTP.tsx

```typescript
import { Box, Button, TextInput, Margins, Field, FieldRow, FieldLabel, ToggleSwitch } from '@rocket.chat/fuselage';
import { useStableCallback, useSafely } from '@rocket.chat/fuselage-hooks';
import { useSetModal, useToastMessageDispatch, useUser, useMethod } from '@rocket.chat/ui-contexts';
import type { ComponentPropsWithoutRef, ChangeEvent } from 'react';
import { useState, useCallback, useEffect, useId } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import qrcode from 'yaqrcode';

import BackupCodesModal from './BackupCodesModal';
import TextCopy from '../../../components/TextCopy';
import TwoFactorTotpModal from '../../../components/TwoFactorModal/TwoFactorTotpModal';

type TwoFactorTOTPFormData = {
	authCode: string;
};

export type TwoFactorTOTPProps = ComponentPropsWithoutRef<typeof Box>;

const TwoFactorTOTP = (props: TwoFactorTOTPProps) => {
    /* Implementation Hidden */
};

export default TwoFactorTOTP;

```