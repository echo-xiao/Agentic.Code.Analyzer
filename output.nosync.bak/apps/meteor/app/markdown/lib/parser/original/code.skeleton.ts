## File: apps/meteor/app/markdown/lib/parser/original/code.js

```typescript
/*
 * code() is a named function that will parse `inline code` and ```codeblock``` syntaxes
 * @param {Object} message - The message object
 */
import { unescapeHTML } from '@rocket.chat/string-helpers';

import { addAsToken } from './token';
import hljs, { register } from '../../hljs';

const inlinecode = (message) => {
    /* Implementation Hidden */
};

const codeblocks = (message) => {
    /* Implementation Hidden */
};

export const code = (message) => {
    /* Implementation Hidden */
};

```