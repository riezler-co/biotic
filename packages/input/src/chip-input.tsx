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

export const ChipsInput: FunctionComponent<Props & HTMLProps<HTMLDivElement>> = ({
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
    const [focus, setFocus] = useState(false);
    const input = useRef<HTMLInputElement | null>(null);
    const wrapper = useRef<HTMLDivElement | null>(null);

    function handleAdd(e: FormEvent) {
        e.preventDefault()

        if (onAdd && input.current) {
            const currentValue = input.current.value
            onAdd([currentValue.trim()])
            input.current.value = ''
        }
    }

    function handleClick(e: MouseEvent) {
        if (!input.current) {
            return
        }

        const isTarget = e.target === wrapper.current

        if (isTarget) {
            input.current.focus()
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        onChange && onChange(value)
        onCancelDelete()
        if (value.includes(separator) && onAdd) {
            const chips = value
                .split(separator)
                .map((str) => str.trim())
                .filter(Boolean)

            onAdd(chips)
            e.target.value = ''
        }
    }

    function handleDelete(e: KeyboardEvent<HTMLInputElement>) {
        if (e.code !== 'Backspace') {
            return
        }

        const target = e.target as HTMLInputElement
        const isEmpty = target.value === ''

        if (isEmpty && onDelete) {
            onDelete()
        }
    }


    function handleCancel() {
        if (focus) {
            onCancelDelete()
        }   
    }

    useOnEscape(handleCancel)
    let outsideClick = useOutsideClick(handleCancel)

    const isEmpty = Children.count(children) === 0
    const isNotched = !isEmpty || focus || input.current?.value

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

            <Form onSubmit={handleAdd}>
                <input
                    ref={input}
                    type="text"
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChange={handleChange}
                    onKeyDown={handleDelete}
                    onClick={() => onCancelDelete()}
                />
            </Form>
        </StyledChipsInput>
    );
};

const Label = styled.span<{ focus: boolean }>`
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
const StyledChipsInput: any = styled.div<{ focus: boolean; error: boolean }>`
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

const Form = styled.form`
    flex-grow: 1;

    input {
        width: 100%;
        border: none;
        background: none;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        padding: 0;
        height: 100%;
    }

    input:focus {
        outline: none;
    }
`
