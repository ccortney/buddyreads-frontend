import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./auth/UserContext";
import LoadingSpinner from "./common/LoadingSpinner";
import AppRoutes from "./routes/AppRoutes";
import NavBar from "./navbar/NavBar"
import BuddyReadApi from "./api/api";
import { decodeToken } from "react-jwt";
import './App.css';

function App() {
  
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage("token-buddyreads");

 
  console.debug(
    "App", 
    "infoLoaded=", infoLoaded, 
    "currentUser=", currentUser, 
    "token=", token
  )

  useEffect(() => {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          BuddyReadApi.token = token;
          let {id} = decodeToken(token);
          let currentUser = await BuddyReadApi.getUser(id);
          setCurrentUser(currentUser); 

        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  async function login(loginData) {
    try {
      let token = await BuddyReadApi.login(loginData);
      setToken(token);
      return { success: true }
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  async function signup(signupData) {
    try {
      let token = await BuddyReadApi.signup(signupData);
      setToken(token);
      return { success: true }
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  async function editProfile(id, data) {
    try {
      let res = await BuddyReadApi.saveProfile(id, data);
      return { success: true }
    } catch (errors) {
      console.error("edit failed", errors);
      return { sucess: false, errors}
    }
  }

  function logout() {
    setToken(null);
    setCurrentUser(null);
  }


  if (!infoLoaded) return <LoadingSpinner/>

  return (
    <BrowserRouter>
      <UserContext.Provider
        value = {{currentUser, setCurrentUser}}>
        <div className = "App">
            <NavBar logout={logout}/>
            <AppRoutes  login={login} 
                        signup={signup} 
                        editProfile={editProfile}
            />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;


