## File: apps/meteor/server/services/omnichannel-analytics/utils.ts

```typescript
import moment from 'moment-timezone';

const HOURS_IN_DAY = 24;

export async function* dayIterator(from: moment.Moment, to: moment.Moment): AsyncGenerator<moment.Moment> {
    /* Implementation Hidden */
}

export async function* weekIterator(from: moment.Moment, to: moment.Moment, timezone: string): AsyncGenerator<moment.Moment> {
    /* Implementation Hidden */
}

export async function* hourIterator(day: moment.Moment): AsyncGenerator<moment.Moment> {
    /* Implementation Hidden */
}

```