## File: packages/livechat/src/routes/LeaveMessage/index.tsx

```typescript
import { useContext, useRef } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import styles from './styles.scss';
import { Livechat } from '../../api';
import { Button } from '../../components/Button';
import { Form, FormField, SelectInput, TextInput } from '../../components/Form';
import { FormScrollShadow } from '../../components/Form/FormScrollShadow';
import { MultilineTextInput } from '../../components/Form/MultilineTextInput';
import MarkdownBlock from '../../components/MarkdownBlock';
import { ModalManager } from '../../components/Modal';
import { Screen, ScreenContent, ScreenFooter } from '../../components/Screen';
import { createClassName } from '../../helpers/createClassName';
import { parseOfflineMessage } from '../../helpers/parseOfflineMessage';
import { sortArrayByColumn } from '../../helpers/sortArrayByColumn';
import { validateEmail } from '../../lib/email';
import { parentCall } from '../../lib/parentCall';
import { createToken } from '../../lib/random';
import { StoreContext } from '../../store';

type LeaveMessageProps = {
	path: string;
};

const LeaveMessage = (_: LeaveMessageProps) => {
    /* Implementation Hidden */
};

export default LeaveMessage;

```