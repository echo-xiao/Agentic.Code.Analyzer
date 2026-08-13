## File: apps/meteor/lib/rooms/coordinator.ts

```typescript
import type { RoomType } from '@rocket.chat/core-typings';
import type { LocationPathname } from '@rocket.chat/ui-contexts';

import type {
	IRoomTypeConfig,
	IRoomTypeClientDirectives,
	IRoomTypeServerDirectives,
	RoomIdentification,
} from '../../definition/IRoomTypeConfig';

export abstract class RoomCoordinator {
	protected roomTypes: Record<string, { config: IRoomTypeConfig; directives: IRoomTypeClientDirectives | IRoomTypeServerDirectives }> = {};

	protected validateRoomConfig(roomConfig: IRoomTypeConfig): void {
        /* Implementation Hidden */
    }

	protected addRoomType(roomConfig: IRoomTypeConfig, directives: IRoomTypeClientDirectives | IRoomTypeServerDirectives): void {
        /* Implementation Hidden */
    }

	protected getRoomTypeConfig(identifier: RoomType): IRoomTypeConfig & Pick<Required<IRoomTypeConfig>, 'route'>;

	protected getRoomTypeConfig(identifier: string): IRoomTypeConfig | undefined;

	protected getRoomTypeConfig(identifier: string): IRoomTypeConfig | undefined {
        /* Implementation Hidden */
    }

	public getRouteLink(roomType: string, subData: RoomIdentification): LocationPathname | false {
        /* Implementation Hidden */
    }

	protected getRouteData(roomType: string, subData: RoomIdentification): Record<string, string> | false {
        /* Implementation Hidden */
    }
}

```