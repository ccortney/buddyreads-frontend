import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** Site-wide private routes.
 *
 * Checks to ensure there is a logged in user. 
 *
 * Visiting an unauthorized route redirects to the login.
 */

const PrivateRoute = () => {
    const {currentUser} = useContext(UserContext);

    if (!currentUser) {
        return <Navigate to="/login"/>
    }

    return <Outlet/>
    
}

export default PrivateRoute;