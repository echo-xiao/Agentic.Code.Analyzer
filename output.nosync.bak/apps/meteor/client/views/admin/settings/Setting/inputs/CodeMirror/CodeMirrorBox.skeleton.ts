## File: apps/meteor/client/views/admin/settings/Setting/inputs/CodeMirror/CodeMirrorBox.tsx

```typescript
import { Box, Button, ButtonGroup, FieldError } from '@rocket.chat/fuselage';
import { useToggle } from '@rocket.chat/fuselage-hooks';
import { useId, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

// A constant 2px border is always reserved so toggling the error state only changes the color, avoiding a layout reflow.
const editorBorderProps = { borderWidth: 2, borderStyle: 'solid', borderRadius: 4 } as const;

export type CodeMirrorBoxProps = { label: ReactNode; children: ReactNode; error?: string };

const CodeMirrorBox = ({ label, children, error }: CodeMirrorBoxProps) => {
    /* Implementation Hidden */
};

export default CodeMirrorBox;

```