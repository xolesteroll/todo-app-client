import React from 'react';
import noImage from '../../../assets/images/no_image.png'

import c from './Avatar.module.css'

const Avatar = ({source, alt}) => {
    return (
        <div className={c.avatarWrapper} style={{backgroundImage: `url(${noImage})`}}>
            {source && <img className={c.avatarImg} src={source || noImage}  alt={alt}/>}
        </div>
    );
};

export default Avatar;
