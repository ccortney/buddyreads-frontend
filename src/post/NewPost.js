import { Box, Divider, Chip } from "@mui/material";
import NewPostForm from "./NewPostForm";
import ErrorAlert from "../common/ErrorAlert";

/** Show NewPost component. 
 * 
 * This component doesn't *do* the searching, but it renders the new post
 * form and calls the `handleSubmit` function prop that runs in 
 * Posts component to do the searching.
 * 
 * Confirmation of a successful save is a simple <ErrorAlert>
 *
 * Rendered by Posts component
 * 
 * {Posts} -> {NewPost} -> { NewPostForm, ErrorAlert }
 */

const NewPost = ({formData, formErrors, handleChange, handleSubmit}) => {

    return (
        <Box>
            <NewPostForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                
            />
            {formErrors.length ? <ErrorAlert severity='error' messages={formErrors}/> : null } 
            <Divider sx={{pt: 2}}>
                <Chip label="DISCUSSION BELOW" sx={{color: "white", bgcolor: "primary.main"}}/>
            </Divider>
        </Box>
    )
}

export default NewPost;