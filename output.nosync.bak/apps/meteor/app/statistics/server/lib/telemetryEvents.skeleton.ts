## File: apps/meteor/app/statistics/server/lib/telemetryEvents.ts

```typescript
import type { TelemetryMap, ITelemetryEvent, TelemetryEvents } from '@rocket.chat/core-services';

type TelemetryEventResponse = Promise<any> | void;
type TelemetryEventFunction<T extends TelemetryEvents> = (data: TelemetryMap[T]) => TelemetryEventResponse;

class TelemetryEvent implements ITelemetryEvent {
	private events = new Map<string, (...args: any[]) => any>();

	register<T extends TelemetryEvents>(name: T, fn: TelemetryEventFunction<T>): void {
        /* Implementation Hidden */
    }

	call<T extends TelemetryEvents>(eventName: T, data: TelemetryMap[T]): TelemetryEventResponse {
        /* Implementation Hidden */
    }
}

const telemetryEvent = new TelemetryEvent();
export default telemetryEvent;

```