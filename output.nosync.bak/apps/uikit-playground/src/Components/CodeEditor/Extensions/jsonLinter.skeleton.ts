## File: apps/uikit-playground/src/Components/CodeEditor/Extensions/jsonLinter.ts

```typescript
import { jsonParseLinter } from '@codemirror/lang-json';
import { lintGutter, linter } from '@codemirror/lint';

export default [lintGutter(), linter(jsonParseLinter())];

```