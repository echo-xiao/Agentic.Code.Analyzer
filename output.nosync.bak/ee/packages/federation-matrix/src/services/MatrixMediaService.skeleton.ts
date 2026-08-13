## File: ee/packages/federation-matrix/src/services/MatrixMediaService.ts

```typescript
import type { IUploadDetails } from '@rocket.chat/apps-engine/definition/uploads/IUploadDetails';
import { Upload } from '@rocket.chat/core-services';
import type { IUpload } from '@rocket.chat/core-typings';
import { federationSDK } from '@rocket.chat/federation-sdk';
import { Logger } from '@rocket.chat/logger';
import { Avatars, Uploads } from '@rocket.chat/models';

const logger = new Logger('federation-matrix:media-service');

export interface IRemoteFileReference {
	name: string;
	size: number;
	type: string;
	mxcUri: string;
	serverName: string;
	mediaId: string;
}

export class MatrixMediaService {
	static generateMXCUri(fileId: string, serverName: string): string {
        /* Implementation Hidden */
    }

	static parseMXCUri(mxcUri: string): { serverName: string; mediaId: string } | null {
        /* Implementation Hidden */
    }

	static async prepareLocalFileForMatrix(fileId: string, serverName: string, matrixRoomId: string): Promise<string> {
        /* Implementation Hidden */
    }

	static async getLocalFileForMatrixNode(mediaId: string, serverName: string): Promise<IUpload | null> {
        /* Implementation Hidden */
    }

	static async downloadAndStoreRemoteFile(mxcUri: string, matrixRoomId: string, metadata: IUploadDetails): Promise<string> {
        /* Implementation Hidden */
    }

	static async getLocalFileBuffer(file: IUpload): Promise<Buffer> {
        /* Implementation Hidden */
    }
}

```