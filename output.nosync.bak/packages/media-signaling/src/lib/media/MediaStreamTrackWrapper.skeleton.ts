## File: packages/media-signaling/src/lib/media/MediaStreamTrackWrapper.ts

```typescript
import { Emitter } from '@rocket.chat/emitter';

/**
 * As a workaround for a chrome bug, we use a delay to ignore any 'mute' events that are immediately followed by an 'unmute' event.
 * */
const MUTE_DELAY = 500;
const ENDED_INTERVAL = 100;

export type MediaStreamTrackEvents = {
	mute: void;
	unmute: void;
	ended: void;
};

export class MediaStreamTrackWrapper {
	/**
	 * muted is a flag that determines if the track has media coming in
	 */
	public get muted(): boolean {
		return this.muteTriggered;
	}

	public get ended(): boolean {
		return this.endedTriggered || this.track.readyState === 'ended';
	}

	/**
	 * enabled is a flag that determines if the rocket.chat client wants this track to be enabled
	 * */
	public get enabled(): boolean {
		return this.track.enabled;
	}

	public set enabled(value: boolean) {
		this.track.enabled = value;
	}

	public readonly emitter: Emitter<MediaStreamTrackEvents>;

	private muteTriggered = false;

	private endedTriggered = false;

	private muteTimeoutHandler: ReturnType<typeof setTimeout> | null = null;

	private endedIntervalHandler: ReturnType<typeof setInterval> | null = null;

	private cleared = false;

	private _onTrackMute: () => void;

	private _onTrackUnmute: () => void;

	private _onTrackEnded: () => void;

	constructor(public readonly track: MediaStreamTrack) {
        /* Implementation Hidden */
    }

	public clear() {
        /* Implementation Hidden */
    }

	private setMuted(muted: boolean) {
        /* Implementation Hidden */
    }

	private setEnded() {
        /* Implementation Hidden */
    }

	private onTrackMute() {
        /* Implementation Hidden */
    }

	private onTrackUnmute() {
        /* Implementation Hidden */
    }

	private clearMuteTimeout() {
        /* Implementation Hidden */
    }

	private clearEndedInterval() {
        /* Implementation Hidden */
    }
}

```