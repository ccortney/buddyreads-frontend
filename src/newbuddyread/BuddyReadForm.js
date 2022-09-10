import { Grid, Box, TextField, Button } from "@mui/material"

/** New Buddy Read Form
 *
 * Displays form to create new buddy read and send an invite to buddy.
 * Handles changes to local form state.
 * Submitting the form calls the API to create new buddy read. 
 *
 * Confirmation of a successful invite sent is normally a simple <ErrorAlert>
 *
 * Routed as /buddyreads/new
 * Result -> NewBuddyReadForm -> ErrorAlert
 */

const BuddyReadForm = ({formData, handleFormChange, handleFormSubmit}) => {

    return (
        <Grid container align='center' sx={{justifyContent:'center'}}>
            <form onSubmit={handleFormSubmit}>
                <Box sx={{ display: 'flex', justifyContent:  'center' }}>
                    <TextField
                        label="Buddy's Email"
                        id="buddy"
                        name="buddy"
                        value={formData.buddy}
                        onChange = {handleFormChange}
                        sx={{ m: 1, width: '25ch' }}
                    />
                    <Box sx={{display: 'flex', alignItems: 'center',  m: 1}}>
                        <Button variant="contained" type="submit">Invite</Button>
                    </Box>
                </Box>
            </form>
        </Grid>
    )
}

export default BuddyReadForm;