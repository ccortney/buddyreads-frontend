import {Route, Routes, Navigate} from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm"
import Dashboard from  "../dashboard/Dashboard";
import ProfileForm from "../forms/ProfileForm";
import PrivateRoute from "./PrivateRoute"
import BuddyReadDetails from "../buddyread/BuddyReadDetails";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to /.
 */

const AppRoutes = ({login, signup, editProfile}) => {

    return (
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/login" element={<LoginForm login={login}/>}/>
            <Route path="/signup" element={<SignupForm signup={signup}/>}/>
            <Route path="/profile" element={<PrivateRoute/>}>
                <Route path="/profile" element={<ProfileForm editProfile={editProfile}/>}/>
            </Route>
            <Route path="/dashboard" element={<PrivateRoute/>}>
                <Route path="/dashboard" element={<Dashboard />}/>
            </Route>
            <Route path="/buddyreads/:id" element={<PrivateRoute/>}>
                <Route path="/buddyreads/:id" element={<BuddyReadDetails />}/>
            </Route>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    )
} 

export default AppRoutes;