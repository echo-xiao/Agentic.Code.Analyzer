## File: packages/livechat/src/components/App/App.tsx

```typescript
import type { ILivechatTrigger } from '@rocket.chat/core-typings';
import i18next from 'i18next';
import { Component } from 'preact';
import Router, { route } from 'preact-router';
import { withTranslation } from 'react-i18next';

import type { Department } from '../../definitions/departments';
import { setInitCookies } from '../../helpers/cookies';
import { isRTL } from '../../helpers/isRTL';
import { visibility } from '../../helpers/visibility';
import history from '../../history';
import Connection from '../../lib/connection';
import CustomFields from '../../lib/customFields';
import Hooks from '../../lib/hooks';
import { parentCall } from '../../lib/parentCall';
import Triggers from '../../lib/triggers';
import userPresence from '../../lib/userPresence';
import { ChatConnector } from '../../routes/Chat';
import ChatFinished from '../../routes/ChatFinished';
import GDPRAgreement from '../../routes/GDPRAgreement';
import LeaveMessage from '../../routes/LeaveMessage';
import Register from '../../routes/Register';
import SwitchDepartment from '../../routes/SwitchDepartment';
import TriggerMessage from '../../routes/TriggerMessage';
import type { Dispatch, StoreState } from '../../store';
import { ScreenProvider } from '../Screen/ScreenProvider';

type AppProps = {
	config: {
		settings: StoreState['config']['settings'];
		theme: StoreState['config']['theme'];
		online?: boolean;
		departments: Department[];
		enabled?: boolean;
		triggers: ILivechatTrigger[];
	};
	gdpr: {
		accepted: boolean;
	};
	triggered?: boolean;
	user: {
		token: string;
	};
	dispatch: Dispatch;
	sound: {
		enabled: boolean;
	};
	minimized: boolean;
	undocked?: boolean;
	expanded: boolean;
	modal: boolean;
	alerts: {
		id: string;
	}[];
	iframe: {
		visible: boolean;
		guest?: {
			token: string;
			department: string;
			name: string;
			email: string;
		};
		theme: StoreState['iframe']['theme'];
	};
	i18n: typeof i18next;
};

type AppState = {
	initialized: boolean;
	poppedOut: boolean;
};

export class App extends Component<AppProps, AppState> {
	override state = {
		initialized: false,
		poppedOut: false,
	};

	protected handleRoute = async ({ url }: { url: string }) => {
		setTimeout(() => {
			const {
				config: {
					settings: {
						registrationForm,
						nameFieldRegistrationForm,
						emailFieldRegistrationForm,
						forceAcceptDataProcessingConsent: gdprRequired,
					},
					online,
					departments,
				},
				gdpr: { accepted: gdprAccepted },
				user,
			} = this.props;

			setInitCookies();

			if (gdprRequired && !gdprAccepted) {
				route('/gdpr');
				return;
			}

			if (!online) {
				parentCall('callback', 'no-agent-online');
				route('/leave-message');
				return;
			}

			const showDepartment = departments.some((dept) => dept.showOnRegistration);
			const isAnyFieldVisible = nameFieldRegistrationForm || emailFieldRegistrationForm || showDepartment;
			const showRegistrationForm = !user?.token && registrationForm && isAnyFieldVisible && !Triggers.hasTriggersBeforeRegistration();

			if (url === '/' && showRegistrationForm) {
				route('/register');
			}
		}, 100);
	};

	protected handleTriggers() {
        /* Implementation Hidden */
    }

	protected handleVisibilityChange = async () => {
		const { dispatch } = this.props;
		dispatch({ visible: !visibility.hidden });
	};

	protected handleLanguageChange = () => {
		this.forceUpdate();
	};

	protected initWidget() {
        /* Implementation Hidden */
    }

	protected async initialize() {
        /* Implementation Hidden */
    }

	protected async finalize() {
        /* Implementation Hidden */
    }

	override componentDidMount() {
        /* Implementation Hidden */
    }

	override componentWillUnmount() {
        /* Implementation Hidden */
    }

	override componentDidUpdate() {
        /* Implementation Hidden */
    }

	render = (_: AppProps, { initialized }: AppState) => {
		if (!initialized) {
			return null;
		}

		return (
			<ScreenProvider>
				<Router history={history} onChange={this.handleRoute}>
					<ChatConnector path='/' default />
					<ChatFinished path='/chat-finished' />
					<GDPRAgreement path='/gdpr' />
					<LeaveMessage path='/leave-message' />
					<Register path='/register' />
					<SwitchDepartment path='/switch-department' />
					<TriggerMessage path='/trigger-messages' />
				</Router>
			</ScreenProvider>
		);
	};
}

export default withTranslation()(App);

```