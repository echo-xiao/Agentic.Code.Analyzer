## File: apps/meteor/client/providers/CustomSoundProvider/CustomSoundProvider.tsx

```typescript
import type { ICustomSound } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { CustomSoundContext, useEndpoint, useStream, useUserPreference } from '@rocket.chat/ui-contexts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, type ReactNode } from 'react';

import { defaultSounds, getCustomSoundURL, formatVolume } from './lib';
import { useUserSoundPreferences } from '../../hooks/useUserSoundPreferences';

export type CustomSoundProviderProps = {
	children?: ReactNode;
};

const CustomSoundProvider = ({ children }: CustomSoundProviderProps) => {
    /* Implementation Hidden */
};

export default CustomSoundProvider;

```