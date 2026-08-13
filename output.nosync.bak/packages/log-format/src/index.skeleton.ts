## File: packages/log-format/src/index.ts

```typescript
// Copied from meteor/logging package
import chalk from 'chalk';
import { stringify } from 'ejson';

type Color = typeof chalk.Color;
type NonGrayColors = Exclude<Color, 'gray' | 'grey'>;

type Colors = Exclude<`${Color}Bright` | Color, 'grayBright' | 'greyBright'>;

type LogMessage = {
	time?: Date;
	timeInexact?: boolean;
	level?: 'debug' | 'info' | 'warn' | 'error';
	file?: string;
	line?: number;
	app?: string;
	originApp?: string;
	message?: string;
	program?: string;
	satellite?: string;
	stderr?: string;
	color?: Colors;
};

type Options = {
	color?: boolean;
	metaColor?: NonGrayColors;
};

const RESTRICTED_KEYS = ['time', 'timeInexact', 'level', 'file', 'line', 'program', 'originApp', 'satellite', 'stderr'];

const FORMATTED_KEYS = [...RESTRICTED_KEYS, 'app', 'message'];

const LEVEL_COLORS: Record<string, NonGrayColors> = {
	debug: 'green',
	// leave info as the default color
	warn: 'magenta',
	error: 'red',
	info: 'blue',
};

const META_COLOR = 'blue';

chalk.level = 2;

// Default colors cause readability problems on Windows Powershell,
// switch to bright variants. While still capable of millions of
// operations per second, the benchmark showed a 25%+ increase in
// ops per second (on Node 8) by caching "process.platform".
const isWin32 = typeof process === 'object' && process.platform === 'win32';
const platformColor = (color: NonGrayColors): `${NonGrayColors}Bright` | NonGrayColors => {
    /* Implementation Hidden */
};

const prettify = function (line = '', color?: Colors) {
    /* Implementation Hidden */
};

export const format = (obj: LogMessage, options: Options = {}) => {
    /* Implementation Hidden */
};

```