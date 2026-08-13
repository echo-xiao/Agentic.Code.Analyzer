## File: packages/gazzodown/src/katex/PreviewKatexElement.tsx

```typescript
import 'katex/dist/katex.css';

export type PreviewKatexElementProps = {
	code: string;
};

const PreviewKatexElement = ({ code }: PreviewKatexElementProps) => <>{code}</>;

export default PreviewKatexElement;

```