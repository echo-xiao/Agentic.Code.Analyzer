## File: apps/uikit-playground/src/Components/CodeEditor/BlockEditor.tsx

```typescript
/* eslint-disable react-hooks/exhaustive-deps */
import type { Extension } from '@codemirror/state';
import { Box } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { useEffect, useContext } from 'react';

import { updatePayloadAction, context } from '../../Context';
import type { IPayload } from '../../Context/initialState';
import useCodeMirror from '../../hooks/useCodeMirror';
import useFormatCodeMirrorValue from '../../hooks/useFormatCodeMirrorValue';
import intendCode from '../../utils/intendCode';

type CodeMirrorProps = {
	extensions?: Extension[];
};

const BlockEditor = ({ extensions }: CodeMirrorProps) => {
    /* Implementation Hidden */
};

export default BlockEditor;

```