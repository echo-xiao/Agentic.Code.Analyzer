## File: apps/meteor/client/views/root/hooks/useIframeCommands.ts

```typescript
import type { UserStatus } from '@rocket.chat/core-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import { type LocationPathname, UserContext, useLoginWithCustomOauth, useLoginWithToken, useSetting } from '@rocket.chat/ui-contexts';
import { useContext, useEffect } from 'react';

import { AccountBox } from '../../../../app/ui-utils/client/lib/AccountBox';
import { capitalize, ltrim, rtrim } from '../../../../lib/utils/stringUtils';
import { baseURI } from '../../../lib/baseURI';
import { loginServices } from '../../../lib/loginServices';
import { getRootUrlPathPrefix } from '../../../lib/meteorRuntimeConfig';
import { settings } from '../../../lib/settings';
import { router } from '../../../providers/RouterProvider';

export const useIframeCommands = () => {
    /* Implementation Hidden */
};

```