## File: packages/models/src/models/EmojiCustom.ts

```typescript
import type { IEmojiCustom, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IEmojiCustomModel, InsertionModel } from '@rocket.chat/model-typings';
import type { Collection, FindCursor, Db, FindOptions, IndexDescription, InsertOneResult, UpdateResult, WithId } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class EmojiCustomRaw extends BaseRaw<IEmojiCustom> implements IEmojiCustomModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IEmojiCustom>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	// find
	findByNameOrAlias(emojiName: string, options?: FindOptions<IEmojiCustom>): FindCursor<IEmojiCustom> {
        /* Implementation Hidden */
    }

	findByNameOrAliasExceptID(name: string, except: string, options?: FindOptions<IEmojiCustom>): FindCursor<IEmojiCustom> {
        /* Implementation Hidden */
    }

	// update
	setName(_id: string, name: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setAliases(_id: string, aliases: string[]): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setExtension(_id: string, extension: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setETagByName(name: string, etag: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	// INSERT
	create(data: InsertionModel<IEmojiCustom>): Promise<InsertOneResult<WithId<IEmojiCustom>>> {
        /* Implementation Hidden */
    }

	countByNameOrAlias(name: string): Promise<number> {
        /* Implementation Hidden */
    }

	// TODO: convert name: string to branded type using to enforce validation also replace this type cross the models/apis
	findOneByName(name: string, options?: FindOptions<IEmojiCustom>): Promise<IEmojiCustom | null> {
        /* Implementation Hidden */
    }
}

```