## File: apps/uikit-playground/src/Components/CodeEditor/index.tsx

```typescript
import type { Extension } from '@codemirror/state';
import { Box } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import json5 from 'json5';
import { useEffect, useContext } from 'react';

import { updatePayloadAction, context } from '../../Context';
import type { ILayoutBlock } from '../../Context/initialState';
import useCodeMirror from '../../hooks/useCodeMirror';
import codePrettier from '../../utils/codePrettier';

type CodeMirrorProps = {
	extensions?: Extension[];
};

const CodeEditor = ({ extensions }: CodeMirrorProps) => {
    /* Implementation Hidden */
};

export default CodeEditor;

```