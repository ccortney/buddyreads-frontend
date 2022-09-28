import { Grid, Box, TextField, Button } from "@mui/material"

/** New Buddy Read Form component
 *
 * Displays form to create new buddy read and send an invite to buddy.
 * Submitting the form calls the API to create new buddy read. 
 *
 * Confirmation of a successful invite sent is normally a simple <ErrorAlert>
 * 
 * Rendered by Result component
 *
 * {Result} -> {NewBuddyReadForm} -> ErrorAlert
 */

const BuddyReadForm = ({formData, setShowForm, handleFormChange, handleFormSubmit}) => {

    return (
        <Grid container align='center' sx={{justifyContent:'center'}}>
            <form onSubmit={handleFormSubmit}>
                <Box sx={{ display: {xs: 'block', sm: 'flex'}, justifyContent:  'center' }}>
                    <TextField
                        label="Buddy's Email"
                        id="buddy"
                        name="buddy"
                        value={formData.buddy}
                        onChange = {handleFormChange}
                        sx={{ m: 1, width: '25ch' }}
                    />
                    <Box sx={{display: {xs: 'block', sm: 'flex'}, alignItems: 'center',  m: 1 }}>
                        <Button 
                            variant="contained" 
                            type="submit" 
                            sx={{m: 0.5}}>
                            Invite
                        </Button>
                        <Button 
                            onClick={() => setShowForm(false)} 
                            sx={{m: 0.5, color: "secondary.main"}}>
                            Back
                        </Button>
                    </Box>
                </Box>
            </form>
        </Grid>
    )
}

export default BuddyReadForm;