## File: packages/media-signaling/src/lib/media/MediaStreamWrapper.ts

```typescript
import { Emitter } from '@rocket.chat/emitter';

import { MediaStreamTrackWrapper } from './MediaStreamTrackWrapper';
import type { IMediaSignalLogger } from '../../definition/logger';
import type { IMediaStreamWrapper, MediaStreamEvents } from '../../definition/media/IMediaStreamWrapper';

const AUDIO_STATS_INTERVAL = 50;

export class MediaStreamWrapper implements IMediaStreamWrapper {
	public readonly emitter: Emitter<MediaStreamEvents>;

	public readonly remote: boolean;

	public get local(): boolean {
		return !this.remote;
	}

	public readonly stream: MediaStream;

	public get localId(): string {
		return this.stream.id;
	}

	private _active: boolean;

	public get active(): boolean {
		return this._active;
	}

	private audioEnabled = true;

	private audioTrack: MediaStreamTrackWrapper | null = null;

	private videoTrack: MediaStreamTrackWrapper | null = null;

	private audioSender: RTCRtpSender | null = null;

	private videoSender: RTCRtpSender | null = null;

	private stopped = false;

	private remoteIds: string[];

	private _trackingAudioStats: boolean;

	private _audioLevel: number;

	public get audioLevel(): number {
		return this._audioLevel;
	}

	constructor(
		remote: boolean,
		public readonly tag: string,
		private readonly peer: RTCPeerConnection,
		private readonly logger?: IMediaSignalLogger,
	) {
        /* Implementation Hidden */
    }

	public hasAudio(): boolean {
        /* Implementation Hidden */
    }

	public hasVideo(): boolean {
        /* Implementation Hidden */
    }

	public isAudioMutedBySystem(): boolean {
        /* Implementation Hidden */
    }

	public isAudioEnabled(): boolean {
        /* Implementation Hidden */
    }

	public isStopped(): boolean {
        /* Implementation Hidden */
    }

	public setAudioEnabled(enabled: boolean) {
        /* Implementation Hidden */
    }

	public setActive(active: boolean) {
        /* Implementation Hidden */
    }

	public stop(): void {
        /* Implementation Hidden */
    }

	public async setTrack(kind: MediaStreamTrack['kind'], track: MediaStreamTrack | null): Promise<void> {
        /* Implementation Hidden */
    }

	public addRemoteId(id: string): void {
        /* Implementation Hidden */
    }

	public hasRemoteId(id: string): boolean {
        /* Implementation Hidden */
    }

	private getTracks(kind?: MediaStreamTrack['kind'] | null): MediaStreamTrack[] {
        /* Implementation Hidden */
    }

	private removeTracks(kind?: MediaStreamTrack['kind']): void {
        /* Implementation Hidden */
    }

	private async replaceTrack(kind: MediaStreamTrack['kind'], newTrack: MediaStreamTrack | null): Promise<void> {
        /* Implementation Hidden */
    }

	private async syncTrackChange(kind: MediaStreamTrack['kind'], track: MediaStreamTrack | null): Promise<void> {
        /* Implementation Hidden */
    }

	private wrapTrack(kind: MediaStreamTrack['kind'], track: MediaStreamTrack | null) {
        /* Implementation Hidden */
    }

	private isSameTrack(trackId: string): boolean {
        /* Implementation Hidden */
    }

	private getWrappedTrack(kind: MediaStreamTrack['kind']): MediaStreamTrackWrapper | null {
        /* Implementation Hidden */
    }

	private registerAudioLevelTracker() {
        /* Implementation Hidden */
    }

	private async collectAudioStats() {
        /* Implementation Hidden */
    }
}

```