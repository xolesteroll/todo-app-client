import React, {useState} from 'react';

import c from './Mybutton.module.css'

const MyButton = ({className, styles, text, bgColor, color, hoverColor, type, onClickHandler, paddingOnHover}) => {
    const [style, setStyle] = useState({
        color: color || "white",
        backgroundColor: bgColor || "green",
        ...styles
    })

    const colorOnHoverHandler = () => {
        setStyle(prevState => ({
            ...prevState,
            color: color || "white",
            backgroundColor: hoverColor || "green",
        }))
    }

    const colorOnUnhoverHAndler = () => {
        setStyle(prevState => ({
            ...prevState,
            color: color || "white",
            backgroundColor: bgColor || "green",
        }))
    }

    return (
        <button
            onClick={onClickHandler ? onClickHandler : null}
            className={`${c.myButton} ${paddingOnHover ? c.paddingAnimated : ''} ${className}`}
            onMouseEnter={colorOnHoverHandler}
            onMouseLeave={colorOnUnhoverHAndler}
            type={type ? type : 'button'}
            style={style}
        >
            {text}
        </button>
    );
};

export default MyButton;
