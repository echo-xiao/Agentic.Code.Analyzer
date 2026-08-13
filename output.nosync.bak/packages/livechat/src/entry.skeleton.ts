## File: packages/livechat/src/entry.ts

```typescript
import { h, render } from 'preact';

const root = document.getElementById('app') ?? document.body.firstElementChild;

if (!root) {
	throw new Error('No root element found');
}

const init = async () => {
    /* Implementation Hidden */
};

if (module.hot) {
	module.hot.accept();
}

void init();

```