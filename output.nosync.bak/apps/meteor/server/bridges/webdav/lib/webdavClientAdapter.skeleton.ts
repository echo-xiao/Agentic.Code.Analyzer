## File: apps/meteor/server/bridges/webdav/lib/webdavClientAdapter.ts

```typescript
import stream from 'node:stream';
import type { Readable, Writable } from 'node:stream';

import type { WebDAVClient, FileStat, ResponseDataDetailed, WebDAVClientOptions } from 'webdav';
import { createClient } from 'webdav';

export class WebdavClientAdapter {
	_client: WebDAVClient;

	constructor(serverConfig: string, cred: WebDAVClientOptions) {
        /* Implementation Hidden */
    }

	async stat(path: string): Promise<FileStat | ResponseDataDetailed<FileStat>> {
        /* Implementation Hidden */
    }

	async createDirectory(path: string): Promise<void> {
        /* Implementation Hidden */
    }

	async deleteFile(path: string): Promise<void> {
        /* Implementation Hidden */
    }

	async getFileContents(filename: string): Promise<Buffer> {
        /* Implementation Hidden */
    }

	async getDirectoryContents(path: string): Promise<FileStat[] | ResponseDataDetailed<FileStat[]>> {
        /* Implementation Hidden */
    }

	async putFileContents(path: string, data: Buffer, options: Record<string, any> = {}): Promise<any> {
        /* Implementation Hidden */
    }

	createReadStream(path: string, options?: Record<string, any>): Readable {
        /* Implementation Hidden */
    }

	createWriteStream(path: string, fileSize: number): Writable {
        /* Implementation Hidden */
    }
}

```