import { Grid, Typography, Button, Box, Stack, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../auth/UserContext";

/** Show page with list buddy reads (current or completed)
 *
 * It is rendered by Dashboard to show a list of buddy reads. 
 * 
 * When buddy read is clicked, book information is shown on a new page (/buddyread/:id)
 * 
 * Dashboard -> BuddyReadList
 */


const BuddyReadList = ({buddyReadList, type}) => {
    const {currentUser} = useContext(UserContext)

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    const findBuddy = (br) => {
        if (br.createdBy.id === currentUser.id) return br.buddy
        else return br.createdBy
    }


    return (
        <Box p={1}>
            <Typography variant="h5" component='div' sx={{mb: 1}}>{type} Buddy Reads</Typography>
            <Item sx={{ width: '75%' }}>
            <Stack spacing={1} >
                {buddyReadList.length === 0 ?
                        <Typography sx={{fontWeight: 'light', textTransform: 'uppercase'}} variant='body2'>
                            You have no {type} buddy reads.
                        </Typography> : 
                buddyReadList.map(br => (<Button key={br.id}>
                        <Link to={`/buddyreads/${br.id}`} style={{textDecoration: 'none', color: 'black' }}>                    
                            {br.bookTitle} with {findBuddy(br).firstName}
                        </Link>
                </Button>))}
            </Stack>
            </Item>
        </Box>
    )
}

export default BuddyReadList;