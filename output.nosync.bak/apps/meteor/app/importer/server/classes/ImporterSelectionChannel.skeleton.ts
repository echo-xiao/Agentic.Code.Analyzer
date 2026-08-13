## File: apps/meteor/app/importer/server/classes/ImporterSelectionChannel.ts

```typescript
import type { IImporterSelectionChannel } from '@rocket.chat/core-typings';

export class SelectionChannel implements IImporterSelectionChannel {
	public channel_id: string;

	public name: string | undefined;

	public is_archived: boolean;

	public do_import: boolean;

	public is_private: boolean;

	public is_direct: boolean;

	public creator: undefined;

	/**
	 * Constructs a new selection channel.
	 *
	 * @param channelId the unique identifier of the channel
	 * @param name the name of the channel
	 * @param isArchived whether the channel was archived or not
	 * @param doImport whether we will be importing the channel or not
	 */
	constructor(channelId: string, name: string | undefined, isArchived: boolean, doImport: boolean, isPrivate: boolean, isDirect: boolean) {
        /* Implementation Hidden */
    }
}

```