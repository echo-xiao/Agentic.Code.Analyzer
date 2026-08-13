## File: packages/ui-client/src/helpers/imperativeModal.tsx

```typescript
import { Emitter } from '@rocket.chat/emitter';
import { createElement } from 'react';
import type { ComponentPropsWithoutRef, ComponentType, ReactNode } from 'react';

import { modalStore } from '../providers/ModalProvider/ModalStore';

type ReactModalDescriptor<TComponent extends ComponentType<any> = ComponentType<any>> = {
	component: TComponent;
	props?: ComponentPropsWithoutRef<TComponent>;
};

type ModalDescriptor = ReactModalDescriptor | null;

type ModalInstance = {
	close: () => void;
	cancel: () => void;
};

const mapCurrentModal = (descriptor: ModalDescriptor): ReactNode => {
    /* Implementation Hidden */
};

class ImperativeModalEmmiter extends Emitter<{ update: ModalDescriptor }> {
	private store: typeof modalStore;

	constructor(store: typeof modalStore) {
        /* Implementation Hidden */
    }

	open = <TComponent extends ComponentType<any>>(descriptor: ReactModalDescriptor<TComponent>): ModalInstance =>
		this.store.open(mapCurrentModal(descriptor as ModalDescriptor));

	push = <TComponent extends ComponentType<any>>(descriptor: ReactModalDescriptor<TComponent>): ModalInstance =>
		this.store.push(mapCurrentModal(descriptor as ModalDescriptor));

	close = () => {
		this.store.close();
	};
}

export const imperativeModal = new ImperativeModalEmmiter(modalStore);

```