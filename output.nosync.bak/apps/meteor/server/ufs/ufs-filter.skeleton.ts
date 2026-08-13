## File: apps/meteor/server/ufs/ufs-filter.ts

```typescript
import type { IUpload } from '@rocket.chat/core-typings';
import { Meteor } from 'meteor/meteor';
import type { OptionalId } from 'mongodb';

type IFilterOptions = {
	contentTypes?: string[];
	extensions?: string[];
	minSize?: number;
	maxSize?: number;
	onCheck?: (file: IUpload, content?: Buffer | string) => Promise<boolean>;
	invalidFileError?: () => Meteor.Error;
	fileTooSmallError?: (fileSize: number, minFileSize: number) => Meteor.Error;
	fileTooLargeError?: (fileSize: number, maxFileSize: number) => Meteor.Error;
	invalidFileExtension?: (fileExtension: string, allowedExtensions: string[]) => Meteor.Error;
	invalidFileType?: (fileType: string | undefined, allowedContentTypes: string[]) => Meteor.Error;
};

export class Filter {
	private options: Required<IFilterOptions>;

	constructor(options: IFilterOptions) {
        /* Implementation Hidden */
    }

	async check(file: Omit<OptionalId<IUpload>, '_updatedAt'>, content?: Buffer | string) {
        /* Implementation Hidden */
    }

	getContentTypes() {
        /* Implementation Hidden */
    }

	getExtensions() {
        /* Implementation Hidden */
    }

	getMaxSize() {
        /* Implementation Hidden */
    }

	getMinSize() {
        /* Implementation Hidden */
    }

	isContentTypeInList(type: string | undefined, list: string[]) {
        /* Implementation Hidden */
    }

	async isValid(file: IUpload) {
        /* Implementation Hidden */
    }

	async onCheck(_file: Omit<OptionalId<IUpload>, '_updatedAt'>, _content?: Buffer | string) {
        /* Implementation Hidden */
    }
}

```