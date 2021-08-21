import React from 'react'
import {
    FunctionComponent,
    useRef,
    useState,
    FormEvent,
    Children,
    MouseEvent,
    ChangeEvent,
    HTMLProps,
    KeyboardEvent,
} from 'react';
import styled from 'styled-components'

import { useOnEscape, useOutsideClick, useCombinedRefs } from '@biotic-ui/std'

export type Props = {
    label?: string;
    onAdd?: (chips: Array<string>) => void;
    error?: boolean;
    onDelete?: () => void;
    onCancelDelete?: () => void;
    separator?: string;
    onChange?: (inputValue: string) => void;
}

export let ChipsInput: FunctionComponent<Props & HTMLProps<HTMLDivElement>> = ({
    label,
    onAdd,
    error,
    children,
    onDelete,
    onCancelDelete = () => {},
    separator = ',',
    onChange,
    ...props
}) => {
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

    return (
        <StyledChipsInput
            {...props}
            ref={ref}
            onClick={handleClick}
            focus={focus}
            error={error ?? false}
        >
            {label && (
                <Label className={isNotched ? 'notched' : ''} focus={focus}>
                    {label}
                </Label>
            )}

            {children}

            <Input
                ref={input}
                type="text"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onClick={() => onCancelDelete()}
            />
        </StyledChipsInput>
    );
};

let Label = styled.span<{ focus: boolean }>`
    position: absolute;
    top: 15px;
    left: 10px;
    color: ${(p) => (p.focus ? 'var(--color-copy)' : 'rgba(0, 0, 0, 0.6)')};
    transform: translateY(0) translateX(0) scale(1);
    transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;

    &.notched {
        transform: translateY(-24px) translateX(-8px) scale(0.75);
        background: #fff;
        padding: 0 8px;
    }
`

// can't get the object spread to properly type check
// thus I am declaring this as any for now....
// todo: figure out proper typing for object spread
let StyledChipsInput: any = styled.div<{ focus: boolean; error: boolean }>`
    display: flex;
    flex-wrap: wrap;
    column-gap: 8px;
    row-gap: 8px;
    padding: 16px;
    position: relative;
    background: #fff;
    cursor: text;
    border-radius: 4px;
    border-width: ${(p) => (p.focus ? 'var(--chip-input-border-width--focus, 1px)' : '1px')};
    border-color: ${p => p.error ? 'var(--chip-input-border-color--error, red)' : 'var(--chip-input-border-color, #000)'};
    border-style: solid;

    :hover {
        border-color: #000;
    }
`

let Input = styled.input`
    border: none;
    background: none;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    padding: 0;
    flex-grow: 1;

    &:focus {
        outline: none;
    }
`
