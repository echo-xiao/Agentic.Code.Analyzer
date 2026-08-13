## File: packages/ui-client/src/components/PasswordVerifier/PasswordVerifierItem.tsx

```typescript
import { Box, Icon, type IconProps } from '@rocket.chat/fuselage';
import type { PasswordPolicyValidation } from '@rocket.chat/ui-contexts';
import { useId } from 'react';
import { useTranslation, type UseTranslationResponse } from 'react-i18next';

type PasswordVerifierItemProps = PasswordPolicyValidation & {
	vertical: boolean;
};

const getIconProps = (
	isValid: boolean,
	t: UseTranslationResponse<'translation', undefined>['t'],
): Pick<Required<IconProps>, 'name' | 'aria-label' | 'color'> =>
	isValid
		? {
				'name': 'success-circle',
				'aria-label': t('Success'),
				'color': 'status-font-on-success',
			}
		: {
				'name': 'error-circle',
				'aria-label': t('Error'),
				'color': 'status-font-on-danger',
			};

export const PasswordVerifierItem = ({ isValid, ...props }: PasswordVerifierItemProps) => {
    /* Implementation Hidden */
};

```