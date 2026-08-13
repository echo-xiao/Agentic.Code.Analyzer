## File: packages/livechat/src/providers/ServerProvider.tsx

```typescript
import type { Serialized } from '@rocket.chat/core-typings';
import type {
	ServerMethodName,
	ServerMethodParameters,
	ServerMethodReturn,
	StreamerCallbackArgs,
	StreamNames,
	StreamKeys,
} from '@rocket.chat/ddp-client';
import { Emitter } from '@rocket.chat/emitter';
import type { Method, PathFor, OperationParams, OperationResult, UrlParams, PathPattern } from '@rocket.chat/rest-typings';
import type { UploadResult } from '@rocket.chat/ui-contexts';
import { ServerContext } from '@rocket.chat/ui-contexts';
import { compile } from 'path-to-regexp';
import type { ComponentChildren } from 'preact';
import { useMemo } from 'preact/hooks';
import { useSyncExternalStore } from 'react';

import { host } from '../components/App';
import { useStore } from '../store';
import { useSDK } from './SDKProvider';

const ServerProvider = ({ children }: { children: ComponentChildren }) => {
    /* Implementation Hidden */
};

export default ServerProvider;

```