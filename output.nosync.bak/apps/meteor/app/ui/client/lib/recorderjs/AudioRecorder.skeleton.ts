## File: apps/meteor/app/ui/client/lib/recorderjs/AudioRecorder.ts

```typescript
import { AudioEncoder } from './AudioEncoder';
import { settings } from '../../../../../client/lib/settings';

export class AudioRecorder {
	private audioContext: AudioContext | undefined;

	private stream: MediaStream | undefined;

	private encoder: AudioEncoder | undefined;

	isSupported() {
        /* Implementation Hidden */
    }

	createAudioContext() {
        /* Implementation Hidden */
    }

	destroyAudioContext() {
        /* Implementation Hidden */
    }

	async createStream() {
        /* Implementation Hidden */
    }

	destroyStream() {
        /* Implementation Hidden */
    }

	async createEncoder() {
        /* Implementation Hidden */
    }

	destroyEncoder() {
        /* Implementation Hidden */
    }

	async start(cb?: (this: this, done: boolean) => void) {
        /* Implementation Hidden */
    }

	stop(cb: (data: Blob) => void) {
        /* Implementation Hidden */
    }
}

```