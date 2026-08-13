## File: apps/meteor/packages/rocketchat-version/plugin/compile-version.js

```typescript
import { exec } from 'child_process';
import os from 'os';
import util from 'util';
import path from 'path';
import fs from 'fs';
import https from 'https';

const execAsync = util.promisify(exec);

class VersionCompiler {
	async processFilesForTarget(files) {
        /* Implementation Hidden */
    }
}

Plugin.registerCompiler(
	{
		extensions: ['info'],
	},
	function () {
		return new VersionCompiler();
	},
);

```