## File: apps/meteor/client/components/TwoFactorModal/TwoFactorModal.tsx

```typescript
import TwoFactorEmail from './TwoFactorEmailModal';
import TwoFactorPassword from './TwoFactorPasswordModal';
import TwoFactorTotp from './TwoFactorTotpModal';

export enum Method {
	TOTP = 'totp',
	EMAIL = 'email',
	PASSWORD = 'password',
}

export type OnConfirm = (code: string, method: Method) => void | Promise<void>;

export type TwoFactorModalProps = {
	onConfirm: OnConfirm;
	onClose: () => void;
	invalidAttempt?: boolean;
} & (
	| {
			method: 'totp' | 'password';
	  }
	| {
			method: 'email';
			emailOrUsername: string;
	  }
);

const TwoFactorModal = ({ onConfirm, onClose, invalidAttempt, ...props }: TwoFactorModalProps) => {
    /* Implementation Hidden */
};

export default TwoFactorModal;

```