## File: packages/livechat/src/components/uiKit/message/ImageBlock/index.tsx

```typescript
import type * as uikit from '@rocket.chat/ui-kit';
import type { ComponentChild } from 'preact';
import { memo, useEffect, useState, useMemo } from 'preact/compat';

import { createClassName } from '../../../../helpers/createClassName';
import Block from '../Block';
import styles from './styles.scss';

const MAX_SIZE = 360;

type ImageBlockProps = uikit.ImageBlock & {
	parser: uikit.SurfaceRenderer<ComponentChild>;
};

const ImageBlock = ({ appId, blockId, title, imageUrl, altText, parser }: ImageBlockProps) => {
    /* Implementation Hidden */
};

export default memo(ImageBlock);

```