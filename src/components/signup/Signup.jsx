import React, { useState,useContext } from 'react';
import { LoginContext } from '../../contexts/login/LoginState';
import { useNavigate } from "react-router-dom";
import { host, endpoints } from '../../constants/requestConstants';
import styles from './signup.module.css';
function Signup() {
    const loginState = useContext(LoginContext);
    const [Creds, setCreds] = useState({ name: "", email: "", password: "", cpassword: "" });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = host + endpoints.createUser;
        const data = {
            name: Creds.name,
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
            alert('A user with these credentials already exists');
        }
    }
    const onChangeHandler = async (e) => {
        setCreds({ ...Creds, [e.target.name]: e.target.value })
    }
    const getErrorText = () => {
        if (Creds.name.length === 0) return 'Enter your name';
        if (Creds.email.length === 0) return 'Enter email';
        if (Creds.password.length < 5) return 'Password must be atleast 5 characters';
        if (Creds.cpassword !== Creds.password) return 'Enter Same Passwords in both fields';
        return 'no error!';
    }
    const isDisabled = () => {
        return Creds.name.length === 0 || Creds.email.length === 0 || Creds.password.length < 5 || Creds.cpassword !== Creds.password;
    }
    const errorText = getErrorText();
    let btnClass = styles.btn;
    if (isDisabled()) btnClass = styles.disabled;
    return (
        <div className={styles.signupContainer}>
            <h1>Welcome to My Notes</h1>
            <h2>Sign up to access the App!</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" onChange={onChangeHandler} />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={onChangeHandler} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={onChangeHandler} />
                <label htmlFor="cpassword">Confirm Password</label>
                <input type="password" name="cpassword" id="cpassword" onChange={onChangeHandler} />
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

export default Signup;
