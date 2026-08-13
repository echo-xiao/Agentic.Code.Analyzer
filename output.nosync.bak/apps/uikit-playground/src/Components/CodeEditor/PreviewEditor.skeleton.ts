## File: apps/uikit-playground/src/Components/CodeEditor/PreviewEditor.tsx

```typescript
import type { Extension } from '@codemirror/state';
import { Box } from '@rocket.chat/fuselage';
import { useEffect, useContext } from 'react';

import { context } from '../../Context';
import useCodeMirror from '../../hooks/useCodeMirror';
import intendCode from '../../utils/intendCode';

type CodeMirrorProps = {
	extensions?: Extension[];
};

const PreviewEditor = ({ extensions }: CodeMirrorProps) => {
    /* Implementation Hidden */
};

export default PreviewEditor;

```