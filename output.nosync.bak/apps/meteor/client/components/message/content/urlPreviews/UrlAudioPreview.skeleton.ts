## File: apps/meteor/client/components/message/content/urlPreviews/UrlAudioPreview.tsx

```typescript
import { AudioPlayer } from '@rocket.chat/fuselage';

import type { UrlPreviewMetadata } from './UrlPreviewMetadata';

export type UrlAudioPreviewProps = Pick<UrlPreviewMetadata, 'url'>;

const UrlAudioPreview = ({ url }: UrlAudioPreviewProps) => <AudioPlayer src={url} />;

export default UrlAudioPreview;

```