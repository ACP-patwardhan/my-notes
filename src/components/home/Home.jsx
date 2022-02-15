import styles from './home.module.css';
import React, { useContext, useEffect } from 'react';
import { LoginContext } from '../../contexts/login/LoginState';
import Notes from '../notes/Notes';
function Home() {
    const loginState = useContext(LoginContext);
    useEffect(() => {
        const loggedIn = localStorage.getItem('authToken'); 
        loginState.updateLoginState(loggedIn)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const login = loginState.login;
    return (
        <div className={styles.container}>
            {login ?
                <div>
                    <Notes/>
                </div>
                : 
                <div>
                    <h1>You are not logged in!</h1>
                    <div>If you are an existing user please consider logging in. </div>
                    <div>If you are a new user , you need to signup in order to access the page.</div>
                    <div>These options are available on the top right of your screen.</div>
                </div>
            }
        </div>
    );
}

export default Home;
