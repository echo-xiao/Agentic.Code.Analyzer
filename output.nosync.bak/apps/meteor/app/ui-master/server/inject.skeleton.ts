## File: apps/meteor/app/ui-master/server/inject.ts

```typescript
import crypto from 'node:crypto';

import type { NextHandleFunction } from 'connect';
import { Inject } from 'meteor/meteorhacks:inject-initial';
import { ReactiveDict } from 'meteor/reactive-dict';
import { WebApp } from 'meteor/webapp';
import parseRequest from 'parseurl';

import { getURL } from '../../utils/server/getURL';

type Injection =
	| string
	| {
			content: string;
			type: 'JS' | 'CSS';
			tag: string;
	  };

export const headInjections = new ReactiveDict<Record<string, Injection>>();

const callback: NextHandleFunction = (req, res, next) => {
    /* Implementation Hidden */
};

WebApp.connectHandlers.use(callback);

export const injectIntoHead = (key: string, value: Injection): void => {
    /* Implementation Hidden */
};

export const addScript = (key: string, content: string): void => {
    /* Implementation Hidden */
};

export const addStyle = (key: string, content: string): void => {
    /* Implementation Hidden */
};

export const injectIntoBody = (key: string, value: string): void => {
    /* Implementation Hidden */
};

export const applyHeadInjections = (injections: Injection[]): ((html: string) => string) => {
    /* Implementation Hidden */
};

```