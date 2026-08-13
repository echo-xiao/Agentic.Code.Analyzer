## File: apps/meteor/client/components/message/content/attachments/file/AudioAttachment.tsx

```typescript
import type { AudioAttachmentProps } from '@rocket.chat/core-typings';
import { AudioPlayerControls, Box } from '@rocket.chat/fuselage';
import { useMediaUrl } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';

import { useMediaPlayer } from '../../../../../providers/MediaPlayerProvider';
import type { PersistentAudioTrack } from '../../../../../providers/MediaPlayerProvider';
import MarkdownText from '../../../../MarkdownText';
import MessageCollapsible from '../../../MessageCollapsible';
import MessageContentBody from '../../../MessageContentBody';

/** Extra context about the message that owns this audio, used by the shared player. */
export type AudioAttachmentSource = {
	rid?: string;
	mid?: string;
	username?: string;
	name?: string;
};

type AudioAttachmentComponentProps = AudioAttachmentProps & {
	source?: AudioAttachmentSource;
};

const AudioAttachment = ({
	title,
	audio_url: url,
	audio_type: type,
	audio_size: size,
	description,
	descriptionMd,
	title_link: link,
	title_link_download: hasDownload,
	collapsed,
	source,
}: AudioAttachmentComponentProps) => {
    /* Implementation Hidden */
};

export default AudioAttachment;

```