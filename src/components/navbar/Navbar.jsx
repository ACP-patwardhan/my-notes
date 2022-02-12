import styles from './navbar.module.css';
import React ,{useContext} from 'react';
import { LoginContext } from '../../contexts/login/LoginState';
import { useNavigate } from "react-router-dom";
import {classNameAdder} from '../../helpers/classNameAdder';
function Navbar() {
    const loginState = useContext(LoginContext);
    const navigate = useNavigate();
    const login = loginState.login;
    const handleNavigation = (url) => {
        navigate(url);
    }
    const handleLogout = ()=> {
        loginState.updateLoginState(false);
        localStorage.removeItem('authToken');
    }
    return (
        <div className={styles.navbar}>
            <div className={styles.leftNav}>
                <button className={classNameAdder(styles.btn,styles.stdColor)} onClick={()=>handleNavigation("/")}>Home</button>
                <button className={classNameAdder(styles.btn,styles.stdColor)} onClick={()=>handleNavigation("/about")}>About</button>
            </div>
            <div className={styles.rightNav}>
                {!login && <button className={classNameAdder(styles.btn,styles.loginColor)} onClick={()=>handleNavigation("/signup")}>Signup</button>}
                {login?<button className={classNameAdder(styles.btn,styles.logoutColor)} onClick={handleLogout}>Logout</button>: <button className={classNameAdder(styles.btn,styles.loginColor)}>Login</button>}
            </div>
        </div>
    );
}

export default Navbar;
