## File: packages/media-signaling/src/lib/Session.ts

```typescript
import { Emitter } from '@rocket.chat/emitter';

import { ClientMediaCall } from './Call';
import { MediaSignalTransportWrapper } from './TransportWrapper';
import type {
	ClientMediaSignal,
	IServiceProcessorFactoryList,
	MediaSignalTransport,
	MediaStreamFactory,
	RandomStringFactory,
	ServerMediaCallSignal,
	ServerMediaSessionSignal,
	ServerMediaSignal,
	ServerMediaSignalRegistered,
} from '../definition';
import type { IClientMediaCall, CallActorType, CallContact, CallFeature, AnyMediaCallData } from '../definition/call';
import type { IMediaSignalLogger } from '../definition/logger';
import { SessionRegistration } from './components/SessionRegistration';
import { isSameDeviceId } from './utils/isSameDeviceId';

export type MediaSignalingEvents = {
	sessionStateChange: void;
	newCall: { call: IClientMediaCall };
	acceptedCall: { call: IClientMediaCall };
	endedCall: void;
	hiddenCall: void;
	registered: { activeCalls: IClientMediaCall['callId'][] };
	outOfSync: { missingCalls: IClientMediaCall['callId'][] };
};

export type MediaSignalingSessionConfig = {
	userId: string;
	mobileDeviceId?: string;
	oldSessionId?: string;
	logger?: IMediaSignalLogger;
	processorFactories: IServiceProcessorFactoryList;
	mediaStreamFactory: MediaStreamFactory;
	displayMediaFactory: MediaStreamFactory;
	randomStringFactory: RandomStringFactory;
	transport: MediaSignalTransport<ClientMediaSignal>;
	iceGatheringTimeout?: number;
	iceServers?: RTCIceServer[];
	features: CallFeature[];
	autoSync?: boolean;
};

const STATE_REPORT_INTERVAL = 60000;

export class MediaSignalingSession extends Emitter<MediaSignalingEvents> {
	private _userId: string;

	private readonly _sessionId: string;

	private knownCalls: Map<string, ClientMediaCall>;

	private ignoredCalls: Set<string>;

	private transporter: MediaSignalTransportWrapper;

	private recurringStateReportHandler: ReturnType<typeof setInterval> | null;

	private inputTrack: MediaStreamTrack | null;

	private switchingInputTrack: boolean;

	private deviceId: ConstrainDOMString | null;

	private currentDeviceId: ConstrainDOMString | null;

	private callsToGetUserMedia: number;

	private lastRegisterTimestamp: Date | null = null;

	private lastState: { hasCall: boolean; hasVisibleCall: boolean; hasBusyCall: boolean };

	private sessionEnded = false;

	private registration: SessionRegistration;

	public get sessionId(): string {
		return this._sessionId;
	}

	public get userId(): string {
		return this._userId;
	}

	public get registered(): boolean {
		return this.registration.registered;
	}

	constructor(private config: MediaSignalingSessionConfig) {
        /* Implementation Hidden */
    }

	public isBusy(): boolean {
        /* Implementation Hidden */
    }

	public enableStateReport(interval: number): void {
        /* Implementation Hidden */
    }

	public disableStateReport(): void {
        /* Implementation Hidden */
    }

	public endSession(): void {
        /* Implementation Hidden */
    }

	public getCallData(callId: string): IClientMediaCall | null {
        /* Implementation Hidden */
    }

	public getState(skipLocal = false): (AnyMediaCallData & { call: IClientMediaCall }) | null {
        /* Implementation Hidden */
    }

	private getMainCall(skipLocal = false): ClientMediaCall | null {
        /* Implementation Hidden */
    }

	public async processSignal(signal: ServerMediaSignal): Promise<void> {
        /* Implementation Hidden */
    }

	private processSessionSignal(signal: ServerMediaSessionSignal): void {
        /* Implementation Hidden */
    }

	private async processCallSignal(signal: ServerMediaCallSignal): Promise<void> {
        /* Implementation Hidden */
    }

	public async setDeviceId(deviceId: ConstrainDOMString | null): Promise<void> {
        /* Implementation Hidden */
    }

	public async startCall(calleeType: CallActorType, calleeId: string, params: { contactInfo?: CallContact } = {}): Promise<void> {
        /* Implementation Hidden */
    }

	public setIceGatheringTimeout(newTimeout: number): void {
        /* Implementation Hidden */
    }

	public setIceServers(iceServers: RTCIceServer[]): void {
        /* Implementation Hidden */
    }

	private createTemporaryCallId(): string {
        /* Implementation Hidden */
    }

	private isCallIgnored(callId: string): boolean {
        /* Implementation Hidden */
    }

	private ignoreCall(callId: string) {
        /* Implementation Hidden */
    }

	private sendRegisterSignal(): void {
        /* Implementation Hidden */
    }

	private confirmSessionRegistered(signal: ServerMediaSignalRegistered): void {
        /* Implementation Hidden */
    }

	private getExistingCallBySignal(signal: ServerMediaCallSignal): ClientMediaCall | null {
        /* Implementation Hidden */
    }

	private getReplacedCallBySignal(signal: ServerMediaCallSignal): ClientMediaCall | null {
        /* Implementation Hidden */
    }

	private getOrCreateCallBySignal(signal: ServerMediaCallSignal): ClientMediaCall {
        /* Implementation Hidden */
    }

	private reportState(): void {
        /* Implementation Hidden */
    }

	private autoRegister(): void {
        /* Implementation Hidden */
    }

	private async setInputTrack(newInputTrack: MediaStreamTrack | null): Promise<void> {
        /* Implementation Hidden */
    }

	public requestInputTrackUpdate(): void {
        /* Implementation Hidden */
    }

	/**
	 * Switch ON/OFF the use of an audio input track
	 * If there's one already in use, remove it; Otherwise, request and use a new one.
	 * This function assumes the current state needs to change and doesn't check anything before starting the switch process
	 * Switching OFF is straightforward: the current track is removed and stopped
	 * Switching ON is a multi-step process:
	 * 1. We request a new track from the media stream factory
	 * 2. Once the media stream factory returns a valid track, we double check that we still need it
	 * 2.1. If the track is still needed, we set it to all active calls
	 * 2.2. If the track is no longer needed by then, we stop it and keep no reference to it
	 *
	 * The track state only changes by the end of the whole process, so there's no point in calling this function twice and we guard against it --
	 * but we don't guard against external changes to the track (for example, calling setDeviceId will also change the track state)
	 * */
	private async switchInputTrack(): Promise<void> {
        /* Implementation Hidden */
    }

	private shouldStartInputTrack(): boolean {
        /* Implementation Hidden */
    }

	private shouldSwitchInputTrack(): boolean {
        /* Implementation Hidden */
    }

	private getAudioConstraints(): boolean | MediaTrackConstraints {
        /* Implementation Hidden */
    }

	private async startInputTrack(): Promise<void> {
        /* Implementation Hidden */
    }

	private hangupCallsThatNeedInput(): void {
        /* Implementation Hidden */
    }

	private mayNeedInputTrack(): boolean {
        /* Implementation Hidden */
    }

	private async setScreenVideoTrack(newVideoTrack: MediaStreamTrack | null, call: ClientMediaCall): Promise<void> {
        /* Implementation Hidden */
    }

	private async startScreenVideoTrack(): Promise<MediaStreamTrack | void> {
        /* Implementation Hidden */
    }

	private async endScreenSharing(call: ClientMediaCall): Promise<void> {
        /* Implementation Hidden */
    }

	private async startScreenSharing(call: ClientMediaCall): Promise<void> {
        /* Implementation Hidden */
    }

	private createCall(callId: string): ClientMediaCall {
        /* Implementation Hidden */
    }

	private onCallContactUpdate(_call: ClientMediaCall): void {
        /* Implementation Hidden */
    }

	private onCallStateChange(_call: ClientMediaCall): void {
        /* Implementation Hidden */
    }

	private onCallClientStateChange(_call: ClientMediaCall): void {
        /* Implementation Hidden */
    }

	private onNewCall(_call: ClientMediaCall): void {
        /* Implementation Hidden */
    }

	private onConfirmedCall(_call: ClientMediaCall): void {
        /* Implementation Hidden */
    }

	private onAcceptedCall(_call: ClientMediaCall): void {
        /* Implementation Hidden */
    }

	private onAcceptingCall(_call: ClientMediaCall): void {
        /* Implementation Hidden */
    }

	private onTrackStateChange(_call: ClientMediaCall): void {
        /* Implementation Hidden */
    }

	private onEndedCall(call: ClientMediaCall): void {
        /* Implementation Hidden */
    }

	private onHiddenCall(_call: ClientMediaCall): void {
        /* Implementation Hidden */
    }

	private onActiveCall(_call: ClientMediaCall): void {
        /* Implementation Hidden */
    }

	private async onScreenShareRequestChange(call: ClientMediaCall, requested: boolean): Promise<void> {
        /* Implementation Hidden */
    }

	private onSessionStateChange(): void {
        /* Implementation Hidden */
    }
}

```