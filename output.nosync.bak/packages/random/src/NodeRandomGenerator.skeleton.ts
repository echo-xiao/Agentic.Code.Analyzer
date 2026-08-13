## File: packages/random/src/NodeRandomGenerator.ts

```typescript
import crypto from 'node:crypto';

import { AleaRandomGenerator } from './AleaRandomGenerator';
import { RandomGenerator } from './RandomGenerator';
import { createAleaGeneratorWithGeneratedSeed } from './createAleaGenerator';

export class NodeRandomGenerator extends RandomGenerator {
	/**
	 * @name Random.fraction
	 * @summary Return a number between 0 and 1, like `Math.random`.
	 * @locus Anywhere
	 */
	fraction() {
        /* Implementation Hidden */
    }

	/**
	 * @name Random.hexString
	 * @summary Return a random string of `n` hexadecimal digits.
	 * @locus Anywhere
	 * @param digits Length of the string
	 */
	override hexString(digits: number) {
        /* Implementation Hidden */
    }

	/**
	 * @name Random.between Returns a random integer between min and max, inclusive.
	 * @param min Minimum value (inclusive)
	 * @param max Maximum value (inclusive)
	 * @returns A random integer between min and max, inclusive.
	 */
	between(min: number, max: number) {
        /* Implementation Hidden */
    }

	protected safelyCreateWithSeeds(...seeds: readonly unknown[]) {
        /* Implementation Hidden */
    }

	insecure: RandomGenerator = createAleaGeneratorWithGeneratedSeed();
}

```