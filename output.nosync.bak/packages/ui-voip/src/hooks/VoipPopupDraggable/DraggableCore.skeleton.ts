## File: packages/ui-voip/src/hooks/VoipPopupDraggable/DraggableCore.ts

```typescript
import { Emitter } from '@rocket.chat/emitter';
import type { OffCallbackHandler } from '@rocket.chat/emitter';
import { useSafeRefCallback } from '@rocket.chat/fuselage-hooks';
import { useCallback, useRef, useState } from 'react';

const GRAB_DOM_EVENTS = ['pointerdown'] as const;
const RELEASE_DOM_EVENTS = ['pointerup', 'pointercancel', 'lostpointercapture'] as const;
const MOVE_DOM_EVENTS = ['pointermove'] as const;

interface IPointCoordinates {
	x: number;
	y: number;
}

interface IGenericRect extends IPointCoordinates {
	width: number;
	height: number;
}

class GenericRect {
	private rect: IGenericRect;

	constructor(rect: IGenericRect) {
        /* Implementation Hidden */
    }

	get x(): number {
		return this.rect.x;
	}

	get y(): number {
		return this.rect.y;
	}

	get width(): number {
		return this.rect.width;
	}

	get height(): number {
		return this.rect.height;
	}

	get top(): number {
		return this.rect.y;
	}

	get left(): number {
		return this.rect.x;
	}

	get right(): number {
		return this.rect.x + this.rect.width;
	}

	get bottom(): number {
		return this.rect.y + this.rect.height;
	}
}

type DraggableElementEvents = {
	grab: IGenericRect;
	move: IPointCoordinates;
	release: IGenericRect;
	changeView: IDraggableElement;
	resize: IGenericRect;
};

class Draggable extends Emitter<DraggableElementEvents> {
	private _element: IDraggableElement;

	private isDragging = false;

	private pointerCoordinates: IPointCoordinates = { x: 0, y: 0 };

	private storedPositionOffset: IPointCoordinates = { x: 0, y: 0 };

	constructor(element: IDraggableElement) {
        /* Implementation Hidden */
    }

	get element(): IDraggableElement {
		return this._element;
	}

	public onRelease(cb: (rect: IGenericRect) => void): OffCallbackHandler {
        /* Implementation Hidden */
    }

	public onMove(cb: (pointerPosition: IPointCoordinates) => void): OffCallbackHandler {
        /* Implementation Hidden */
    }

	public onResize(cb: (rect: IGenericRect) => void): OffCallbackHandler {
        /* Implementation Hidden */
    }

	public onChangeView(cb: (element: IDraggableElement) => void): OffCallbackHandler {
        /* Implementation Hidden */
    }

	private setPointerCoordinates(pointerCoordinates: IPointCoordinates): void {
        /* Implementation Hidden */
    }

	private addElementPositionOffset(x: number, y: number): void {
        /* Implementation Hidden */
    }

	private setStoredPositionOffset(x: number, y: number): void {
        /* Implementation Hidden */
    }

	public moveToCoordinates(targetElementCoordinates: IPointCoordinates, initialPosition: IGenericRect): void {
        /* Implementation Hidden */
    }

	public handleGrab(startingPointerCoordinates: IPointCoordinates, elementRect: IGenericRect): void {
        /* Implementation Hidden */
    }

	public handleMove(currentPointerCoordinates: IPointCoordinates): void {
        /* Implementation Hidden */
    }

	public handleRelease(finalElementPosition: IGenericRect): void {
        /* Implementation Hidden */
    }

	public moveByOffset(offset: IPointCoordinates): void {
        /* Implementation Hidden */
    }

	public getStoredOffset(): IPointCoordinates {
        /* Implementation Hidden */
    }
}

type BoundingElementOptions = {
	resizeDebounce: number; // debounce time in ms
};

export const DEFAULT_BOUNDING_ELEMENT_OPTIONS: BoundingElementOptions = {
	resizeDebounce: 150,
};

class BoundingElement extends Emitter<{
	resize: IGenericRect;
}> {
	private _element: IBoundingElement;

	private draggableInstance: Draggable;

	private resizeDebounce: number;

	private timeout: NodeJS.Timeout | null = null;

	constructor(element: IBoundingElement, draggableInstance: Draggable, options = DEFAULT_BOUNDING_ELEMENT_OPTIONS) {
        /* Implementation Hidden */
    }

	get element(): IBoundingElement {
		return this._element;
	}

	private _tryMoveToBounds(): void {
        /* Implementation Hidden */
    }

	private tryMoveToBounds(): void {
        /* Implementation Hidden */
    }

	private calculateBoundsOffset(_draggableRect: IGenericRect, _boundsRect: IGenericRect): IPointCoordinates {
        /* Implementation Hidden */
    }
}

class HandleElement extends Emitter<{
	grab: IPointCoordinates;
}> {
	private draggableInstance: Draggable;

	private _element: IHandleElement;

	constructor(element: IHandleElement, draggableInstance: Draggable) {
        /* Implementation Hidden */
    }

	get element(): IHandleElement {
		return this._element;
	}
}

const getPointerEventCoordinates = (e: PointerEvent): IPointCoordinates => ({
	x: e.clientX,
	y: e.clientY,
});

type GetElementRect = () => IGenericRect | null;
type OnChangeView<TElement> = (cb: (element: TElement) => void) => OffCallbackHandler;

interface IDraggableElement {
	setElement(element: unknown): OffCallbackHandler;
	setElementPositionOffset(offset: IPointCoordinates): void;
	getElementRect: GetElementRect;
	// events
	onMove(cb: (pointerPosition: IPointCoordinates) => void): OffCallbackHandler;
	onChangeView: OnChangeView<IDraggableElement>;
	onRelease(cb: (rect: IGenericRect) => void): OffCallbackHandler;
	onResize(cb: (rect: IGenericRect) => void): OffCallbackHandler;
}

interface IBoundingElement {
	setElement(element: unknown): OffCallbackHandler;
	getElementRect: GetElementRect;
	// events
	onResize(cb: (rect: IGenericRect) => void): OffCallbackHandler;
	onChangeView: OnChangeView<IBoundingElement>;
}

interface IHandleElement {
	setElement(element: unknown): OffCallbackHandler;
	// events
	onGrab(cb: (event: [mousePosition: IPointCoordinates, elementRect: IGenericRect]) => void): OffCallbackHandler;
}

const isLeftClick = (event: PointerEvent) => event.button === 0;
const isMousePointer = (event: PointerEvent) => event.pointerType === 'mouse';

class HandleDomElement
	extends Emitter<{
		grab: [IPointCoordinates, IGenericRect];
	}>
	implements IHandleElement
{
	public setElement(element: HTMLElement) {
        /* Implementation Hidden */
    }

	public onGrab = (cb: (event: [mousePosition: IPointCoordinates, elementRect: IGenericRect]) => void): OffCallbackHandler => {
		return this.on('grab', cb);
	};
}

class BoundingDomElement
	extends Emitter<{
		resize: IGenericRect;
		changeView: IBoundingElement;
	}>
	implements IBoundingElement
{
	private _element: HTMLElement | null = null;

	public setElement(element: HTMLElement) {
        /* Implementation Hidden */
    }

	public onResize = (cb: (rect: IGenericRect) => void): OffCallbackHandler => {
		return this.on('resize', cb);
	};

	public onChangeView = (cb: (element: IBoundingElement) => void): OffCallbackHandler => {
		return this.on('changeView', cb);
	};

	public getElementRect(): DOMRect | null {
        /* Implementation Hidden */
    }
}

type DraggableDomElementEvents = {
	changeView: IDraggableElement;
} & Pick<DraggableElementEvents, 'move' | 'release' | 'resize'>;

class DraggableDomElement extends Emitter<DraggableDomElementEvents> implements IDraggableElement {
	private element: HTMLElement | null = null;

	public setElement(element: HTMLElement) {
        /* Implementation Hidden */
    }

	public onResize = (cb: (rect: IGenericRect) => void): OffCallbackHandler => {
		return this.on('resize', cb);
	};

	public onChangeView = (cb: (element: IDraggableElement) => void): OffCallbackHandler => {
		return this.on('changeView', cb);
	};

	public onMove = (cb: (pointerPosition: IPointCoordinates) => void): OffCallbackHandler => {
		return this.on('move', cb);
	};

	public onRelease = (cb: (rect: IGenericRect) => void): OffCallbackHandler => {
		return this.on('release', cb);
	};

	public getElementRect(): DOMRect | null {
        /* Implementation Hidden */
    }

	public setElementPositionOffset(offset: IPointCoordinates): void {
        /* Implementation Hidden */
    }
}

type useDraggableOptions = {
	restorePosition?: IGenericRect | null;
	onChangePosition?: (position: IGenericRect) => void;
};

export const useDraggable = (options?: useDraggableOptions) => {
    /* Implementation Hidden */
};

```