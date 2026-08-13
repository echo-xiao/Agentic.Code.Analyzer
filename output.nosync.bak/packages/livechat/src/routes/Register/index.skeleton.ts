## File: packages/livechat/src/routes/Register/index.tsx

```typescript
import { useContext, useEffect, useMemo, useRef } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';
import { route } from 'preact-router';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import styles from './styles.scss';
import { Livechat } from '../../api';
import { Button } from '../../components/Button';
import { Form, FormField, TextInput, SelectInput, CustomFields as CustomFieldsForm } from '../../components/Form';
import { FormScrollShadow } from '../../components/Form/FormScrollShadow';
import { Screen, ScreenContent, ScreenFooter } from '../../components/Screen';
import { createClassName } from '../../helpers/createClassName';
import { sortArrayByColumn } from '../../helpers/sortArrayByColumn';
import CustomFields from '../../lib/customFields';
import { validateEmail } from '../../lib/email';
import { parentCall } from '../../lib/parentCall';
import Triggers from '../../lib/triggers';
import { StoreContext } from '../../store';
import type { StoreState } from '../../store';

// Custom field as in the form payload
type FormPayloadCustomField = { [key: string]: string };

export type RegisterFormValues = { name: string; email: string; department?: string; [key: string]: any };

type RegisterProps = {
	path: string;
};

export const Register = (_: RegisterProps) => {
    /* Implementation Hidden */
};

export default Register;

```