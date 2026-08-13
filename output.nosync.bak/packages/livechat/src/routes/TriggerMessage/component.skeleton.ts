## File: packages/livechat/src/routes/TriggerMessage/component.tsx

```typescript
import type { TFunction } from 'i18next';
import type { RefObject } from 'preact';
import { Component, createRef } from 'preact';
import { withTranslation } from 'react-i18next';

import styles from './styles.scss';
import { Screen, ScreenContent } from '../../components/Screen';
import type { ScreenContextValue } from '../../components/Screen/ScreenProvider';
import { createClassName } from '../../helpers/createClassName';
import { parentCall } from '../../lib/parentCall';
import type { StoreState } from '../../store';

type TriggerMessageProps = {
	title: string;
	messages: StoreState['messages'];
	onStartChat: () => void;
	t: TFunction;
	theme: ScreenContextValue['theme'];
};

class TriggerMessage extends Component<TriggerMessageProps> {
	override state = {};

	ref: RefObject<any>;

	constructor(props: TriggerMessageProps) {
        /* Implementation Hidden */
    }

	override componentDidUpdate() {
        /* Implementation Hidden */
    }

	render = ({ title, messages, onStartChat = () => undefined, t }: TriggerMessageProps) => {
		const defaultTitle = t('messages');
		const { theme: { color } = {} } = this.props;

		return (
			<Screen title={title || defaultTitle} triggered ref={this.ref}>
				<ScreenContent triggered={true}>
					{messages?.map(
						(message, i) =>
							message.msg && (
								<p key={i} className={createClassName(styles, 'trigger-message__message')}>
									{message.msg}
								</p>
							),
					)}
				</ScreenContent>
				<footer className={createClassName(styles, 'trigger-message__footer')}>
					<hr className={createClassName(styles, 'trigger-message__separator')} />
					<button style={color && { color }} onClick={onStartChat} className={createClassName(styles, 'trigger-message__link-reply')}>
						{t('start_chat')}
					</button>
				</footer>
			</Screen>
		);
	};
}

export default withTranslation()(TriggerMessage);

```