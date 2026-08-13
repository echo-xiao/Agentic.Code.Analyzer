## File: packages/storybook-config/src/DocsContainer.tsx

```typescript
import { DocsContainer as BaseContainer } from '@storybook/addon-docs/blocks';
import type { ComponentPropsWithoutRef } from 'react';
import { useEffect, useState } from 'react';
import { addons } from 'storybook/preview-api';
import { themes } from 'storybook/theming';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

const channel = addons.getChannel();

const DocsContainer = (props: ComponentPropsWithoutRef<typeof BaseContainer>) => {
    /* Implementation Hidden */
};

export default DocsContainer;

```