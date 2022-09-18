import { Grid, Button, TextField, Box} from "@mui/material";


const ProgressForm = ({formData, handleChange, handleSubmit}) => {

    return (
        <Grid container align='center' sx={{justifyContent:'center'}}>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', justifyContent:  'center' }}>
                    <TextField
                        id="progress"
                        name="progress"
                        value={formData.progress}
                        onChange = {handleChange}
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <Box sx={{display: 'flex', alignItems: 'center',  m: 1}}>
                        <Button variant="contained" type="submit">Update</Button>
                    </Box>
                </Box>
            </form>
        </Grid>
    )
}

export default ProgressForm;