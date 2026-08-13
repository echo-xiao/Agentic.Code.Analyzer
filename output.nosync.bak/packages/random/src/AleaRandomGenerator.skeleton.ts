## File: packages/random/src/AleaRandomGenerator.ts

```typescript
import { RandomGenerator } from './RandomGenerator';

// Alea PRNG, which is not cryptographically strong
// see http://baagoe.org/en/wiki/Better_random_numbers_for_javascript
// for a full discussion and Alea implementation.
function createAlea(seeds: readonly unknown[]) {
    /* Implementation Hidden */
}

// options:
// - seeds: an array
//   whose items will be `toString`ed and used as the seed to the Alea
//   algorithm
export class AleaRandomGenerator extends RandomGenerator {
	private readonly alea: () => number;

	constructor({ seeds = [] }: { seeds?: readonly unknown[] } = {}) {
        /* Implementation Hidden */
    }

	/**
	 * @name Random.fraction
	 * @summary Return a number between 0 and 1, like `Math.random`.
	 * @locus Anywhere
	 */
	fraction() {
        /* Implementation Hidden */
    }

	protected safelyCreateWithSeeds(...seeds: readonly unknown[]): RandomGenerator {
        /* Implementation Hidden */
    }

	insecure: RandomGenerator = this;
}

```