## File: packages/ui-client/src/components/EmojiPicker/EmojiPickerPreview.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box } from '@rocket.chat/fuselage';
import DOMPurify from 'dompurify';
import type { AllHTMLAttributes } from 'react';

const EmojiPickerPreview = ({ emoji, name, ...props }: { emoji: string; name: string } & Omit<AllHTMLAttributes<HTMLDivElement>, 'is'>) => {
    /* Implementation Hidden */
};

export default EmojiPickerPreview;

```