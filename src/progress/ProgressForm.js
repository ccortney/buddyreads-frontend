import { Stack, Button, TextField, Box, Dialog, DialogTitle, DialogActions, DialogContent} from "@mui/material";
import ErrorAlert from "../common/ErrorAlert";

/** Progress Form component
 *
 * Displays form to update progress
 * Submitting the form calls the BuddyReadAPI to update progress and
 * updated page and percents are rendered in the Progress component
 *  
 * Rendered by Progress component
 *
 * {Progress} -> {ProgressForm}
 */

const ProgressForm = ({showForm, setShowForm, formData, formErrors, setFormErrors, handleChange, handleSubmit}) => {
    const handleClose = () => {
        setShowForm(false);
        setFormErrors([])
    }
    return (
        <Dialog open={showForm} onClose={handleClose}>
        <DialogTitle>Update Your Progress</DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit}>
                <Stack direction="row" justifyContent="center">
                 <Box sx={{ display: 'flex', justifyContent:  'center' }}>
                     <TextField
                         label="Page"
                         id="progress"
                         name="progress"
                         value={formData.progress}
                         onChange = {handleChange}
                         sx={{ m: 1, width: '10ch' }}
                     />
                 </Box>
                 <DialogActions>
                        <Button type="submit">Update</Button>
                </DialogActions>
                </Stack>
             </form>
             {formErrors.length ? <ErrorAlert severity='error' messages={formErrors}/> : null } 
        </DialogContent>
      </Dialog>
    )
}

export default ProgressForm;