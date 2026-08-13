## File: apps/meteor/client/views/navigation/sidepanel/SidePanelInquiry.tsx

```typescript
import { memo } from 'react';

import { createSidePanel } from './SidePanelInternal';
import InquireSidePanelItem from './omnichannel/InquireSidePanelItem';

const SidePanelInquiry = createSidePanel(InquireSidePanelItem);

export default memo(SidePanelInquiry);

```