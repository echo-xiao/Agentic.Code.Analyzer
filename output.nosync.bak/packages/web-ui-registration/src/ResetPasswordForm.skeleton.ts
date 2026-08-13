## File: packages/web-ui-registration/src/ResetPasswordForm.tsx

```typescript
import { FieldGroup, TextInput, Field, FieldLabel, FieldRow, FieldError, ButtonGroup, Button, Callout } from '@rocket.chat/fuselage';
import { Form, FormContainer, FormFooter, FormHeader, FormTitle, ActionLink } from '@rocket.chat/layout';
import { useDocumentTitle } from '@rocket.chat/ui-client';
import { useEffect, useId, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { DispatchLoginRouter } from './hooks/useLoginRouter';
import { useSendForgotPassword } from './hooks/useSendForgotPassword';

export const ResetPasswordForm = ({ setLoginRoute }: { setLoginRoute: DispatchLoginRouter }) => {
    /* Implementation Hidden */
};

export default ResetPasswordForm;

```