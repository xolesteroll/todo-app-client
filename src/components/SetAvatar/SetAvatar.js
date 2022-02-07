import React, {useEffect, useState} from 'react';

import c from './SetAvatar.module.css'
import MyButton from "../UI/MyButton/MyButton";
import {useDispatch, useSelector} from "react-redux";
import {setAvatar} from "../../store/thunks/userThunks";
import Avatar from "../UI/Avatar/Avatar";

const SetAvatar = () => {
    const [avatarFile, setAvatarFile] = useState(null)
    const [avatarURL, setAvatarURL] = useState('')
    const [isAvatarPicked, setIsAvatarPicked] = useState(false)
    const userId = useSelector(state => state.auth.id)
    console.log(avatarFile)

    const dispatch = useDispatch()

    useEffect(() => {
        avatarFile ? setIsAvatarPicked(true) : setIsAvatarPicked(false)
    }, [avatarFile])

    const onFileSubmitHandler = (e) => {
        if (isAvatarPicked) {
            e.preventDefault()
            const formData = new FormData()
            formData.append("id", userId)
            formData.append("img", avatarFile)
            dispatch(setAvatar(formData))
        }
    }

    const selectImg = (e) => {
        setAvatarFile(e.target.files[0])
        const fileReader = new FileReader()
        fileReader.readAsDataURL(e.target.files[0])
        fileReader.onloadend = (e) => {
            setAvatarURL([fileReader.result])
        }
    }

    return (
        <div className={c.setAvatarWrapper}>
            {isAvatarPicked && <p>Check how it will look</p>}
            <Avatar source={avatarURL} alt="user's avatar"/>
            <form className={c.form} onSubmit={onFileSubmitHandler}>
                <label htmlFor="avatar">Choose you avatar</label>
                <input type="file" name="avatar" onChange={selectImg}/>
                <MyButton text="Save" type="submit"/>
            </form>
        </div>

    );
};

export default SetAvatar;
