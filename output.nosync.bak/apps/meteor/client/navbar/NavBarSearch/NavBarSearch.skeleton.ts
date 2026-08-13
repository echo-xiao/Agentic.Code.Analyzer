## File: apps/meteor/client/navbar/NavBarSearch/NavBarSearch.tsx

```typescript
import { useFocusManager } from '@react-aria/focus';
import { useOverlayTrigger } from '@react-aria/overlays';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { Box, Icon, IconButton, TextInput } from '@rocket.chat/fuselage';
import { useStableCallback, useMergedRefs } from '@rocket.chat/fuselage-hooks';
import { useCallback, useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import tinykeys from 'tinykeys';

import NavBarSearchListBox from './NavBarSearchListbox';
import { getShortcutLabel } from './getShortcutLabel';
import { useSearchClick } from './hooks/useSearchClick';
import { useSearchFocus } from './hooks/useSearchFocus';
import { useSearchInputNavigation } from './hooks/useSearchNavigation';

const NavBarSearch = () => {
    /* Implementation Hidden */
};

export default NavBarSearch;

```