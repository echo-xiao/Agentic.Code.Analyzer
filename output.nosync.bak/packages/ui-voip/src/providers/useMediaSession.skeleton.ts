## File: packages/ui-voip/src/providers/useMediaSession.ts

```typescript
import type { UserStatus } from '@rocket.chat/core-typings';
import type { MediaSignalingSession, CallState, CallContact } from '@rocket.chat/media-signaling';
import { useUserAvatarPath, useUserPresence } from '@rocket.chat/ui-contexts';
import { useEffect, useReducer, useCallback } from 'react';

import type { ConnectionState, PeerInfo, SessionState } from '../context/definitions';
import { derivePeerInfoFromInstanceContact } from '../utils/derivePeerInfoFromInstanceContact';
import { deriveWidgetStateFromCallState } from '../utils/deriveWidgetStateFromCallState';

const defaultSessionInfo: SessionState = {
	state: 'closed' as const,
	callId: undefined,
	connectionState: 'CONNECTING' as const,
	peerInfo: undefined,
	transferredBy: undefined,
	muted: false,
	held: false,
	remoteMuted: false,
	remoteHeld: false,
	startedAt: undefined,
	hidden: false,
	supportedFeatures: ['audio', 'transfer', 'hold'],
};

export const getExtensionFromInstanceContact = (contact: CallContact): string | undefined => {
    /* Implementation Hidden */
};

const deriveConnectionStateFromCallState = (callState: CallState): ConnectionState => {
    /* Implementation Hidden */
};

const reducer = (
	reducerState: SessionState,
	action:
		| {
				type: 'reset';
		  }
		| {
				type: 'selectPeer';
				payload: { peerInfo?: PeerInfo };
		  }
		| {
				type: 'toggleWidget';
				payload: { peerInfo?: PeerInfo };
		  }
		| {
				type: 'instance_updated';
				payload: SessionState;
		  }
		| {
				type: 'status_updated';
				payload?: { status?: UserStatus };
		  },
): SessionState => {
    /* Implementation Hidden */
};

export type MediaSessionStateWithWidgetControls = {
	sessionState: SessionState;
	toggleWidget: (peerInfo?: PeerInfo) => void;
	selectPeer: (peerInfo: PeerInfo) => void;
};

export const useMediaSession = (instance?: MediaSignalingSession): MediaSessionStateWithWidgetControls => {
    /* Implementation Hidden */
};

```