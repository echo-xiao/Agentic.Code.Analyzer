## File: packages/ui-voip/src/ui-kit/getHistoryMessagePayload.ts

```typescript
import type { CallHistoryItemState, IMessage } from '@rocket.chat/core-typings';
import type { IconButtonElement, FrameableIconElement, InfoCardBlock, TextObject } from '@rocket.chat/ui-kit';
import { intervalToDuration, secondsToMilliseconds } from 'date-fns';

const APP_ID = 'media-call-core';

export const callStateToTranslationKey = (callState: CallHistoryItemState): TextObject => {
    /* Implementation Hidden */
};

export const callStateToIcon = (callState: CallHistoryItemState): FrameableIconElement => {
    /* Implementation Hidden */
};

const buildDurationString = (...values: number[]): string => {
    /* Implementation Hidden */
};

export const getCallDurationText = (callDuration: number | undefined): string | undefined => {
    /* Implementation Hidden */
};

export const getFormattedCallDuration = (callDuration: number | undefined): TextObject | undefined => {
    /* Implementation Hidden */
};

export const getHistoryAction = (callId: string): IconButtonElement => {
    /* Implementation Hidden */
};

export const getHistoryMessagePayload = (
	callState: CallHistoryItemState,
	callDuration: number | undefined,
	callId?: string,
	msg: string = '',
): Pick<IMessage, 'msg' | 'groupable'> & { blocks: [InfoCardBlock] } => {
    /* Implementation Hidden */
};

```