import { useState } from "react";
import {useNavigate} from "react-router-dom";
import ErrorAlert from "../common/ErrorAlert";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {    Typography,
            Grid,  
            Box, 
            TextField, 
            FormControl, 
            InputLabel, 
            OutlinedInput, 
            InputAdornment, 
            Button, 
            IconButton
        } from "@mui/material"

const SignupForm = ({signup}) => {
    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState([]);
    const [formData, setFormData] = useState({
        email: "", 
        password: "", 
        firstName: "",
        lastName: "",
        profilePicture: "",
        showPassword: false
    });

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

    return (
        <Grid container align='center' sx={{justifyContent:'center'}}>
            <form onSubmit={handleSubmit}>
 
                <Typography gutterBottom variant="h5" component="div" sx={{pt: 3}}>
                    Create an Account:
                </Typography>
            

            <Box sx={{ display: 'flex', justifyContent:  'center' }}  onSubmit={handleSubmit}>
                <div>
                    <TextField
                        label="Email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange = {handleChange}
                        sx={{ m: 1, width: '25ch' }}
                    />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="password">Password</InputLabel>
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
                </div>  
            </Box>
            <Box >
                <TextField
                    sx={{m: 1, width: 250}}
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <TextField
                    sx={{m: 1, width: 250}}
                    id="name-input"
                    name="lastName"
                    label="Last Name"
                    type="text"
                    value={formData.lasttName}
                    onChange={handleChange}
                />
            </Box>
            <Box>
                <TextField
                    sx={{m: 1, width: 520}}
                    id="profilePicture"
                    name="profilePicture"
                    label="Profile Picture"
                    type="text"
                    value={formData.profilePicture}
                    onChange={handleChange}
                />
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'right', m: 1}}>
                <Button variant="contained" type="submit">Signup</Button>
            </Box>
            {formErrors.length ? <ErrorAlert severity='error' messages={formErrors}/> : null }
        </form>
    </Grid>
    )
}

export default SignupForm;