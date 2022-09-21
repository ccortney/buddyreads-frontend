import { Grid, Box, TextField, Button, FormControl  } from "@mui/material";
import { useState } from "react";

const NewPostForm = ({formData, handleChange, handleSubmit}) => {

    return (
        <Grid container align='center' sx={{justifyContent:'center'}}>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', justifyContent:  'center' }}>
                    <FormControl sx={{ m: 1}}>
                        <TextField
                            label="Page"
                            id="page"
                            name="page"
                            value={formData.page}
                            onChange = {handleChange}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1}}>
                        <TextField
                            label="Post Message"
                            id="message"
                            name="message"
                            multiline
                            value={formData.message}
                            onChange = {handleChange}
                        />
                    </FormControl>
                    <Box sx={{display: 'flex', alignItems: 'center',  m: 1}}>
                        <Button variant="contained" type="submit">Post</Button>
                    </Box>
                </Box>
            </form>
        </Grid>
    )
}

export default NewPostForm;