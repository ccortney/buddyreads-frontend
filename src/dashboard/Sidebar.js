import { Add, CheckCircle, Pending, RotateLeft } from "@mui/icons-material";
import {    Box, 
            List, 
            Stack, 
            ListItem, 
            ListItemButton, 
            ListItemIcon, 
            ListItemText} from "@mui/material";

/** Show component with list options for users 
 * 
 * Add New: NewBuddyRead component
 * Invites: InviteList component
 * Current: BuddyReadList component
 * Completed: BuddyReadList component
 *  
 * When list item is clicked, that component is rendered
 * 
 * Dashboard -> { Sidebar } 
 */

const Sidebar = ({setShowComponent}) => {

    const handleClick = (id) => {
        const components = {
            add: false, 
            invites: false, 
            current: false, 
            completed: false
        }
        components[id] = true
        setShowComponent({...components})
    }
    
    return (
        <Box>
            <Box position={{sm: "fixed"}}>
                <List component={Stack} direction={{xs: 'row', sm: 'column'}} padding={{xs: 0, sm: 1}}>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleClick('add')} sx={{maxWidth: {xs: '15px', sm: "200px"}}}>
                            <ListItemIcon>
                                <Add/>
                            </ListItemIcon>
                            <ListItemText primary="Add New" sx={{display: {xs: 'none', sm: 'block'}}}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleClick('invites')} sx={{maxWidth: {xs: '15px', sm: '200px'}}}>
                            <ListItemIcon>
                                <Pending/>
                            </ListItemIcon>
                            <ListItemText primary="Invites" sx={{display: {xs: 'none', sm: 'block'}}}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleClick('current')} sx={{maxWidth: {xs: '15px', sm: '200px'}}}>
                            <ListItemIcon>
                                <RotateLeft/>
                            </ListItemIcon>
                            <ListItemText primary="In-Progress" sx={{display: {xs: 'none', sm: 'block'}}}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleClick('completed')} sx={{maxWidth: {xs: '15px', sm: '200px'}}}>
                            <ListItemIcon>
                                <CheckCircle/>
                            </ListItemIcon>
                            <ListItemText primary="Completed" sx={{display: {xs: 'none', sm: 'block'}}}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Box>
    )
}

export default Sidebar;