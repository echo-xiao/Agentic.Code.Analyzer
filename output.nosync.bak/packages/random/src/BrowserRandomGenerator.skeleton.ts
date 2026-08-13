## File: packages/random/src/BrowserRandomGenerator.ts

```typescript
import { AleaRandomGenerator } from './AleaRandomGenerator';
import { RandomGenerator } from './RandomGenerator';
import { createAleaGeneratorWithGeneratedSeed } from './createAleaGenerator';

// cryptographically strong PRNGs available in modern browsers
export class BrowserRandomGenerator extends RandomGenerator {
	/**
	 * @name Random.fraction
	 * @summary Return a number between 0 and 1, like `Math.random`.
	 * @locus Anywhere
	 */
	fraction() {
        /* Implementation Hidden */
    }

	protected safelyCreateWithSeeds(...seeds: readonly unknown[]) {
        /* Implementation Hidden */
    }

	insecure: RandomGenerator = createAleaGeneratorWithGeneratedSeed();
}

```