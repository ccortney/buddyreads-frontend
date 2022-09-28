import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./auth/UserContext";
import LoadingSpinner from "./common/LoadingSpinner";
import AppRoutes from "./routes/AppRoutes";
import NavBar from "./navbar/NavBar"
import BuddyReadApi from "./api/api";
import { decodeToken } from "react-jwt";
import { Box } from "@mui/material";

/** Buddy Reads application.
 *
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 * App -> AppRoutes
 */

function App() {
  
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage("token-buddyreads");

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(() => {
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

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handles site-wide login.*/
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

  /** Handles site-wide signup. Automatically logs them in (set token) upon signup.*/
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

  /** Handles site-wide user profile edit. */
  async function editProfile(id, data) {
    try {
      await BuddyReadApi.saveProfile(id, data);
      return { success: true }
    } catch (errors) {
      console.error("edit failed", errors);
      return { sucess: false, errors}
    }
  }

  /** Handles site-wide logout. */
  function logout() {
    setToken(null);
    setCurrentUser(null);
  }


  if (!infoLoaded) return <LoadingSpinner/>

  return (
    <BrowserRouter>
      <UserContext.Provider
        value = {{currentUser, setCurrentUser}}>
        <Box className = "App">
            <NavBar logout={logout}/>
            <AppRoutes  login={login} 
                        signup={signup} 
                        editProfile={editProfile}
            />
        </Box>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;


