import { useState, useContext, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import UserContext from "../auth/UserContext";
import ErrorAlert from "../common/ErrorAlert";
import LoadingSpinner from "../common/LoadingSpinner";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {    Typography,
            Box, 
            Stack,
            TextField, 
            FormControl, 
            InputLabel, 
            OutlinedInput, 
            InputAdornment, 
            Button, 
            IconButton
        } from "@mui/material"

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to / route
 *
 * AppRoutes -> SignupForm -> ErrorAlert
 * Routed as /signup
 */

const SignupForm = ({signup}) => {
    const {currentUser} = useContext(UserContext);
    const [infoLoaded, setInfoLoaded] = useState(false);
    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState([]);
    const [formData, setFormData] = useState({
        email: "", 
        password: "", 
        firstName: "",
        lastName: "",
        showPassword: false
    });

    useEffect(() => {
        if (currentUser) {
            navigate('/dashboard')
        };
        setInfoLoaded(true);
    }, [currentUser, navigate])

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
        let result = await signup(formData);
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
                    Create an Account:
                </Typography>
            </Box>
                <Stack direction='column'>
                        <TextField
                            sx={{ m: 1, width: 300 }}
                            label="Email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange = {handleChange}
                        />
                        <TextField
                            sx={{m: 1, width: 300}}
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <TextField
                            sx={{m: 1, width: 300}}
                            id="name-input"
                            name="lastName"
                            label="Last Name"
                            type="text"
                            required
                            value={formData.lasttName}
                            onChange={handleChange}
                        />
                        <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                            id="password"
                            type={formData.showPassword ? 'text' : 'password'}
                            name="password"
                            required
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

export default SignupForm;