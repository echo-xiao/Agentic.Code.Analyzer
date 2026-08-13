## File: apps/meteor/client/lib/rooms/roomCoordinator.tsx

```typescript
import type { IRoom, RoomType, IUser, AtLeast, ValueOf, ISubscription } from '@rocket.chat/core-typings';
import type { RouteName } from '@rocket.chat/ui-contexts';

import { hasPermission } from '../../../app/authorization/client';
import type {
	RoomSettingsEnum,
	RoomMemberActions,
	UiTextContext,
	IRoomTypeClientDirectives,
	RoomIdentification,
	IRoomTypeRouteConfig,
	IRoomTypeClientConfig,
} from '../../../definition/IRoomTypeConfig';
import { RoomCoordinator } from '../../../lib/rooms/coordinator';
import { router } from '../../providers/RouterProvider';
import { Subscriptions } from '../../stores';
import RoomRoute from '../../views/room/RoomRoute';
import MainLayout from '../../views/root/MainLayout';
import { absoluteUrl } from '../absoluteUrl';
import { appLayout } from '../appLayout';

class RoomCoordinatorClient extends RoomCoordinator {
	public add(roomConfig: IRoomTypeClientConfig, directives: Partial<IRoomTypeClientDirectives>): void {
        /* Implementation Hidden */
    }

	public getRoomDirectives(roomType: string): IRoomTypeClientDirectives {
        /* Implementation Hidden */
    }

	public openRouteLink(
		roomType: RoomType,
		subData: RoomIdentification,
		queryParams?: Record<string, string>,
		options: { replace?: boolean; routeParamsOverrides?: Record<string, string> } = {},
	): void {
        /* Implementation Hidden */
    }

	public isLivechatRoom(roomType: string): boolean {
        /* Implementation Hidden */
    }

	public getRoomName(roomType: string, roomData: AtLeast<IRoom, '_id' | 'name' | 'fname' | 'prid'>): string {
        /* Implementation Hidden */
    }

	readOnly(room?: IRoom, user?: AtLeast<IUser, 'username'> | null): boolean {
        /* Implementation Hidden */
    }

	private validateRoute<TRouteName extends RouteName>(route: IRoomTypeRouteConfig<TRouteName>): void {
        /* Implementation Hidden */
    }

	protected override validateRoomConfig(roomConfig: IRoomTypeClientConfig): void {
        /* Implementation Hidden */
    }

	protected override addRoomType(roomConfig: IRoomTypeClientConfig, directives: IRoomTypeClientDirectives): void {
        /* Implementation Hidden */
    }

	public getURL(roomType: string, subData: RoomIdentification): string | false {
        /* Implementation Hidden */
    }

	public isRouteNameKnown(routeName: string): boolean {
        /* Implementation Hidden */
    }

	public getRouteNameIdentifier(routeName: string): string | undefined {
        /* Implementation Hidden */
    }
}

export const roomCoordinator = new RoomCoordinatorClient();

```