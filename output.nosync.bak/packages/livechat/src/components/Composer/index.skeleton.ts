## File: packages/livechat/src/components/Composer/index.tsx

```typescript
import DOMPurify from 'dompurify';
import type { ComponentChildren } from 'preact';
import { Component } from 'preact';
import type { CSSProperties } from 'preact/compat';

import styles from './styles.scss';
import { createClassName } from '../../helpers/createClassName';
import { parse } from '../../helpers/parse';

const findLastTextNode = (node: Node): Node | null => {
    /* Implementation Hidden */
};

const replaceCaret = (el: Element) => {
    /* Implementation Hidden */
};

type ComposerProps = {
	className?: string;
	style?: CSSProperties;
	value?: string;
	onChange?: (value: string) => void;
	onSubmit?: (value: string) => void;
	onUpload?: (files: (File | null)[]) => void;
	handleEmojiClick?: () => void;
	placeholder?: string;
	pre?: ComponentChildren;
	post?: ComponentChildren;
	notifyEmojiSelect?: (cb: (emoji: string) => void) => void;
	limitTextLength?: number;
};

type ComposerState = {
	inputLock: boolean;
};

export class Composer extends Component<ComposerProps, ComposerState> {
	private el: HTMLElement | null = null;

	handleRef = (el: HTMLDivElement | null) => {
		this.el = el;
	};

	handleInput = (onChange?: (value: string) => void) => () => {
		if (this.state.inputLock) {
			return;
		}
		onChange?.(this.el?.innerText ?? '');
	};

	handleKeypress = (onSubmit?: (value: string) => void) => (event: KeyboardEvent) => {
		if (event.which === 13 && !event.shiftKey) {
			event.preventDefault();
			if (this.el) {
				onSubmit?.(this.el.innerText);
				this.el.innerText = '';
			}
		}
	};

	handlePaste = (onUpload?: (files: (File | null)[]) => void) => async (event: ClipboardEvent) => {
		if (!event.clipboardData?.items) {
			return;
		}

		event.preventDefault();

		const items = Array.from(event.clipboardData.items);

		const files = items.filter((item) => item.kind === 'file' && /^image\//.test(item.type)).map((item) => item.getAsFile());
		if (files.length) {
			onUpload?.(files);
			return;
		}

		const texts = await Promise.all(
			items
				.filter((item) => item.kind === 'string' && /^text\/plain/.test(item.type))
				.map((item) => new Promise<string>((resolve) => item.getAsString(resolve))),
		);

		texts.forEach((text) => this.pasteText(parse(text)));
	};

	handleDrop = (onUpload?: (files: (File | null)[]) => void) => async (event: DragEvent) => {
		if (!event.dataTransfer?.items) {
			return;
		}

		event.preventDefault();

		const items = Array.from(event.dataTransfer.items);

		const files = items.filter((item) => item.kind === 'file' && /^image\//.test(item.type)).map((item) => item.getAsFile());
		if (files.length) {
			onUpload?.(files);
			return;
		}

		const texts = await Promise.all(
			items
				.filter((item) => item.kind === 'string' && /^text\/plain/.test(item.type))
				.map((item) => new Promise<string>((resolve) => item.getAsString(resolve))),
		);
		texts.forEach((text) => this.pasteText(parse(text)));
	};

	handleClick = () => {
		const { handleEmojiClick } = this.props;
		handleEmojiClick?.();
	};

	pasteText = (plainText: string) => {
		this.el?.focus();

		if (document.queryCommandSupported('insertText')) {
			document.execCommand('insertText', false, plainText);
			return;
		}

		const range = document.getSelection()?.getRangeAt(0);
		if (!range) {
			return;
		}

		range.deleteContents();
		const textNode = document.createTextNode(plainText);
		range.insertNode(textNode);
		range.selectNodeContents(textNode);
		range.collapse(false);

		const selection = window.getSelection();
		selection?.removeAllRanges();
		selection?.addRange(range);
	};

	private value: string | undefined;

	constructor(props: ComposerProps) {
        /* Implementation Hidden */
    }

	// we only update composer if value length changed from 0 to 1 or 1 to 0
	// everything else is managed by this.el
	override shouldComponentUpdate({ value: nextValue = '' }: ComposerProps) {
        /* Implementation Hidden */
    }

	override componentDidUpdate() {
        /* Implementation Hidden */
    }

	handleNotifyEmojiSelect(emoji: string) {
        /* Implementation Hidden */
    }

	moveCursorToEndAndFocus(endIndex: number) {
        /* Implementation Hidden */
    }

	getCaretPosition(element: HTMLElement) {
        /* Implementation Hidden */
    }

	handleInputLock(locked: boolean) {
        /* Implementation Hidden */
    }

	render = ({ pre, post, value, placeholder, onChange, onSubmit, onUpload, className, style }: ComposerProps) => (
		<div className={createClassName(styles, 'composer', {}, [className])} style={style}>
			{pre}
			<div
				ref={this.handleRef}
				role='textbox'
				contentEditable
				tabIndex={0}
				data-placeholder={placeholder}
				data-qa='livechat-composer'
				onInput={this.handleInput(onChange)}
				onKeyPress={this.handleKeypress(onSubmit)}
				onPaste={this.handlePaste(onUpload)}
				onDrop={this.handleDrop(onUpload)}
				onClick={this.handleClick}
				onCompositionStart={() => {
					this.handleInputLock(true);
				}}
				onCompositionEnd={() => {
					this.handleInputLock(false);
					onChange?.(this.el?.innerText ?? '');
				}}
				className={createClassName(styles, 'composer__input')}
			>
				{value}
			</div>
			{post}
		</div>
	);
}

export { ComposerAction } from './ComposerAction';
export { ComposerActions } from './ComposerActions';

```