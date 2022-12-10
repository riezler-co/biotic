import {
    useRef,
    useState,
    Children,
    MouseEvent,
    ChangeEvent,
    KeyboardEvent,
    HTMLAttributes,
} from 'react';

import { useOnEscape, useOutsideClick, useCombinedRefs } from '@biotic-ui/std'

export type Props = HTMLAttributes<HTMLDivElement> & {
    label?: string;
    onAdd?: (chips: Array<string>) => void;
    error?: boolean;
    onDelete?: () => void;
    onCancelDelete?: () => void;
    separator?: string;
    onChange?: (inputValue: string) => void;
}

export let ChipsInput = ({
    label,
    onAdd,
    error,
    children,
    onDelete,
    onCancelDelete = () => {},
    separator = ',',
    onChange,
    style = {},
    className = '',
    ...props
}: Props) => {
    let [focus, setFocus] = useState(false);
    let input = useRef<HTMLInputElement | null>(null);
    let wrapper = useRef<HTMLDivElement | null>(null);

    function handleClick(e: MouseEvent) {
        if (!input.current) {
            return
        }

        let isTarget = e.target === wrapper.current

        if (isTarget) {
            input.current.focus()
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let { value } = e.target
        onChange && onChange(value)
        onCancelDelete()

        if (value.includes(separator) && onAdd) {
            let chips = value
                .split(separator)
                .map((str) => str.trim())
                .filter(Boolean)

            onAdd(chips)
            e.target.value = ''
        }
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.code === 'Backspace') {
            let target = e.target as HTMLInputElement
            let isEmpty = target.value === ''

            if (isEmpty && onDelete) {
                onDelete()
            }
        }

        if (e.code === 'Enter') {
            if (onAdd && input.current) {
                let currentValue = input.current.value
                let value = currentValue.trim()
                if (value === '') {
                    return
                }

                onAdd([value])
                input.current.value = ''
            }
        }
    }


    function handleCancel() {
        if (focus) {
            onCancelDelete()
        }   
    }

    useOnEscape(handleCancel)
    let outsideClick = useOutsideClick(handleCancel)

    let isEmpty = Children.count(children) === 0
    let isNotched = !isEmpty || focus || input.current?.value

    let ref = useCombinedRefs(wrapper, outsideClick)

    let containerStyles = {
        borderWidth: focus ? 'var(--chip-input-border-width--focus, 1px)' : '1px',
        borderColor: (error ?? false) ? 'var(--chip-input-border-color--error, red)' : 'var(--chip-input-border-color, rgba(34,36,38,.15))',
    }

    return (
        <div
            {...props}
            style={{ ...style, ...containerStyles }}
            className={['biotic-chips-wrapper', className].join(' ')}
            ref={ref}
            onClick={handleClick}
        >
            {label && (
                <span
                    style={{ color: focus ? 'var(--color-copy)' : 'rgba(0, 0, 0, 0.6)' }}
                    className={['biotic-chips-label', isNotched ? 'biotic-chips-label--notched' : ''].join(' ')}
                >
                    {label}
                </span>
            )}

            {children}

            <input
                className='biotic-chips-input'
                ref={input}
                type="text"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onClick={() => onCancelDelete()}
            />
        </div>
    );
};
