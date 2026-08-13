## File: apps/meteor/app/markdown/lib/hljs.js

```typescript
import hljs from 'highlight.js/lib/core';
import clean from 'highlight.js/lib/languages/clean';
import javascript from 'highlight.js/lib/languages/javascript';
import markdown from 'highlight.js/lib/languages/markdown';

hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('clean', clean);
hljs.registerLanguage('javascript', javascript);

export const register = async (lang) => {
    /* Implementation Hidden */
};

export default hljs;

```