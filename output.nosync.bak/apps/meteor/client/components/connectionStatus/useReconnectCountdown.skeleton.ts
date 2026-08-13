## File: apps/meteor/client/components/connectionStatus/useReconnectCountdown.ts

```typescript
import { useEffect, useRef, useState } from 'react';

const getReconnectCountdown = (retryTime: number): number => {
    /* Implementation Hidden */
};

export const useReconnectCountdown = (
	retryTime: number | undefined,
	status: 'connected' | 'connecting' | 'failed' | 'waiting' | 'offline',
): number => {
    /* Implementation Hidden */
};

```