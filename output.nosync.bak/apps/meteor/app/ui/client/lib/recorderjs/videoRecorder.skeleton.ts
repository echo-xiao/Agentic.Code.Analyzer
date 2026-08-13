## File: apps/meteor/app/ui/client/lib/recorderjs/videoRecorder.ts

```typescript
import { Emitter } from '@rocket.chat/emitter';
import { useCallback, useSyncExternalStore } from 'react';

type VideoRecorderEvents = {
	cameraStartedChange: boolean;
};

class VideoRecorder extends Emitter<VideoRecorderEvents> {
	private _cameraStarted = false;

	private started = false;

	private recordingAvailable = false;

	private videoel: HTMLVideoElement | undefined;

	private chunks: Blob[] = [];

	private stream: MediaStream | undefined;

	private mediaRecorder: MediaRecorder | undefined;

	private sessionId = 0;

	public get cameraStarted(): boolean {
		return this._cameraStarted;
	}

	private setCameraStarted(value: boolean) {
        /* Implementation Hidden */
    }

	public getSupportedMimeTypes() {
        /* Implementation Hidden */
    }

	public start(videoel?: HTMLVideoElement, cb?: (this: this, success: boolean) => void) {
        /* Implementation Hidden */
    }

	public record() {
        /* Implementation Hidden */
    }

	private stopStreamTracks(stream: MediaStream) {
        /* Implementation Hidden */
    }

	private isStaleSession(sessionId: number): boolean {
        /* Implementation Hidden */
    }

	private startUserMedia(stream: MediaStream) {
        /* Implementation Hidden */
    }

	public stop(cb?: (blob: Blob) => void) {
        /* Implementation Hidden */
    }

	public stopRecording() {
        /* Implementation Hidden */
    }
}

const instance = new VideoRecorder();

export { instance as VideoRecorder };

export const useVideoRecorderCameraStarted = (): boolean =>
	useSyncExternalStore(
		useCallback((onStoreChange) => instance.on('cameraStartedChange', onStoreChange), []),
		() => instance.cameraStarted,
	);

```