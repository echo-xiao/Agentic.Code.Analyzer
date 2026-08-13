## File: packages/logger/src/index.ts

```typescript
import { getPino, type LoggerOptions, type MainLogger } from './getPino';
import type { LogLevelSetting } from './logLevel';
import { logLevel } from './logLevel';

export * from './getPino';
export * from './logLevel';

const getLevel = (level: LogLevelSetting): string => {
    /* Implementation Hidden */
};

let defaultLevel = 'warn';

logLevel.once('changed', (level: LogLevelSetting) => {
	defaultLevel = getLevel(level);
});

export class Logger {
	readonly logger: MainLogger;

	constructor(loggerLabel: string, options: LoggerOptions = {}) {
        /* Implementation Hidden */
    }

	section(name: string, options: LoggerOptions = {}): MainLogger {
        /* Implementation Hidden */
    }

	level(newLevel: string): void {
        /* Implementation Hidden */
    }

	log(msg: object | string): void {
        /* Implementation Hidden */
    }

	debug(msg: object | string): void {
        /* Implementation Hidden */
    }

	info(msg: object | string): void {
        /* Implementation Hidden */
    }

	startup(msg: object | string): void {
        /* Implementation Hidden */
    }

	success(msg: object | string): void {
        /* Implementation Hidden */
    }

	warn(msg: object | string): void {
        /* Implementation Hidden */
    }

	error(msg: object | string): void {
        /* Implementation Hidden */
    }

	method(msg: object | string): void {
        /* Implementation Hidden */
    }

	subscription(msg: object | string): void {
        /* Implementation Hidden */
    }

	fatal(err: unknown, ...args: any[]): void {
        /* Implementation Hidden */
    }
}

```