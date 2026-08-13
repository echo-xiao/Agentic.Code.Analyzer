## File: apps/meteor/client/components/RawText.tsx

```typescript
import DOMPurify from 'dompurify';

/** @deprecated */
export type RawTextProps = { children: string };

const RawText = ({ children }: RawTextProps) => <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(children) }} />;

export default RawText;

```