## File: packages/ui-voip/src/views/usePopoutWindow.ts

```typescript
import { useThemeMode } from '@rocket.chat/ui-client';
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { TFunction } from 'i18next';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const createRootElement = (externalWindow: Window) => {
    /* Implementation Hidden */
};

const replaceWithTranslationString = (t: TFunction, externalDocument: Document) => {
    /* Implementation Hidden */
};

const changeTheme = (ownerDocument: Document, theme?: string) => {
    /* Implementation Hidden */
};

const openExternalWindow = async (callId: string, theme: string) => {
    /* Implementation Hidden */
};

export type PopoutContainer = { root: HTMLDivElement; ownerDocument: Document };
type PopoutRef = { root: HTMLDivElement; externalWindow: Window; closing: boolean };
type OpenPopoutWindow = (callId: string) => Promise<void>;
type ClosePopoutWindow = () => void;

type UsePopoutWindowReturn = {
	container: PopoutContainer | null;
	openPopoutWindow: OpenPopoutWindow;
	closePopoutWindow: ClosePopoutWindow;
};

export const usePopoutWindow = (onBeforeUnload: () => void): UsePopoutWindowReturn => {
    /* Implementation Hidden */
};

```