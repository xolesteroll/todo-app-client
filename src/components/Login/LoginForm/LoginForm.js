import React, {useState} from 'react';

import c from './LoginForm.module.css'
import MyButton from "../../UI/MyButton/MyButton";

const LoginForm = ({
                       onFormSubmit,
                       isLogin,
                       onChangeIsLogin
                   }) => {

    const [firstNameValue, setFirstNameValue] = useState('')
    const [lastNameValue, setLastNameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const onChangeFormFieldsValueHAndler = (e, setter) => {
        const value = e.target.value
        setter(value)
    }

    const dataOnSubmit = isLogin ?
        {
            email: emailValue,
            password: passwordValue
        } :
        {
            email: emailValue,
            password: passwordValue,
            firstName: firstNameValue,
            lastName: lastNameValue
        }

    const sendDataOnSubmitHAndler = (e) => {
        e.preventDefault()
        onFormSubmit(dataOnSubmit)
    }

    return (
        <form className={c.form} onSubmit={sendDataOnSubmitHAndler}>
            <h3 className={c.formTitle}>{isLogin ? "Login" : "Sign Up"}</h3>
            <div className={c.formFields}>
                {!isLogin &&
                <>
                    <label htmlFor="firstName">
                        First Name
                    </label>
                    <input type="text" name="firstName" value={firstNameValue} required
                           onChange={(e) => onChangeFormFieldsValueHAndler(e, setFirstNameValue)}/>
                    <label htmlFor="password">
                        Last Name
                    </label>
                    <input type="lastName" name="lastName" value={lastNameValue} required
                           onChange={(e) => onChangeFormFieldsValueHAndler(e, setLastNameValue)}/>
                </>}
                <label htmlFor="email">
                    Your Email
                </label>
                <input type="email" value={emailValue} required
                       onChange={(e) => onChangeFormFieldsValueHAndler(e, setEmailValue)}/>
                <label htmlFor="password">
                    Your Password
                </label>
                <input type="password" value={passwordValue} required
                       onChange={(e) => onChangeFormFieldsValueHAndler(e, setPasswordValue)}/>
            </div>
            <div className={c.formControls}>
                <MyButton
                    color="#ffffff"
                    bgColor="#82b1ff"
                    hoverColor="#000000"
                    text={isLogin ? "Login" : "Register"}
                    paddingOnHover
                    type="submit"/>
                <p>or</p>
                <MyButton
                    onClickHandler={onChangeIsLogin}
                    color="#ffffff"
                    bgColor="#6fdd8f"
                    hoverColor="#000000"
                    paddingOnHover
                    text={isLogin ? "Create new account" : "Login with existing account"}/>

            </div>
        </form>
    );
};

export default LoginForm;
