import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import UserContext from "../auth/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";
import { Grid, Typography, Box, Button} from "@mui/material"

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons when not logged in
 * Redirects to /dashboard when logged in
 *
 * Routed at /
 *
 * AppRoutes -> Homepage
 */

const Homepage = () => {
    const {currentUser} = useContext(UserContext);
    const [infoLoaded, setInfoLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate('/dashboard')
        };
        setInfoLoaded(true);
    }, [])

    if (!infoLoaded) return <LoadingSpinner/>

    return (
        <Grid container align='center' spacing={2} direction="column" sx={{mt: 3}}>
            <Grid item>
                <Typography sx={{typography: {xs: 'h3', sm: 'h2'}}} >
                        BUDDY READS
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="subtitle1" >
                    Choose a book. Find a friend. Discuss as you go.
                </Typography>
            </Grid>
            <Grid item>
            {currentUser ? 
                <Typography variant="h4" >
                    Welcome back, {currentUser.firstName} {currentUser.lastName}!
                </Typography> :
                <Box >
                    <Button variant="contained" sx={{mr: 1}}>
                        <Link style={{textDecoration: "none", color: "white"}} to={`/signup`}>Sign Up</Link>
                    </Button>
                    <Button variant="contained" sx={{ml: 1}}>
                        <Link style={{textDecoration: "none", color: "white"}} to={`/login`}>LOGIN</Link>
                    </Button>
                </Box>
            }
            </Grid>
            
        </Grid>
    )
}

export default Homepage;