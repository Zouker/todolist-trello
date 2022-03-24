import React from 'react';

type PropsType = {
    name: string
    callback: () => void
    className?: string
}

export const Button = (props: PropsType) => {

    const onClickHandler = () => {
        props.callback()
    }

    return (
        <button className={props.className} name={props.name} onClick={onClickHandler}>{props.name}</button>
    );
};