## File: ee/packages/media-calls/src/sip/Session.ts

```typescript
import type { Socket } from 'node:net';

import type { IMediaCall, MediaCallContact } from '@rocket.chat/core-typings';
import type { ClientMediaSignalBody } from '@rocket.chat/media-signaling';
import { Random } from '@rocket.chat/random';
import Srf, { type SrfResponse, type SrfRequest } from 'drachtio-srf';

import { SipError, SipErrorCodes } from './errorCodes';
import { logger } from '../logger';
import type { BaseSipCall } from './providers/BaseSipCall';
import { IncomingSipCall } from './providers/IncomingSipCall';
import { OutgoingSipCall } from './providers/OutgoingSipCall';
import type { IMediaCallServerSettings } from '../definition/IMediaCallServer';
import type { InternalCallParams } from '../definition/common';
import { getDefaultSettings } from '../server/getDefaultSettings';

export class SipServerSession {
	private readonly _sessionId: string;

	private srf: Srf;

	private knownCalls: Map<string, BaseSipCall>;

	private settings: IMediaCallServerSettings;

	private wasEverEnabled = false;

	public get sessionId(): string {
		return this._sessionId;
	}

	constructor() {
        /* Implementation Hidden */
    }

	public reactToCallUpdate(params: { callId: string; dtmf?: ClientMediaSignalBody<'dtmf'> }): void {
        /* Implementation Hidden */
    }

	public reportInternalCallUpdate(callId: string): void {
        /* Implementation Hidden */
    }

	public registerCall(call: BaseSipCall): void {
        /* Implementation Hidden */
    }

	public configure(settings: IMediaCallServerSettings): void {
        /* Implementation Hidden */
    }

	public async createOutgoingCall(params: InternalCallParams): Promise<IMediaCall> {
        /* Implementation Hidden */
    }

	public async createSipDialog(
		sipExtension: string,
		opts: Srf.CreateUACOptions,
		progressCallbacks?: {
			cbRequest?: (error: unknown, req: Srf.SrfRequest) => void;
			cbProvisional?: (provisionalRes: Srf.SrfResponse) => void;
		},
	): Promise<Srf.Dialog> {
        /* Implementation Hidden */
    }

	public geContactUri(contact: MediaCallContact): string {
        /* Implementation Hidden */
    }

	public getExtensionUri(extension: string): string {
        /* Implementation Hidden */
    }

	public stripDrachtioServerDetails(reqOrRes: Srf.SipMessage): Record<string, any> {
        /* Implementation Hidden */
    }

	private isEnabledOnSettings(settings: IMediaCallServerSettings): boolean {
        /* Implementation Hidden */
    }

	private initializeDrachtio(): void {
        /* Implementation Hidden */
    }

	private connectDrachtio(): void {
        /* Implementation Hidden */
    }

	private async processInvite(req: SrfRequest, res: SrfResponse): Promise<void> {
        /* Implementation Hidden */
    }

	private forwardSipExceptionToResponse(exception: unknown, res: SrfResponse): void {
        /* Implementation Hidden */
    }

	private onDrachtioError(err: unknown, socket?: Socket): void {
        /* Implementation Hidden */
    }
}

```