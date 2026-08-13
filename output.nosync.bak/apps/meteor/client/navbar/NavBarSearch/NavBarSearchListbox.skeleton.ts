## File: apps/meteor/client/navbar/NavBarSearch/NavBarSearchListbox.tsx

```typescript
import type { OverlayTriggerAria } from '@react-aria/overlays';
import type { OverlayTriggerState } from '@react-stately/overlays';
import { Box, Tile } from '@rocket.chat/fuselage';
import { useStableCallback, useOutsideClick } from '@rocket.chat/fuselage-hooks';
import { CustomScrollbars } from '@rocket.chat/ui-client';
import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import NavBarSearchItemSkeleton from './NavBarSearchItemSkeleton';
import NavBarSearchNoResults from './NavBarSearchNoResults';
import NavBarSearchRow from './NavBarSearchRow';
import { useSearchItems } from './hooks/useSearchItems';
import { useListboxNavigation } from './hooks/useSearchNavigation';
import ResultsLiveRegion from '../../components/ResultsLiveRegion';

export type NavBarSearchListBoxProps = {
	state: OverlayTriggerState;
	overlayProps: OverlayTriggerAria['overlayProps'];
};

const NavBarSearchListBox = ({ state, overlayProps }: NavBarSearchListBoxProps) => {
    /* Implementation Hidden */
};

export default NavBarSearchListBox;

```