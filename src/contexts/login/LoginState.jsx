import React,{useState, createContext} from 'react';
export const LoginContext = createContext();

function LoginState(props) {
  const [login, setLogin]=useState(false);
  const updateLoginState = (isLoggedIn)=>{
    setLogin(isLoggedIn);
  }
  return (
    <LoginContext.Provider value = {{login,updateLoginState}}>
      {props.children}
    </LoginContext.Provider>
  )
}

export default LoginState;
