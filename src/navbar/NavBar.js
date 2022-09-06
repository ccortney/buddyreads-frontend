import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material";
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import UserContext from "../auth/UserContext";

const NavBar = ({logout}) => {
    const {currentUser} = useContext(UserContext);

    const loggedInNav = () => {
        return (
            <Stack direction='row' spacing={2}>
                <Button>
                    <Link to="/dashboard" 
                        style={{textDecoration: 'none', color: 'white'}}>
                        Dashboard
                    </Link>
                </Button>
                <Button>
                    <Link to="/profile" 
                        style={{textDecoration: 'none', color: 'white'}}>
                        Edit Profile
                    </Link>
                </Button>
                <Button>
                    <Link to="/login" 
                        onClick={logout}
                        style={{textDecoration: 'none', color: 'white'}}>
                        Logout
                    </Link>
                </Button>
            </Stack>
        )
    }

    const loggedOutNav = () => {
        return (
            <Stack direction='row' spacing={2}>
                <Button>
                    <Link to="/signup"
                        style={{textDecoration: 'none', color: 'white'}}>
                        Signup
                    </Link>
                </Button>
                <Button>
                    <Link to="/login" 
                        style={{textDecoration: 'none', color: 'white'}}>
                        Login
                    </Link>
                </Button>
                </Stack>
        )
    }

    return (
        <AppBar position='static' component="nav">
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                        <AutoStoriesRoundedIcon/>
                </IconButton>
                <Typography variant="h6" component="div"  sx={{flexGrow: 1}}>
                    <Link to="/" 
                        style={{textDecoration: 'none', color: 'white'}}>
                        BuddyReads App
                    </Link>
                    
                </Typography>
                {currentUser ? loggedInNav() : loggedOutNav()}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;