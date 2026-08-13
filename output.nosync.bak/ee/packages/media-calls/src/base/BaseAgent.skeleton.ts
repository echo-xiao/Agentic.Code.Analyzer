## File: ee/packages/media-calls/src/base/BaseAgent.ts

```typescript
import type {
	IMediaCall,
	IMediaCallChannel,
	MediaCallActor,
	MediaCallActorType,
	MediaCallContact,
	MediaCallSignedActor,
} from '@rocket.chat/core-typings';
import type { CallRole } from '@rocket.chat/media-signaling';
import type { InsertionModel } from '@rocket.chat/model-typings';
import { MediaCallChannels } from '@rocket.chat/models';

import type { IMediaCallAgent } from '../definition/IMediaCallAgent';

export abstract class BaseMediaCallAgent implements IMediaCallAgent {
	public readonly actorType: MediaCallActorType;

	public readonly actorId: string;

	public oppositeAgent: IMediaCallAgent | null;

	public get actor(): MediaCallActor {
		return {
			type: this.actorType,
			id: this.actorId,
		};
	}

	public get oppositeRole(): CallRole {
		return ({ callee: 'caller', caller: 'callee' } as const)[this.role];
	}

	protected localDescription: RTCSessionDescriptionInit | null;

	constructor(
		protected readonly contact: MediaCallContact,
		public readonly role: CallRole,
	) {
        /* Implementation Hidden */
    }

	public isRepresentingActor(actor: MediaCallActor): boolean {
        /* Implementation Hidden */
    }

	public getMyCallActor(call: IMediaCall): MediaCallContact {
        /* Implementation Hidden */
    }

	public getOtherCallActor(call: IMediaCall): MediaCallContact {
        /* Implementation Hidden */
    }

	public getSignedActor(contractId: string): MediaCallSignedActor {
        /* Implementation Hidden */
    }

	public abstract onCallAccepted(call: IMediaCall): Promise<void>;

	public abstract onCallActive(callId: string): Promise<void>;

	public abstract onCallEnded(callId: string): Promise<void>;

	public async getOrCreateChannel(call: IMediaCall, contractId: string): Promise<IMediaCallChannel> {
        /* Implementation Hidden */
    }

	public abstract onCallCreated(call: IMediaCall): Promise<void>;

	public abstract onRemoteDescriptionChanged(callId: string, negotiationId: string): Promise<void>;

	public abstract onCallTransferred(callId: string): Promise<void>;

	public abstract onDTMF(callId: string, dtmf: string, duration: number): Promise<void>;

	protected async createOrUpdateChannel(call: IMediaCall, contractId: string): Promise<IMediaCallChannel> {
        /* Implementation Hidden */
    }
}

```