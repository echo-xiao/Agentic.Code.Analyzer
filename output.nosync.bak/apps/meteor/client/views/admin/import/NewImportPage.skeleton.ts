## File: apps/meteor/client/views/admin/import/NewImportPage.tsx

```typescript
import {
	Box,
	Button,
	ButtonGroup,
	Callout,
	Chip,
	Field,
	Margins,
	Select,
	InputBox,
	TextInput,
	UrlInput,
	FieldLabel,
	FieldRow,
	FieldHint,
} from '@rocket.chat/fuselage';
import { useSafely } from '@rocket.chat/fuselage-hooks';
import { Page, PageHeader, PageScrollableContentWithShadow } from '@rocket.chat/ui-client';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useToastMessageDispatch, useRouter, useRouteParameter, useSetting, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { ChangeEvent, DragEvent, Key, SyntheticEvent } from 'react';
import { useState, useMemo, useEffect, useId } from 'react';
import { useTranslation } from 'react-i18next';

import { useErrorHandler } from './useErrorHandler';
import { useFormatMemorySize } from '../../../hooks/useFormatMemorySize';

// TODO: review inner logic
function NewImportPage() {
    /* Implementation Hidden */
}

export default NewImportPage;

```