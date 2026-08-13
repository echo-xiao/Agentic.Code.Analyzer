## File: apps/meteor/app/apps/server/converters/videoConferences.ts

```typescript
import type { IAppVideoConferencesConverter, AppsVideoConference } from '@rocket.chat/apps';
import { VideoConf } from '@rocket.chat/core-services';
import type { VideoConference } from '@rocket.chat/core-typings';

export class AppVideoConferencesConverter implements IAppVideoConferencesConverter {
	async convertById(callId: string): Promise<AppsVideoConference | undefined> {
        /* Implementation Hidden */
    }

	convertVideoConference(call: undefined | null): undefined;

	convertVideoConference(call: VideoConference): AppsVideoConference;

	convertVideoConference(call: VideoConference | undefined | null): AppsVideoConference | undefined;

	convertVideoConference(call: VideoConference | undefined | null): AppsVideoConference | undefined {
        /* Implementation Hidden */
    }

	convertAppVideoConference(call: AppsVideoConference): VideoConference {
        /* Implementation Hidden */
    }
}

```