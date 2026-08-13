## File: apps/meteor/tests/data/file.helper.ts

```typescript
import * as fs from 'fs';

import type { IMessage } from '@rocket.chat/core-typings';

import { api } from './api-data';
import type { IRequestConfig } from './users.helper';

/**
 * Uploads a file to Rocket.Chat using the two-step process (rooms.media then rooms.mediaConfirm).
 *
 * @param roomId - The room ID where the file will be uploaded
 * @param filePath - Path to the file to upload
 * @param description - Description for the file
 * @param config - Request configuration with credentials and request instance
 * @param message - Optional message text to include with the file
 * @returns Promise resolving to the message response
 */
export async function uploadFileToRC(
	roomId: string,
	filePath: string,
	description: string,
	config: IRequestConfig,
	message = '',
): Promise<{ message: IMessage }> {
    /* Implementation Hidden */
}

/**
 * Gets the list of files for a room.
 *
 * @param roomId - The room ID
 * @param config - Request configuration
 * @param options - Optional query parameters (name for filtering, count, offset)
 * @returns Promise resolving to the files list response
 */
export async function getFilesList(
	roomId: string,
	config: IRequestConfig,
	options: { name?: string; count?: number; offset?: number } = {},
): Promise<{
	files: Array<{
		_id: string;
		name: string;
		size: number;
		type: string;
		rid: string;
		userId: string;
		path?: string;
		url?: string;
		uploadedAt?: string;
		federation?: {
			mrid?: string;
			mxcUri?: string;
			serverName?: string;
			mediaId?: string;
		};
	}>;
	count: number;
	offset: number;
	total: number;
	success: boolean;
}> {
    /* Implementation Hidden */
}

/**
 * Downloads a file and verifies it matches the original file using binary comparison.
 *
 * @param fileUrl - The URL to download the file from (relative path like /file-upload/...)
 * @param originalFilePath - Path to the original file to compare against
 * @param config - Request configuration
 * @returns Promise resolving to true if files match byte-by-byte
 */
export async function downloadFileAndVerifyBinary(fileUrl: string, originalFilePath: string, config: IRequestConfig): Promise<boolean> {
    /* Implementation Hidden */
}

```