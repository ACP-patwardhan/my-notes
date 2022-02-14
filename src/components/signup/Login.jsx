import React, { useState,useContext } from 'react';
import { LoginContext } from '../../contexts/login/LoginState';
import { useNavigate } from "react-router-dom";
import { host, endpoints } from '../../constants/requestConstants';
import styles from './signup.module.css';
function Login() {
    const loginState = useContext(LoginContext);
    const [Creds, setCreds] = useState({ email: "", password: ""});
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = host + endpoints.login;
        const data = {
            email: Creds.email,
            password: Creds.password,
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const {success,authToken} = await response.json();
        if(success){
            loginState.updateLoginState(true);
            localStorage.setItem('authToken',authToken);
            navigate('/');
        }
        else{
            alert('Username or Password is not correct');
        }
    }
    const onChangeHandler = async (e) => {
        setCreds({ ...Creds, [e.target.name]: e.target.value })
    }
    const getErrorText = () => {
        if (Creds.email.length === 0) return 'Enter email';
        if (Creds.password.length === 0) return 'Enter Password';
        return 'no error!';
    }
    const isDisabled = () => {
        return Creds.email.length === 0 || Creds.password.length === 0;
    }
    const errorText = getErrorText();
    let btnClass = styles.btn;
    if (isDisabled()) btnClass += ' disabled';
    return (
        <div className={styles.signupContainer}>
            <h1>Welcome to My Notes</h1>
            <h2>Log in to access the App!</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={onChangeHandler} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={onChangeHandler} />
                {isDisabled() &&
                    <div className={styles.error}>
                        {errorText}
                    </div>
                }
                <button type="submit" className={btnClass} disabled={isDisabled()}>Submit</button>
            </form>
        </div>
    );
}

export default Login;
