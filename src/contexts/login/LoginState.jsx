import React,{useState, createContext} from 'react';
import { host,endpoints } from '../../constants/requestConstants';
export const LoginContext = createContext();

function LoginState(props) {
  const [login, setLogin]=useState(false);
  const [user,setUser] = useState({});
  const updateLoginState = (isLoggedIn)=>{
    setLogin(isLoggedIn);
  }
  //setsNotes for UI if notes are added to DB.
  const getUser = async (title, description, tag) => {
    const url = host + endpoints.getUser;
    const authToken = localStorage.getItem('authToken');
    if(!authToken) return;
    const userResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken
      },
    });
    const { user:fetchedUser } = await userResponse.json();
    setUser(fetchedUser);
  }
  return (
    <LoginContext.Provider value = {{login,updateLoginState, user, getUser}}>
      {props.children}
    </LoginContext.Provider>
  )
}

export default LoginState;
