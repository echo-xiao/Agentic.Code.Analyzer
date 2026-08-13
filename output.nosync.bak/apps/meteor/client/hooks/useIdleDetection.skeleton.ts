## File: apps/meteor/client/hooks/useIdleDetection.ts

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useEffect, useRef } from 'react';

const events = ['mousemove', 'mousedown', 'touchend', 'touchstart', 'keypress'];

export type UseIdleDetectionOptions = {
	id?: string;
	time?: number;
	awayOnWindowBlur?: boolean;
};

export const DEFAULT_IDLE_DETECTION_OPTIONS = Object.freeze({
	id: 'useIdleDetection',
	time: 600_000, // 10 minutes
	awayOnWindowBlur: false,
});

/**
 * A hook that detects when the user is idle.
 *
 * This hook listens for mousemove, mousedown, touchend, touchstart, and keypress events.
 * When any of these events are triggered, the user is considered active.
 * If no events are triggered for a specified period of time, the user is considered idle.
 *
 * @param options - An object with the following properties:
 * @param options.id - A unique identifier for the idle detection mechanism. Defaults to 'useIdleDetection'.
 * @param options.time - The time in milliseconds to consider the user idle. Defaults to 600000 ms (10 minutes).
 * @param options.awayOnWindowBlur - A boolean flag to trigger the idle state when the window loses focus. Defaults to false.
 */
export const useIdleDetection = ({
	id = DEFAULT_IDLE_DETECTION_OPTIONS.id,
	time = DEFAULT_IDLE_DETECTION_OPTIONS.time,
	awayOnWindowBlur = DEFAULT_IDLE_DETECTION_OPTIONS.awayOnWindowBlur,
}: UseIdleDetectionOptions = {}) => {
    /* Implementation Hidden */
};

```