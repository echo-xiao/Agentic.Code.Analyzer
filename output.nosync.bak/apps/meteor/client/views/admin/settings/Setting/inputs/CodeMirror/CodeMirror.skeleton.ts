## File: apps/meteor/client/views/admin/settings/Setting/inputs/CodeMirror/CodeMirror.tsx

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { Editor, EditorConfiguration, EditorFromTextArea } from 'codemirror';
import { useEffect, useRef, useState } from 'react';

const defaultGutters = ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'];

type CodeMirrorModule = typeof import('codemirror');

let codeMirrorPromise: Promise<CodeMirrorModule> | undefined;

const loadCodeMirror = (): Promise<CodeMirrorModule> => {
    /* Implementation Hidden */
};

export type CodeMirrorProps = {
	id: string;
	placeholder?: string;
	disabled?: boolean;
	autoComplete?: string | undefined;
	lineNumbers?: boolean;
	lineWrapping?: boolean;
	mode?: string;
	gutters?: string[];
	foldGutter?: boolean;
	matchBrackets?: boolean;
	autoCloseBrackets?: boolean;
	matchTags?: boolean;
	showTrailingSpace?: boolean;
	highlightSelectionMatches?: boolean;
	readOnly: boolean;
	value: string;
	defaultValue?: string;
	onChange: (value: string) => void;
};

function CodeMirror({
	lineNumbers = true,
	lineWrapping = true,
	mode = 'javascript',
	gutters = defaultGutters,
	foldGutter = true,
	matchBrackets = true,
	autoCloseBrackets = true,
	matchTags = true,
	showTrailingSpace = true,
	highlightSelectionMatches = true,
	readOnly,
	value,
	defaultValue,
	onChange,
	...props
}: CodeMirrorProps) {
    /* Implementation Hidden */
}

export default CodeMirror;

```