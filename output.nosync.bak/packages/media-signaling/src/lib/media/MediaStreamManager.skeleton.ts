## File: packages/media-signaling/src/lib/media/MediaStreamManager.ts

```typescript
import { Emitter } from '@rocket.chat/emitter';

import { MediaStreamWrapper } from './MediaStreamWrapper';
import type { IMediaSignalLogger } from '../../definition';
import type { IMediaStreamManager, MediaStreamManagerEvents } from '../../definition/media/IMediaStreamManager';
import type { MediaStreamIdentification } from '../../definition/media/MediaStreamIdentification';

export class MediaStreamManager implements IMediaStreamManager {
	public readonly emitter: Emitter<MediaStreamManagerEvents>;

	public readonly mainLocal: MediaStreamWrapper;

	public readonly screenShareLocal: MediaStreamWrapper;

	public readonly mainRemote: MediaStreamWrapper;

	public readonly screenShareRemote: MediaStreamWrapper;

	constructor(
		protected readonly peer: RTCPeerConnection,
		protected readonly logger?: IMediaSignalLogger,
	) {
        /* Implementation Hidden */
    }

	public stopRemoteStreams(): void {
        /* Implementation Hidden */
    }

	public setRemoteIds(streams: MediaStreamIdentification[]): void {
        /* Implementation Hidden */
    }

	public getLocalStreamIds(): MediaStreamIdentification[] {
        /* Implementation Hidden */
    }

	public addRemoteTrack(track: MediaStreamTrack, streams: readonly MediaStream[]): void {
        /* Implementation Hidden */
    }

	public getStreams(): MediaStreamWrapper[] {
        /* Implementation Hidden */
    }

	public getLocalStreams(): MediaStreamWrapper[] {
        /* Implementation Hidden */
    }

	public getRemoteStreams(): MediaStreamWrapper[] {
        /* Implementation Hidden */
    }

	public getLocalStreamByTag(tag: string): MediaStreamWrapper | null {
        /* Implementation Hidden */
    }

	public getRemoteStreamByTag(tag: string): MediaStreamWrapper | null {
        /* Implementation Hidden */
    }

	public hasAllRequiredTracks(): boolean {
        /* Implementation Hidden */
    }

	private findStreamWrappersForRemoteTrack(track: MediaStreamTrack, streams: readonly MediaStream[]): MediaStreamWrapper[] {
        /* Implementation Hidden */
    }

	private createStream(remote: boolean, tag: string): MediaStreamWrapper {
        /* Implementation Hidden */
    }

	private getRemoteStreamById(id: string): MediaStreamWrapper | null {
        /* Implementation Hidden */
    }
}

```