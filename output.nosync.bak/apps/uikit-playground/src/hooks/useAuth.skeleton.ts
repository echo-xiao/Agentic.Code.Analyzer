## File: apps/uikit-playground/src/hooks/useAuth.tsx

```typescript
import { useLocalStorage } from '@rocket.chat/fuselage-hooks';
import type { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import type { userType } from '../Context/initialState';

const AuthContext = createContext<{
	user?: userType;
	login?: (data: userType) => Promise<void>;
	logout?: () => void;
}>({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    /* Implementation Hidden */
};

export const useAuth = () => useContext(AuthContext);

```