## File: apps/meteor/client/views/marketplace/AppsList/AppRow.tsx

```typescript
import type { App } from '@rocket.chat/core-typings';
import { Badge, Card, CardBody, CardCol, CardControls, CardHeader, CardRow, CardTitle } from '@rocket.chat/fuselage';
import { AppAvatar } from '@rocket.chat/ui-avatar';
import { useRouteParameter, useRouter } from '@rocket.chat/ui-contexts';
import type { KeyboardEvent, MouseEvent } from 'react';
import { memo } from 'react';
import semver from 'semver';

import AppStatus from '../AppDetailsPage/tabs/AppStatus/AppStatus';
import AppMenu from '../AppMenu';
import BundleChips from '../BundleChips';
import AddonChip from './AddonChip';

// TODO: org props
const AppRow = ({ className, ...props }: App & { className?: string }) => {
    /* Implementation Hidden */
};

export default memo(AppRow);

```