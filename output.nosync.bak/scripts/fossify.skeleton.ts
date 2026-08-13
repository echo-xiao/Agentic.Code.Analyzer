## File: scripts/fossify.ts

```typescript
import readline from 'readline';
import fs from 'fs/promises';

const removeOptions = { maxRetries: 3, recursive: true };

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const fossify = async () => {
    /* Implementation Hidden */
};

rl.question('Running this script will permanently delete files from the local directory. Proceed? (n,y) ', (answer) => {
	rl.close();

	if (answer.toLowerCase() !== 'y') {
		return;
	}

	fossify().catch((e) => {
		if (!e) {
			console.error('Unknown error');
			return;
		}

		console.error(e);
	});
});

```