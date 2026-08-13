## File: packages/password-policies/src/PasswordPolicy.ts

```typescript
import { PasswordPolicyError } from './PasswordPolicyError';

type PasswordPolicyMap = {
	minLength: number;
	maxLength: number;
	forbidRepeatingCharacters: boolean;
	forbidRepeatingCharactersCount: number;
	mustContainAtLeastOneLowercase: boolean;
	mustContainAtLeastOneUppercase: boolean;
	mustContainAtLeastOneNumber: boolean;
	mustContainAtLeastOneSpecialCharacter: boolean;
};

type PasswordPolicyKey = keyof PasswordPolicyMap;
type PasswordPolicyName<K extends PasswordPolicyKey> = `get-password-policy-${K}`;

type PasswordPolicyParametersEntry = {
	[K in PasswordPolicyKey]: PasswordPolicyMap[K] extends number
		? [PasswordPolicyName<K>, Record<K, PasswordPolicyMap[K]>]
		: [PasswordPolicyName<K>];
}[PasswordPolicyKey];

type PasswordPolicyType<Entry = PasswordPolicyParametersEntry> = {
	enabled: boolean;
	policy: Entry[];
};

export type PasswordPolicyOptions = Partial<
	PasswordPolicyMap & {
		enabled: boolean;
		throwError: boolean;
	}
>;

export type PasswordPolicyValidation = {
	[K in PasswordPolicyKey]: PasswordPolicyMap[K] extends number
		? { name: PasswordPolicyName<K>; limit: number }
		: { name: PasswordPolicyName<K> };
}[PasswordPolicyKey] & { isValid: boolean };

export class PasswordPolicy {
	private regex: {
		forbiddingRepeatingCharacters: RegExp;
		mustContainAtLeastOneLowercase: RegExp;
		mustContainAtLeastOneUppercase: RegExp;
		mustContainAtLeastOneNumber: RegExp;
		mustContainAtLeastOneSpecialCharacter: RegExp;
	};

	private enabled: boolean;

	private minLength: number;

	private maxLength: number;

	private forbidRepeatingCharacters: boolean;

	private mustContainAtLeastOneLowercase: boolean;

	private mustContainAtLeastOneUppercase: boolean;

	private mustContainAtLeastOneNumber: boolean;

	private mustContainAtLeastOneSpecialCharacter: boolean;

	private throwError: boolean;

	private forbidRepeatingCharactersCount: number;

	constructor({
		enabled = false,
		minLength = -1,
		maxLength = -1,
		forbidRepeatingCharacters = false,
		forbidRepeatingCharactersCount = 3, // the regex is this number minus one
		mustContainAtLeastOneLowercase = false, // /[A-Z]{3,}/ could do this instead of at least one
		mustContainAtLeastOneUppercase = false,
		mustContainAtLeastOneNumber = false,
		mustContainAtLeastOneSpecialCharacter = false,
		throwError = true,
	}: PasswordPolicyOptions) {
        /* Implementation Hidden */
    }

	error(
		error: string,
		message: string,
		reasons?: {
			error: string;
			message: string;
		}[],
	) {
        /* Implementation Hidden */
    }

	sendValidationMessage(password: string): PasswordPolicyValidation[] {
        /* Implementation Hidden */
    }

	validate(password: string) {
        /* Implementation Hidden */
    }

	getPasswordPolicy(): PasswordPolicyType<[name: string, params?: Record<string, number | boolean>]> {
        /* Implementation Hidden */
    }
}

```