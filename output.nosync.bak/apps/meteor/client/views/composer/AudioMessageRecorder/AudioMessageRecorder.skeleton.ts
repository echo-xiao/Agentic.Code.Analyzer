## File: apps/meteor/client/views/composer/AudioMessageRecorder/AudioMessageRecorder.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { Box, Icon, Throbber } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { MessageComposerAction } from '@rocket.chat/ui-composer';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AudioRecorder } from '../../../../app/ui/client/lib/recorderjs/AudioRecorder';
import { useChat } from '../../room/contexts/ChatContext';

const audioRecorder = new AudioRecorder();

export type AudioMessageRecorderProps = {
	rid: IRoom['_id'];
	isMicrophoneDenied?: boolean;
};

const AudioMessageRecorder = ({ rid, isMicrophoneDenied }: AudioMessageRecorderProps) => {
    /* Implementation Hidden */
};

export default AudioMessageRecorder;

```