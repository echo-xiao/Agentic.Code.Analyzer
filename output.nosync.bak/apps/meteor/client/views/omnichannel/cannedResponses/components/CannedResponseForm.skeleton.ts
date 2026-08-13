## File: apps/meteor/client/views/omnichannel/cannedResponses/components/CannedResponseForm.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box, Field, FieldLabel, FieldRow, FieldError, TextInput, FieldGroup, RadioButton, FieldHint, Option } from '@rocket.chat/fuselage';
import { usePermission } from '@rocket.chat/ui-contexts';
import { useId, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import CannedResponsesComposer from './CannedResponsesComposer/CannedResponsesComposer';
import CannedResponsesComposerPreview from './CannedResponsesComposer/CannedResponsesComposerPreview';
import AutoCompleteDepartment from '../../components/AutoCompleteDepartment';
import Tags from '../../components/Tags';
import type { CannedResponseEditFormData } from '../modals/CannedResponseEdit';

// TODO: refactor Tags field to get proper validation
const CannedResponseForm = () => {
    /* Implementation Hidden */
};

export default CannedResponseForm;

```