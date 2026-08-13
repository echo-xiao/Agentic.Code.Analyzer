## File: apps/meteor/app/lib/server/lib/debug.js

```typescript
import { InstanceStatus } from '@rocket.chat/instance-status';
import { Logger } from '@rocket.chat/logger';
import { tracerActiveSpan } from '@rocket.chat/tracing';
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import _ from 'underscore';

import { getMethodArgs } from '../../../../server/lib/logger/logPayloads';
import { getModifiedHttpHeaders } from '../../../../server/lib/shared/getModifiedHttpHeaders';
import { metrics } from '../../../metrics/server';
import { settings } from '../../../settings/server';

const logger = new Logger('Meteor');

let Log_Trace_Methods;
let Log_Trace_Subscriptions;
settings.watch('Log_Trace_Methods', (value) => {
	Log_Trace_Methods = value;
});
settings.watch('Log_Trace_Subscriptions', (value) => {
	Log_Trace_Subscriptions = value;
});

let Log_Trace_Methods_Filter;
let Log_Trace_Subscriptions_Filter;
settings.watch('Log_Trace_Methods_Filter', (value) => {
	Log_Trace_Methods_Filter = value ? new RegExp(value) : undefined;
});
settings.watch('Log_Trace_Subscriptions_Filter', (value) => {
	Log_Trace_Subscriptions_Filter = value ? new RegExp(value) : undefined;
});

const traceConnection = (enable, filter, prefix, name, connection, userId) => {
    /* Implementation Hidden */
};

const wrapMethods = function (name, originalHandler, methodsMap) {
    /* Implementation Hidden */
};

const originalMeteorMethods = Meteor.methods;

Meteor.methods = function (methodMap) {
	_.each(methodMap, (handler, name) => {
		wrapMethods(name, handler, methodMap);
	});
	originalMeteorMethods(methodMap);
};

const originalMeteorPublish = Meteor.publish;

Meteor.publish = function (name, func) {
	return originalMeteorPublish(name, function (...args) {
		traceConnection(Log_Trace_Subscriptions, Log_Trace_Subscriptions_Filter, 'subscription', name, this.connection, this.userId);

		logger.subscription({
			publication: name,
			userId: this.userId,
			userAgent: this.connection?.httpHeaders['user-agent'],
			referer: this.connection?.httpHeaders.referer,
			remoteIP: this.connection?.clientAddress,
			instanceId: InstanceStatus.id(),
		});

		const end = metrics.meteorSubscriptions.startTimer({ subscription: name });
		const endHistogram = metrics.meteorSubscriptionsSeconds.startTimer({ subscription: name });

		const originalReady = this.ready;
		this.ready = function () {
			end();
			endHistogram();
			return originalReady.apply(this, args);
		};

		return func.apply(this, args);
	});
};

WebApp.rawConnectHandlers.use((req, res, next) => {
	res.setHeader('X-Instance-ID', InstanceStatus.id());
	return next();
});

```