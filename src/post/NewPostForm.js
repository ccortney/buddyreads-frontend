import { Box, TextField, Button } from "@mui/material";
import { Stack } from "@mui/system";

/** New Post Form component
 *
 * Displays form to create post.
 * Submitting the form calls the BuddyReadAPI to create new post and
 * renders it in PostList. 
 *  
 * Rendered by NewPost component
 *
 * {NewPost} -> {NewPostForm}
 */

const NewPostForm = ({formData, handleChange, handleSubmit}) => {

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Box flex={1}>
                        <TextField
                            sx={{width: '100%'}}
                            id="message"
                            name="message"
                            label="Start a New Post"
                            required
                            multiline
                            rows={3}
                            value={formData.message}
                            onChange = {handleChange}
                        />
                    </Box>

                    <Stack direction="column" alignItems="center" spacing={1}>
                        <Box>
                            <TextField
                                label="Page"
                                id="page"
                                name="page"
                                value={formData.page}
                                onChange = {handleChange}
                                sx={{width: '8ch'}}
                            />
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center',  m: 1}}>
                            <Button variant="contained" type="submit">Post</Button>
                        </Box>
                    </Stack>
                </Stack>
            </form> 
        </Box>
    )
}

export default NewPostForm;