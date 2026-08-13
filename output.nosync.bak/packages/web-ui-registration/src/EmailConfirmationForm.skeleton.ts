## File: packages/web-ui-registration/src/EmailConfirmationForm.tsx

```typescript
import { FieldGroup, TextInput, Field, FieldLabel, FieldRow, FieldError, ButtonGroup, Button, Callout } from '@rocket.chat/fuselage';
import { Form, FormContainer, FormFooter, FormHeader, FormSubtitle, FormTitle, ActionLink } from '@rocket.chat/layout';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useLoginSendEmailConfirmation } from './hooks/useLoginSendEmailConfirmation';

export const EmailConfirmationForm = ({ email, onBackToLogin }: { email?: string; onBackToLogin: () => void }) => {
    /* Implementation Hidden */
};

export default EmailConfirmationForm;

```