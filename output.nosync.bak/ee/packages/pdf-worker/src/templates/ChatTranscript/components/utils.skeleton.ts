## File: ee/packages/pdf-worker/src/templates/ChatTranscript/components/utils.ts

```typescript
import type { PDFMessage } from '../../../types/ChatTranscriptData';

const MAX_MD_ELEMENTS_PER_VIEW = 10;
const MAX_MSG_SIZE = 1200;

export const messageLongerThanPage = (message: string | undefined) => (message?.length ?? 0) > MAX_MSG_SIZE;

// When a markup list is greater than 10 (magic number, but a reasonable small/big number) we're gonna split the markdown into multiple <View> element
// So react-pdf can split them evenly across pages
export const markupEntriesGreaterThan10 = (messageMd: unknown[] = []) => messageMd.length > MAX_MD_ELEMENTS_PER_VIEW;
export const splitByTens = (array: unknown[] = []): unknown[][] => {
    /* Implementation Hidden */
};

export const isSystemMessage = (message: PDFMessage) => !!message.t;

```