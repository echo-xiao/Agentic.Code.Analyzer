## File: apps/meteor/client/views/admin/settings/EditableSettingsProvider.tsx

```typescript
import type { ISetting } from '@rocket.chat/core-typings';
import { useSettings } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { create } from 'zustand';

import type { EditableSetting, IEditableSettingsState } from '../EditableSettingsContext';
import { EditableSettingsContext, performSettingQuery } from '../EditableSettingsContext';

const defaultOmit: Array<ISetting['_id']> = ['Cloud_Workspace_AirGapped_Restrictions_Remaining_Days'];

export type EditableSettingsProviderProps = {
	children?: ReactNode;
};

// TODO: this component can be replaced by RHF state management
const EditableSettingsProvider = ({ children }: EditableSettingsProviderProps) => {
    /* Implementation Hidden */
};

export default EditableSettingsProvider;

```