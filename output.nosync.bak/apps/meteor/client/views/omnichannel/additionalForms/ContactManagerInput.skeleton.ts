## File: apps/meteor/client/views/omnichannel/additionalForms/ContactManagerInput.tsx

```typescript
import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';
import AutoCompleteAgent from '../components/AutoCompleteAgent';

export type ContactManagerInputProps = {
	value: string;
	onChange: (currentValue: string) => void;
};

const ContactManagerInput = ({ value: userId, onChange }: ContactManagerInputProps) => {
    /* Implementation Hidden */
};

export default ContactManagerInput;

```