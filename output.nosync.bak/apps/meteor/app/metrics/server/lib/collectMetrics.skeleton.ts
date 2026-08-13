## File: apps/meteor/app/metrics/server/lib/collectMetrics.ts

```typescript
import http from 'node:http';

import { Statistics } from '@rocket.chat/models';
import { tracerSpan } from '@rocket.chat/tracing';
import connect from 'connect';
import { Facts } from 'meteor/facts-base';
import { Meteor } from 'meteor/meteor';
import client from 'prom-client';
import gcStats from 'prometheus-gc-stats';
import _ from 'underscore';

import { metrics } from './metrics';
import { SystemLogger } from '../../../../server/lib/logger/system';
import { getControl } from '../../../../server/lib/migrations';
import { settings } from '../../../settings/server';
import { getAppsStatistics } from '../../../statistics/server/lib/getAppsStatistics';
import { Info } from '../../../utils/rocketchat.info';

Facts.incrementServerFact = function (pkg: 'pkg' | 'fact', fact: string | number, increment: number): void {
	metrics.meteorFacts.inc({ pkg, fact }, increment);
};

const setPrometheusData = async (): Promise<void> => {
    /* Implementation Hidden */
};

const app = connect();

// const compression = require('compression');
// app.use(compression());

app.use('/metrics', (_req, res) => {
	res.setHeader('Content-Type', 'text/plain');
	client.register
		.metrics()
		.then((data) => {
			metrics.metricsRequests.inc();
			metrics.metricsRequestsTotal.inc();
			metrics.metricsSize.set(data.length);

			res.end(data);
		})
		.catch((err) => {
			SystemLogger.error({ msg: 'Error while collecting metrics', err });
			res.end();
		});
});

app.use('/', (_req, res) => {
	const html = `<html>
		<head>
			<title>Rocket.Chat Prometheus Exporter</title>
		</head>
		<body>
			<h1>Rocket.Chat Prometheus Exporter</h1>
			<p><a href="/metrics">Metrics</a></p>
		</body>
	</html>`;

	res.write(html);
	res.end();
});

const server = http.createServer(app);

let timer: NodeJS.Timeout;
let resetTimer: NodeJS.Timeout;
let defaultMetricsInitiated = false;
let gcStatsInitiated = false;
const was = {
	enabled: false,
	port: 9458,
	resetInterval: 0,
	collectGC: false,
};
const updatePrometheusConfig = async (): Promise<void> => {
    /* Implementation Hidden */
};

Meteor.startup(async () => {
	settings.watchByRegex(/^Prometheus_.+/, updatePrometheusConfig);
});

```