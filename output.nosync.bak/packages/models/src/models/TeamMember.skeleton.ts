## File: packages/models/src/models/TeamMember.ts

```typescript
import type { IRole, ITeamMember, IUser, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { FindPaginated, ITeamMemberModel } from '@rocket.chat/model-typings';
import type {
	Collection,
	FindCursor,
	Db,
	DeleteResult,
	Document,
	Filter,
	FindOptions,
	IndexDescription,
	InsertOneResult,
	UpdateResult,
} from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class TeamMemberRaw extends BaseRaw<ITeamMember> implements ITeamMemberModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ITeamMember>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findByUserId(userId: string): FindCursor<ITeamMember>;

	findByUserId(userId: string, options: FindOptions<ITeamMember>): FindCursor<ITeamMember>;

	findByUserId<P extends Document>(userId: string, options: FindOptions<P>): FindCursor<P>;

	findByUserId<P extends Document>(
		userId: string,
		options?: undefined | FindOptions<ITeamMember> | FindOptions<P extends ITeamMember ? ITeamMember : P>,
	): FindCursor<P> | FindCursor<ITeamMember> {
        /* Implementation Hidden */
    }

	findOneByUserIdAndTeamId(userId: string, teamId: string): Promise<ITeamMember | null>;

	findOneByUserIdAndTeamId(userId: string, teamId: string, options: FindOptions<ITeamMember>): Promise<ITeamMember | null>;

	findOneByUserIdAndTeamId<P extends Document>(userId: string, teamId: string, options: FindOptions<P>): Promise<P | null>;

	findOneByUserIdAndTeamId<P extends Document>(
		userId: string,
		teamId: string,
		options?: undefined | FindOptions<ITeamMember> | FindOptions<P extends ITeamMember ? ITeamMember : P>,
	): Promise<P | null | ITeamMember> {
        /* Implementation Hidden */
    }

	findByTeamId(teamId: string): FindCursor<ITeamMember>;

	findByTeamId(teamId: string, options: FindOptions<ITeamMember>): FindCursor<ITeamMember>;

	findByTeamId<P extends Document>(teamId: string, options: FindOptions<P>): FindCursor<P>;

	findByTeamId<P extends Document>(
		teamId: string,
		options?: undefined | FindOptions<ITeamMember> | FindOptions<P extends ITeamMember ? ITeamMember : P>,
	): FindCursor<P> | FindCursor<ITeamMember> {
        /* Implementation Hidden */
    }

	countByTeamId(teamId: string): Promise<number> {
        /* Implementation Hidden */
    }

	findByTeamIds(teamIds: Array<string>): FindCursor<ITeamMember>;

	findByTeamIds(teamIds: Array<string>, options: FindOptions<ITeamMember>): FindCursor<ITeamMember>;

	findByTeamIds<P extends Document>(teamIds: Array<string>, options: FindOptions<P>): FindCursor<P>;

	findByTeamIds<P extends Document>(
		teamIds: Array<string>,
		options?: undefined | FindOptions<ITeamMember> | FindOptions<P extends ITeamMember ? ITeamMember : P>,
	): FindCursor<P> | FindCursor<ITeamMember> {
        /* Implementation Hidden */
    }

	findByTeamIdAndRole(teamId: string, role: IRole['_id']): FindCursor<ITeamMember>;

	findByTeamIdAndRole(teamId: string, role: IRole['_id'], options: FindOptions<ITeamMember>): FindCursor<ITeamMember>;

	findByTeamIdAndRole<P extends Document>(teamId: string, role: IRole['_id'], options: FindOptions<P>): FindCursor<P>;

	findByTeamIdAndRole<P extends Document>(
		teamId: string,
		role: IRole['_id'],
		options?: undefined | FindOptions<ITeamMember> | FindOptions<P extends ITeamMember ? ITeamMember : P>,
	): FindCursor<P> | FindCursor<ITeamMember> {
        /* Implementation Hidden */
    }

	countByTeamIdAndRole(teamId: string, role: IRole['_id']): Promise<number> {
        /* Implementation Hidden */
    }

	findByUserIdAndTeamIds(userId: string, teamIds: Array<string>, options: FindOptions<ITeamMember> = {}): FindCursor<ITeamMember> {
        /* Implementation Hidden */
    }

	findPaginatedMembersInfoByTeamId(
		teamId: string,
		limit: number,
		skip: number,
		query?: Filter<ITeamMember>,
	): FindPaginated<FindCursor<ITeamMember>> {
        /* Implementation Hidden */
    }

	updateOneByUserIdAndTeamId(userId: string, teamId: string, update: Partial<ITeamMember>): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	createOneByTeamIdAndUserId(
		teamId: string,
		userId: string,
		createdBy: Pick<IUser, '_id' | 'username'>,
	): Promise<InsertOneResult<ITeamMember>> {
        /* Implementation Hidden */
    }

	updateRolesByTeamIdAndUserId(teamId: string, userId: string, roles: Array<IRole['_id']>): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	removeRolesByTeamIdAndUserId(teamId: string, userId: string, roles: Array<IRole['_id']>): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	deleteByUserIdAndTeamId(userId: string, teamId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	deleteByTeamId(teamId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }
}

```