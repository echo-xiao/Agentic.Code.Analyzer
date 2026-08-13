## File: packages/media-signaling/src/lib/Call.ts

```typescript
import { Emitter } from '@rocket.chat/emitter';

import type { MediaSignalTransportWrapper } from './TransportWrapper';
import type { ClientMediaSignalError, IServiceProcessorFactoryList } from '../definition';
import { NegotiationManager } from './NegotiationManager';
import type {
	IClientMediaCall,
	CallEvents,
	CallContact,
	CallRole,
	CallState,
	CallService,
	CallHangupReason,
	CallActorType,
	CallFlag,
	CallFeature,
	IClientMediaCallLocalParticipant,
	IClientMediaCallRemoteParticipant,
	AnyClientMediaCallParticipant,
} from '../definition/call';
import type { AnyMediaCallData } from '../definition/call/callStates';
import type { ClientContractState, ClientState } from '../definition/client';
import type { IMediaSignalLogger } from '../definition/logger';
import type { MediaStreamIdentification, IMediaStreamWrapper } from '../definition/media';
import type { IWebRTCProcessor, WebRTCInternalStateMap } from '../definition/services';
import { isPendingState } from './services/states';
import { serializeError } from './utils/serializeError';
import type {
	ServerMediaSignal,
	ServerMediaSignalNewCall,
	ServerMediaSignalNotification,
	ServerMediaSignalRemoteSDP,
	ServerMediaSignalRequestOffer,
} from '../definition/signals/server';

export interface IClientMediaCallConfig {
	userId: string;
	logger?: IMediaSignalLogger;
	transporter: MediaSignalTransportWrapper;
	processorFactories: IServiceProcessorFactoryList;
	sessionId: string;

	iceGatheringTimeout: number;
	iceServers: RTCIceServer[];
	supportedFeatures: CallFeature[];
}

const TIMEOUT_TO_ACCEPT = 60000;
const TIMEOUT_TO_CONFIRM_ACCEPTANCE = 2000;
const TIMEOUT_TO_PROGRESS_SIGNALING = 10000;
const STATE_REPORT_DELAY = 300;
const CALLS_WITH_NO_REMOTE_DATA_REPORT_DELAY = 5000;

// if the server tells us we're the caller in a call we don't recognize, ignore it completely
const AUTO_IGNORE_UNKNOWN_OUTBOUND_CALLS = true;

type StateTimeoutData = {
	state: ClientState;
	reset: () => void;
	clear: () => void;
};

export class ClientMediaCall implements IClientMediaCall {
	public get callId(): string {
		return this.remoteCallId ?? this.localCallId;
	}

	public readonly emitter: Emitter<CallEvents>;

	private _role: CallRole;

	public get role(): CallRole {
		return this._role;
	}

	private _state: CallState;

	public get state(): CallState {
		return this._state;
	}

	private _ignored: boolean;

	public get ignored(): boolean {
		return this._ignored;
	}

	private _contact: CallContact | null;

	public get contact(): CallContact {
		return this._contact || {};
	}

	private _transferredBy: CallContact | null;

	public get transferredBy(): CallContact | null {
		if (!this._transferredBy) {
			return null;
		}

		return { ...this._transferredBy };
	}

	private _service: CallService | null;

	public get service(): CallService | null {
		return this._service;
	}

	public get signed(): boolean {
		return ['signed', 'pre-signed', 'self-signed'].includes(this.contractState);
	}

	public get hidden(): boolean {
		/**
		 * A call is hidden if:
		 * 1. It was flagged as ignored by the Session
		 * 2. It is happening in a different session
		 * 3. The call was started in some other session and we have not received its data yet
		 *    Since the Call instance is only created when we receive "something" from the server, this would mean we received signals out of order, or missed one.
		 */

		return this.ignored || this.contractState === 'ignored' || !this.initialized;
	}

	public get muted(): boolean {
		if (!this.webrtcProcessor) {
			return false;
		}

		return this.webrtcProcessor.muted;
	}

	/** indicates if the call is on hold */
	public get held(): boolean {
		if (!this.webrtcProcessor) {
			return false;
		}

		return this.webrtcProcessor.held;
	}

	private _remoteHeld: boolean;

	public get remoteHeld(): boolean {
		return this._remoteHeld;
	}

	private _remoteMute: boolean;

	public get remoteMute(): boolean {
		return this._remoteMute;
	}

	/** indicates the call is past the "dialing" stage and not yet over */
	public get busy(): boolean {
		return !this.isPendingAcceptance() && !this.isOver();
	}

	public get confirmed(): boolean {
		return this.hasRemoteData;
	}

	public get tempCallId(): string {
		return this.localCallId;
	}

	private _activeTimestamp: Date | undefined;

	public get activeTimestamp(): Date | undefined {
		if (!this._activeTimestamp) {
			return undefined;
		}

		return new Date(this._activeTimestamp);
	}

	protected webrtcProcessor: IWebRTCProcessor | null = null;

	private acceptedLocally: boolean;

	private acceptedRemotely: boolean;

	private endedLocally: boolean;

	private hasRemoteData: boolean;

	private _initialized: boolean;

	public get initialized(): boolean {
		return this._initialized;
	}

	private acknowledged: boolean;

	private earlySignals: Set<ServerMediaSignal>;

	private stateTimeoutHandlers: Set<StateTimeoutData>;

	private remoteCallId: string | null;

	private oldClientState: ClientState;

	private serviceStates: Map<string, string>;

	private stateReporterTimeoutHandler: ReturnType<typeof setTimeout> | null;

	private mayReportStates: boolean;

	private contractState: ClientContractState;

	private inputTrack: MediaStreamTrack | null;

	private screenVideoTrack: MediaStreamTrack | null;

	/** localCallId will only be different on calls initiated by this session */
	private localCallId: string;

	private creationTimestamp: Date;

	private negotiationManager: NegotiationManager;

	private sentLocalSdp: boolean;

	private receivedRemoteSdp: boolean;

	private enabledFeatures: CallFeature[] | null;

	private _flags: CallFlag[];

	public get flags(): CallFlag[] {
		return [...this._flags];
	}

	public get features(): CallFeature[] {
		return [...(this.enabledFeatures || [])];
	}

	public readonly localParticipant: IClientMediaCallLocalParticipant;

	private selfContact: CallContact | null;

	private remoteParticipant: IClientMediaCallRemoteParticipant | null;

	public get remoteParticipants(): IClientMediaCallRemoteParticipant[] {
		if (!this.remoteParticipant) {
			return [];
		}

		return [this.remoteParticipant];
	}

	public get participants(): AnyClientMediaCallParticipant[] {
		return [this.localParticipant, ...this.remoteParticipants];
	}

	public get callStateData(): AnyMediaCallData {
		if (!this.confirmed || !this.remoteParticipant) {
			const number = this.contact.type === 'sip' ? this.contact.id : '';

			return {
				confirmed: false,
				tempCallId: this.tempCallId,
				state: this.state,
				title: this.contact.displayName || number || 'unknown',
				localParticipant: this.localParticipant,
			};
		}

		return {
			confirmed: this.confirmed,
			callId: this.callId,
			service: this.service,
			flags: this.flags,
			features: this.features,
			state: this.state,
			transferredBy: this.transferredBy,
			activeTimestamp: this.activeTimestamp,
			tempCallId: this.tempCallId,
			hidden: this.hidden,

			localParticipant: this.localParticipant,
			remoteParticipant: this.remoteParticipant,
		};
	}

	constructor(
		private readonly config: IClientMediaCallConfig,
		callId: string,
		{ inputTrack }: { inputTrack?: MediaStreamTrack | null } = {},
	) {
        /* Implementation Hidden */
    }

	/**
	 * Initialize an outbound call with basic contact information until we receive the full call details from the server;
	 * this gets executed once for outbound calls initiated in this session.
	 */
	public async initializeOutboundCall(contact: CallContact): Promise<void> {
        /* Implementation Hidden */
    }

	/** Initialize an outbound call with the callee information and send a call request to the server */
	public async requestCall(
		callee: { type: CallActorType; id: string },
		supportedFeatures: CallFeature[],
		contactInfo?: CallContact,
	): Promise<void> {
        /* Implementation Hidden */
    }

	/** initialize a call with the data received from the server on a 'new' signal; this gets executed once for every call */
	public async initializeRemoteCall(signal: ServerMediaSignalNewCall, oldCall?: ClientMediaCall | null): Promise<void> {
        /* Implementation Hidden */
    }

	public mayNeedInputTrack(): boolean {
        /* Implementation Hidden */
    }

	public needsInputTrack(): boolean {
        /* Implementation Hidden */
    }

	public hasInputTrack(): boolean {
        /* Implementation Hidden */
    }

	public isMissingInputTrack(): boolean {
        /* Implementation Hidden */
    }

	public getClientState(): ClientState {
        /* Implementation Hidden */
    }

	public async setInputTrack(newInputTrack: MediaStreamTrack | null): Promise<void> {
        /* Implementation Hidden */
    }

	public async setScreenVideoTrack(newVideoTrack: MediaStreamTrack | null): Promise<void> {
        /* Implementation Hidden */
    }

	public canHaveScreenVideoTrack(): boolean {
        /* Implementation Hidden */
    }

	public hasScreenVideoTrack(): boolean {
        /* Implementation Hidden */
    }

	public getLocalMediaStream(tag?: string): IMediaStreamWrapper | null {
        /* Implementation Hidden */
    }

	public getRemoteMediaStream(tag?: string): IMediaStreamWrapper | null {
        /* Implementation Hidden */
    }

	public async processSignal(signal: ServerMediaSignal, oldCall?: ClientMediaCall | null) {
        /* Implementation Hidden */
    }

	public accept(): void {
        /* Implementation Hidden */
    }

	public reject(): void {
        /* Implementation Hidden */
    }

	public transfer(callee: { type: CallActorType; id: string }): void {
        /* Implementation Hidden */
    }

	public hangup(reason: CallHangupReason = 'normal'): void {
        /* Implementation Hidden */
    }

	public isPendingAcceptance(): boolean {
        /* Implementation Hidden */
    }

	public isPendingOurAcceptance(): boolean {
        /* Implementation Hidden */
    }

	public isOver(): boolean {
        /* Implementation Hidden */
    }

	public isAbleToReportStates(): boolean {
        /* Implementation Hidden */
    }

	public ignore(): void {
        /* Implementation Hidden */
    }

	public setMuted(muted: boolean): void {
        /* Implementation Hidden */
    }

	public setHeld(held: boolean): void {
        /* Implementation Hidden */
    }

	public requestScreenShare(requested: boolean): void {
        /* Implementation Hidden */
    }

	public setContractState(state: 'signed' | 'ignored') {
        /* Implementation Hidden */
    }

	public reportStates(): void {
        /* Implementation Hidden */
    }

	public sendDTMF(dtmf: string, duration?: number): void {
        /* Implementation Hidden */
    }

	public async getStats(selector?: MediaStreamTrack | null): Promise<RTCStatsReport | null> {
        /* Implementation Hidden */
    }

	public isFeatureAvailable(feature: CallFeature): boolean {
        /* Implementation Hidden */
    }

	public hasFlag(flag: CallFlag): boolean {
        /* Implementation Hidden */
    }

	private canChangeToState(newState: CallState): boolean {
        /* Implementation Hidden */
    }

	private changeState(newState: CallState): void {
        /* Implementation Hidden */
    }

	private updateClientState(): void {
        /* Implementation Hidden */
    }

	private maybeStopWebRTC(): void {
        /* Implementation Hidden */
    }

	private changeContact(
		contact: CallContact | null,
		{ prioritizeExisting, skipEvent }: { prioritizeExisting?: boolean; skipEvent?: boolean } = {},
	): void {
        /* Implementation Hidden */
    }

	protected async processOfferRequest(signal: ServerMediaSignalRequestOffer) {
        /* Implementation Hidden */
    }

	protected shouldIgnoreWebRTC(): boolean {
        /* Implementation Hidden */
    }

	protected async processAnswerRequest(signal: ServerMediaSignalRemoteSDP): Promise<void> {
        /* Implementation Hidden */
    }

	protected sendError(error: Partial<ClientMediaSignalError>): void {
        /* Implementation Hidden */
    }

	protected async processRemoteSDP(signal: ServerMediaSignalRemoteSDP): Promise<void> {
        /* Implementation Hidden */
    }

	protected deliverSdp(data: { sdp: RTCSessionDescriptionInit; negotiationId: string }) {
        /* Implementation Hidden */
    }

	protected getLocalStreamIds(): MediaStreamIdentification[] {
        /* Implementation Hidden */
    }

	protected async rejectAsUnavailable(): Promise<void> {
        /* Implementation Hidden */
    }

	protected async processEarlySignals(): Promise<void> {
        /* Implementation Hidden */
    }

	protected acknowledge(): void {
        /* Implementation Hidden */
    }

	private async processNotification(signal: ServerMediaSignalNotification) {
        /* Implementation Hidden */
    }

	private async flagAsAccepted(enabledFeatures?: CallFeature[]): Promise<void> {
        /* Implementation Hidden */
    }

	private flagAsEnded(reason: CallHangupReason): void {
        /* Implementation Hidden */
    }

	private addStateTimeout(state: ClientState, timeout: number, callback?: () => void): void {
        /* Implementation Hidden */
    }

	private getTimeoutHangupReason(state: ClientState): CallHangupReason {
        /* Implementation Hidden */
    }

	private resetStateTimeouts(): void {
        /* Implementation Hidden */
    }

	private updateStateTimeouts(): void {
        /* Implementation Hidden */
    }

	private clearStateTimeouts(): void {
        /* Implementation Hidden */
    }

	private updateRemoteStates(): void {
        /* Implementation Hidden */
    }

	private onWebRTCInternalStateChange(stateName: keyof WebRTCInternalStateMap): void {
        /* Implementation Hidden */
    }

	private onWebRTCStreamChanged(): void {
        /* Implementation Hidden */
    }

	private onNegotiationNeeded(oldNegotiationId: string): void {
        /* Implementation Hidden */
    }

	private onNegotiationStarted(): void {
        /* Implementation Hidden */
    }

	private onNegotiationError(negotiationId: string, errorCode: string): void {
        /* Implementation Hidden */
    }

	private onWebRTCConnectionStateChange(stateValue: RTCPeerConnectionState): void {
        /* Implementation Hidden */
    }

	private clearStateReporter(): void {
        /* Implementation Hidden */
    }

	private requestStateReport(): void {
        /* Implementation Hidden */
    }

	private throwError(error: string): never {
        /* Implementation Hidden */
    }

	private isSignalTargetingThisSession(signal: ServerMediaSignalRemoteSDP | ServerMediaSignalRequestOffer): boolean {
        /* Implementation Hidden */
    }

	private createLocalParticipantProxy(): IClientMediaCallLocalParticipant {
        /* Implementation Hidden */
    }

	private createRemoteParticipantProxy(): IClientMediaCallRemoteParticipant {
        /* Implementation Hidden */
    }

	private mayUseStreams(): this is ClientMediaCallWebRTC {
        /* Implementation Hidden */
    }

	private prepareWebRtcProcessor(): asserts this is ClientMediaCallWebRTC {
        /* Implementation Hidden */
    }

	private requireWebRTC(): asserts this is ClientMediaCallWebRTC {
        /* Implementation Hidden */
    }
}

export abstract class ClientMediaCallWebRTC extends ClientMediaCall {
	public abstract override webrtcProcessor: IWebRTCProcessor;
}

```