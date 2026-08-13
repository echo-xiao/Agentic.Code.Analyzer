## File: packages/random/src/RandomGenerator.ts

```typescript
// We use cryptographically strong PRNGs (crypto.getRandomBytes() on the server,
// window.crypto.getRandomValues() in the browser) when available. If these
// PRNGs fail, we fall back to the Alea PRNG, which is not cryptographically
// strong, and we seed it with various sources such as the date, Math.random,
// and window size on the client.  When using crypto.getRandomValues(), our
// primitive is hexString(), from which we construct fraction(). When using
// window.crypto.getRandomValues() or alea, the primitive is fraction and we use
// that to construct hex string.

const UNMISTAKABLE_CHARS = '23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz';
const BASE64_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';

// `type` is one of `RandomGenerator.Type` as defined below.
//
// options:
// - seeds: (required, only for RandomGenerator.Type.ALEA) an array
//   whose items will be `toString`ed and used as the seed to the Alea
//   algorithm
export abstract class RandomGenerator {
	/**
	 * @name Random.fraction
	 * @summary Return a number between 0 and 1, like `Math.random`.
	 * @locus Anywhere
	 */
	abstract fraction(): number;

	/**
	 * Create a non-cryptographically secure PRNG with a given seed (using
	 * the Alea algorithm)
	 */
	createWithSeeds(...seeds: readonly unknown[]): RandomGenerator {
        /* Implementation Hidden */
    }

	protected abstract safelyCreateWithSeeds(...seeds: readonly unknown[]): RandomGenerator;

	/**
	 * Used like `Random`, but much faster and not cryptographically secure
	 */
	abstract insecure: RandomGenerator;

	/**
	 * @name Random.hexString
	 * @summary Return a random string of `n` hexadecimal digits.
	 * @locus Anywhere
	 * @param digits Length of the string
	 */
	hexString(digits: number) {
        /* Implementation Hidden */
    }

	_randomString(charsCount: number, alphabet: string) {
        /* Implementation Hidden */
    }

	/**
	 * @name Random.id
	 * @summary Return a unique identifier, such as `"Jjwjg6gouWLXhMGKW"`, that is
	 * likely to be unique in the whole world.
	 * @locus Anywhere
	 * @param charsCount Optional length of the identifier in characters
	 *   (defaults to 17)
	 */
	id(charsCount = 17) {
        /* Implementation Hidden */
    }

	/**
	 * @name Random.secret
	 * @summary Return a random string of printable characters with 6 bits of
	 * entropy per character. Use `Random.secret` for security-critical secrets
	 * that are intended for machine, rather than human, consumption.
	 * @locus Anywhere
	 * @param charsCount Optional length of the secret string (defaults to 43
	 *   characters, or 256 bits of entropy)
	 */
	secret(charsCount = 43) {
        /* Implementation Hidden */
    }

	/**
	 * @name Random.choice
	 * @summary Return a random element of the given array or string.
	 * @locus Anywhere
	 * @param {Array|String} arrayOrString Array or string to choose from
	 */
	choice<TArrayLike extends unknown[] | string>(arrayOrString: TArrayLike) {
        /* Implementation Hidden */
    }
}

```