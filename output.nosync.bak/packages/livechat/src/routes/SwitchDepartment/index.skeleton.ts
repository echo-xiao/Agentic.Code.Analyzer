## File: packages/livechat/src/routes/SwitchDepartment/index.tsx

```typescript
import { useContext } from 'preact/hooks';
import { route } from 'preact-router';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import styles from './styles.scss';
import { Livechat } from '../../api';
import { Button } from '../../components/Button';
import { ButtonGroup } from '../../components/ButtonGroup';
import { Form, FormField, SelectInput } from '../../components/Form';
import { ModalManager } from '../../components/Modal';
import { Screen, ScreenContent, ScreenFooter } from '../../components/Screen';
import { createClassName } from '../../helpers/createClassName';
import { loadConfig } from '../../lib/main';
import { createToken } from '../../lib/random';
import type { StoreState } from '../../store';
import { StoreContext } from '../../store';

type SwitchDepartmentFormData = { department: string };

type SwitchDepartmentProps = {
	path: string;
};

const SwitchDepartment = (_: SwitchDepartmentProps) => {
    /* Implementation Hidden */
};

export default SwitchDepartment;

```