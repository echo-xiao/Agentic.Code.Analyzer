## File: apps/meteor/ee/server/local-services/instance/service.ts

```typescript
import os from 'node:os';

import type { AppStatusReport } from '@rocket.chat/core-services';
import { Apps, License, ServiceClassInternal, Settings } from '@rocket.chat/core-services';
import type { IInstanceStatus } from '@rocket.chat/core-typings';
import { InstanceStatus, defaultPingInterval, indexExpire } from '@rocket.chat/instance-status';
import { InstanceStatus as InstanceStatusRaw } from '@rocket.chat/models';
import EJSON from 'ejson';
import type { BrokerNode } from 'moleculer';
import { ServiceBroker, Transporters, Serializers } from 'moleculer';

import { getLogger } from './getLogger';
import { getTransporter } from './getTransporter';
import { SystemLogger } from '../../../../server/lib/logger/system';
import { StreamerCentral } from '../../../../server/modules/streamer/streamer.module';
import { AppsEngineNoNodesFoundError } from '../../../../server/services/apps-engine/service';
import type { IInstanceService } from '../../sdk/types/IInstanceService';

const hostIP = process.env.INSTANCE_IP ? String(process.env.INSTANCE_IP).trim() : 'localhost';

const { Base } = Serializers;

class EJSONSerializer extends Base {
	override serialize(obj: any): Buffer {
        /* Implementation Hidden */
    }

	override deserialize(buf: Buffer): any {
        /* Implementation Hidden */
    }
}

export class InstanceService extends ServiceClassInternal implements IInstanceService {
	protected name = 'instance';

	private broadcastStarted = false;

	private transporter: Transporters.TCP | Transporters.NATS;

	private broker: ServiceBroker;

	private troubleshootDisableInstanceBroadcast = false;

	constructor() {
        /* Implementation Hidden */
    }

	override async created() {
        /* Implementation Hidden */
    }

	private connectNode(record: IInstanceStatus) {
        /* Implementation Hidden */
    }

	private disconnectNode(nodeId: string) {
        /* Implementation Hidden */
    }

	override async started() {
        /* Implementation Hidden */
    }

	private async startBroadcast() {
        /* Implementation Hidden */
    }

	private sendBroadcast(streamName: string, eventName: string, args: unknown[]) {
        /* Implementation Hidden */
    }

	async getInstances(): Promise<BrokerNode[]> {
        /* Implementation Hidden */
    }

	async getAppsStatusInInstances(): Promise<AppStatusReport> {
        /* Implementation Hidden */
    }
}

```