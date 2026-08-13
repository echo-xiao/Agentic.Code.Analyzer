## File: packages/models/src/models/Team.ts

```typescript
import type { ITeam, RocketChatRecordDeleted, TeamType } from '@rocket.chat/core-typings';
import type { FindPaginated, ITeamModel } from '@rocket.chat/model-typings';
import type { Collection, FindCursor, Db, DeleteResult, Document, Filter, FindOptions, IndexDescription, UpdateResult } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class TeamRaw extends BaseRaw<ITeam> implements ITeamModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ITeam>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findByNames(names: Array<string>): FindCursor<ITeam>;

	findByNames(names: Array<string>, options: FindOptions<ITeam>): FindCursor<ITeam>;

	findByNames<P extends Document>(names: Array<string>, options: FindOptions<P extends ITeam ? ITeam : P>): FindCursor<P>;

	findByNames<P extends Document>(
		names: Array<string>,
		options?: undefined | FindOptions<ITeam> | FindOptions<P extends ITeam ? ITeam : P>,
	): FindCursor<P> | FindCursor<ITeam> {
        /* Implementation Hidden */
    }

	findByIds(ids: Array<string>, query?: Filter<ITeam>): FindCursor<ITeam>;

	findByIds(ids: Array<string>, options: FindOptions<ITeam>, query?: Filter<ITeam>): FindCursor<ITeam>;

	findByIds<P extends Document>(
		ids: Array<string>,
		options: FindOptions<P extends ITeam ? ITeam : P>,
		query?: Filter<ITeam>,
	): FindCursor<P>;

	findByIds<P extends Document>(
		ids: Array<string>,
		options?: undefined | FindOptions<ITeam> | FindOptions<P extends ITeam ? ITeam : P>,
		query?: Filter<ITeam>,
	): FindCursor<P> | FindCursor<ITeam> {
        /* Implementation Hidden */
    }

	findByIdsPaginated(
		ids: Array<string>,
		options?: undefined | FindOptions<ITeam>,
		query?: Filter<ITeam>,
	): FindPaginated<FindCursor<ITeam>> {
        /* Implementation Hidden */
    }

	findByIdsAndType(ids: Array<string>, type: TeamType): FindCursor<ITeam>;

	findByIdsAndType(ids: Array<string>, type: TeamType, options: FindOptions<ITeam>): FindCursor<ITeam>;

	findByIdsAndType<P extends Document>(
		ids: Array<string>,
		type: TeamType,
		options: FindOptions<P extends ITeam ? ITeam : P>,
	): FindCursor<P>;

	findByIdsAndType<P extends Document>(
		ids: Array<string>,
		type: TeamType,
		options?: undefined | FindOptions<ITeam> | FindOptions<P extends ITeam ? ITeam : P>,
	): FindCursor<P> | FindCursor<ITeam> {
        /* Implementation Hidden */
    }

	findByType(type: number): FindCursor<ITeam>;

	findByType(type: number, options: FindOptions<ITeam>): FindCursor<ITeam>;

	findByType<P extends Document>(type: number, options: FindOptions<P extends ITeam ? ITeam : P>): FindCursor<P>;

	findByType<P extends Document>(
		type: number,
		options?: undefined | FindOptions<ITeam> | FindOptions<P extends ITeam ? ITeam : P>,
	): FindCursor<ITeam> | FindCursor<P> {
        /* Implementation Hidden */
    }

	findByNameAndTeamIds(name: string | RegExp, teamIds: Array<string>): FindCursor<ITeam>;

	findByNameAndTeamIds(name: string | RegExp, teamIds: Array<string>, options: FindOptions<ITeam>): FindCursor<ITeam>;

	findByNameAndTeamIds<P extends Document>(
		name: string | RegExp,
		teamIds: Array<string>,
		options: FindOptions<P extends ITeam ? ITeam : P>,
	): FindCursor<P>;

	findByNameAndTeamIds<P extends Document>(
		name: string | RegExp,
		teamIds: Array<string>,
		options?: undefined | FindOptions<ITeam> | FindOptions<P extends ITeam ? ITeam : P>,
	): FindCursor<P> | FindCursor<ITeam> {
        /* Implementation Hidden */
    }

	findOneByName(name: string | RegExp): Promise<ITeam | null>;

	findOneByName(name: string | RegExp, options: FindOptions<ITeam>): Promise<ITeam | null>;

	findOneByName<P extends Document>(name: string | RegExp, options: FindOptions<P>): Promise<P | null>;

	findOneByName<P extends Document>(
		name: string | RegExp,
		options?: undefined | FindOptions<ITeam> | FindOptions<P extends ITeam ? ITeam : P>,
	): Promise<P | null> | Promise<ITeam | null> {
        /* Implementation Hidden */
    }

	findOneByMainRoomId(roomId: string): Promise<ITeam | null>;

	findOneByMainRoomId(roomId: string, options: FindOptions<ITeam>): Promise<ITeam | null>;

	findOneByMainRoomId<P extends Document>(roomId: string, options: FindOptions<P>): Promise<P | null>;

	findOneByMainRoomId<P extends Document>(
		roomId: string,
		options?: undefined | FindOptions<ITeam> | FindOptions<P extends ITeam ? ITeam : P>,
	): Promise<P | null> | Promise<ITeam | null> {
        /* Implementation Hidden */
    }

	updateMainRoomForTeam(id: string, roomId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	deleteOneById(id: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	deleteOneByName(name: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	updateNameAndType(teamId: string, nameAndType: { name?: string; type?: TeamType }): Promise<UpdateResult> {
        /* Implementation Hidden */
    }
}

```