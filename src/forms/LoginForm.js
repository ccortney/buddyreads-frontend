import { useState, useContext, useEffect } from "react";
import UserContext from "../auth/UserContext";
import {useNavigate} from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorAlert from "../common/ErrorAlert";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {    Typography,
            Stack,
            Box, 
            TextField, 
            FormControl, 
            InputLabel, 
            OutlinedInput, 
            InputAdornment, 
            Button, 
            IconButton
        } from "@mui/material"

/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to / route
 *
 * AppRoutes -> LoginForm -> ErrorAlert
 * Routed as /login
 */

const LoginForm = ({login}) => {
    const {currentUser} = useContext(UserContext);
    const [infoLoaded, setInfoLoaded] = useState(false)
    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState([]);
    const [formData, setFormData] = useState({
        email: "", 
        password: "", 
        showPassword: false
    });

    useEffect(() => {
        if (currentUser) {
            navigate('/dashboard')
        }; 
        setInfoLoaded(true)
    }, [])

    const handleClickShowPassword = () => {
        setFormData({
            ...formData, 
            showPassword: !formData.showPassword
        })
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({...formData, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        delete formData.showPassword;
        let result = await login(formData);
        if (result.success) {
            navigate('/');
        } else {
            setFormErrors(result.errors);
        }
    }

    if (!infoLoaded) return <LoadingSpinner/>

    return (
        <Box display="flex" width='50%' alignItems="center" justifyContent="center" marginX="auto" marginTop={1}>
            <form onSubmit={handleSubmit} >
                <Box>
                    <Typography gutterBottom variant="h5" align='center' sx={{pt: 3}}>
                        Login
                    </Typography>
                </Box>
                    <Stack direction={{xs: 'column', sm: 'row'}}>
                            <TextField
                                label="Email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange = {handleChange}
                                sx={{ m: 1, width: '25ch' }}
                            />
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="password">Password *</InputLabel>
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
                    </Stack>
                <Box sx={{display: 'flex', justifyContent: 'right', m: 1}}>
                    <Button variant="contained" type="submit">Login</Button>
                </Box>
                {formErrors.length ? <ErrorAlert severity='error' messages={formErrors}/> : null }   
            </form>
        </Box>
    )
}

export default LoginForm;