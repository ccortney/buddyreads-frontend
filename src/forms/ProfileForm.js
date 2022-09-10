import { useState, useContext } from "react";
import {    Grid, 
            TextField, 
            Typography, 
            FormControl, 
            Button, 
            InputLabel, 
            OutlinedInput, 
            InputAdornment, 
            IconButton} from "@mui/material";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import UserContext from "../auth/UserContext";
import ErrorAlert from "../common/ErrorAlert";
import BuddyReadApi from "../api/api";

/** Profile editing form.
 *
 * Displays profile form and password change form. 
 * Handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 *
 * Confirmation of a successful save is normally a simple <ErrorAlert>
 *
 * Routed as /profile
 * AppRoutes -> ProfileForm -> ErrorAlert
 */

const ProfileForm = ({editProfile}) => {
    const { currentUser, setCurrentUser } = useContext(UserContext)

    const INITIAL_STATE = {
        firstName: '',
        lastName: '',
        email: '', 
        password: '',
        showPassword: false
    }

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);
    const [saveConfirmed, setSaveConfirmed] = useState({profile: false, password: false})

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({...formData, [name]: value}))
        setFormErrors([]);
    }

    const handleSubmit = type => async e => {
        e.preventDefault();
        let updatedUser;

        let profileData = {
            email: formData.email || currentUser.email,
            password: formData.password || currentUser.password, 
            firstName: formData.firstName || currentUser.firstName,
            lastName: formData.lastName || currentUser.lastName, 
        }

        try {
            await editProfile(currentUser.id, profileData);
            updatedUser = await BuddyReadApi.getUser(currentUser.id)
        } catch(errors) {
            setFormErrors(errors);
            return;
        }

        setFormErrors([]);
        setCurrentUser(updatedUser);
        setFormData(INITIAL_STATE);
        setSaveConfirmed(data => ({...data, [type]: true}));
    }
      
    const handleClickShowPassword = () => {
        setFormData({
        ...formData,
        showPassword: !formData.showPassword,
        });
    };
      
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

  return (
        <Grid container align='center' sx={{justifyContent:'center'}}>
            <Grid item>
                {formErrors.length ? <ErrorAlert severity='error' messages={formErrors}/> : null }   
            </Grid>
          
            <Grid item>
                <form onSubmit={handleSubmit('profile')}>
                    <Typography gutterBottom variant="h5" component="div" sx={{pt: 3}}>
                        Edit Profile for {currentUser.firstName}
                    </Typography>
                    <Grid container alignItems="center" justifyContent="center" direction="column">
                        <Grid item >
                            <TextField
                                sx={{m: 1, width: 300}}
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                type="text"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                    sx={{m: 1, width: 300}}
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                        </Grid>
                        <Grid item>
                            <TextField
                                sx={{m: 1, width: 300}}
                                id="email"
                                name="email"
                                label="Email"
                                type="text"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Button variant="contained" 
                                color="primary" 
                                type="submit" sx={{mt: 2}}>
                        Save Changes
                        </Button>
                        {saveConfirmed.profile ? <ErrorAlert severity='success' messages={["Profile Updated Successfully"]}/> : null } 
                    </Grid>
                </form>
                <form onSubmit={handleSubmit('password')}>
                <Typography gutterBottom variant="h5" component="div" sx={{pt: 3}}>
                    Edit Password
                </Typography>
                <Grid container alignItems="center" justifyContent="center" direction="column">

                    <Grid item >
                        <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
                                <InputLabel htmlFor="password">New Password</InputLabel>
                                <OutlinedInput
                                id="password"
                                type={formData.showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                    {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                />
                        </FormControl>   
                    </Grid>        
                    <Button variant="contained" 
                            color="primary" 
                            type="submit" 
                            sx={{mt: 2}} >
                        Save
                    </Button>
                    </Grid>
                </form>
                {saveConfirmed.password ? <ErrorAlert severity='success' messages={["Password Saved"]}/> : null } 
            </Grid>
        </Grid>
  );
};

export default ProfileForm;