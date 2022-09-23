import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Stack, ListItemIcon, Button, styled, Tooltip, Avatar, Box, Menu, MenuItem } from "@mui/material";
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import UserContext from "../auth/UserContext";
import { Logout } from "@mui/icons-material";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

const NavBar = ({logout}) => {
    const {currentUser} = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState();

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    const MenuButton = styled(Button)({
        typography: 'body1', 
        align: 'left', 
        textTransform: "capitalize", 
        padding: 0, 
        fontSize: '1rem',
        lineHeight: 1.5, 
        fontWeight: 400 
    })  

    const NavButton = styled(Button)(({theme}) => ({
        typography: 'body1', 
        textTransform: "uppercase",
        fontSize: '0.9rem',
        fontWeight: 300,
        [theme.breakpoints.up("sm")]: {
            margin: '5px',
            fontWeight: 400,
            fontSize: '1rem'
        },
    }))  
    
    const loggedInNav = () => {
        return (
            <Box>
            <Tooltip title="Open Menu">
                    <IconButton sx={{ p: 0}} onClick={handleOpen}>
                        <Avatar 
                            sx={{bgcolor: 'secondary.main'}} 
                            alt={currentUser.firstName}
                        >
                            {currentUser.firstName.substring(0, 1).toUpperCase()}
                        </Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    id="user-menu"
                    aria-labelledby="user-menu-button"
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorEl={anchorEl}
                    sx={{mt: '45px'}}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    transformOrigin={{vertical: 'top', horizontal: 'right'}}
                >
                    <MenuItem>
                        <MenuButton >
                            <Link to="/dashboard" 
                                style={{textDecoration: 'none', color: 'black'}}>
                                Dashboard
                            </Link>
                        </MenuButton>
                    </MenuItem>
                    <MenuItem>
                        <MenuButton >
                            <Link to="/profile" 
                                style={{textDecoration: 'none', color: 'black'}}>
                                Edit Profile
                            </Link>
                        </MenuButton>
                    </MenuItem>
                    <MenuItem>
                    <MenuButton>
                            <Logout sx={{color: "black", fontSize: '1rem', pr: 0.5}}/>
                            <Link 
                                onClick={logout}
                                to="/login" 
                                style={{textDecoration: 'none', color: 'black'}}>
                                Logout
                            </Link>
                        </MenuButton>
                    </MenuItem>
                </Menu>
                </Box>
        )
    }

    const loggedOutNav = () => {
        return (
            <Box >
                <NavButton>
                    <Link to="/signup"
                        style={{textDecoration: 'none', color: 'white'}}>
                        Signup
                    </Link>
                </NavButton>
                <NavButton >
                    <Link to="/login" 
                        style={{textDecoration: 'none', color: 'white'}}>
                        Login
                    </Link>
                </NavButton>
            </Box>
        )
    }


    return (
        <AppBar position='static' component="nav">
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box>
                    <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                        <Link to="/" 
                            style={{textDecoration: 'none', color: 'white'}}>
                            <AutoStoriesRoundedIcon/>
                        </Link>        
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{display: "inline"}}>
                        <Link to="/" 
                            style={{textDecoration: 'none', color: 'white'}}>
                            BuddyReads App
                        </Link>
                    </Typography>
                </Box>
                {currentUser ? loggedInNav() : loggedOutNav()}
                
            </Toolbar>
        </AppBar>
    )
}



export default NavBar;
