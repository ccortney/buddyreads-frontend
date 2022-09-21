import {useState, useEffect, useContext} from "react"
import { Grid, Button, Typography, Box } from "@mui/material";
import NewPostForm from "./NewPostForm";
import ErrorAlert from "../common/ErrorAlert";

const Post = ({formData, formErrors, handleChange, handleSubmit}) => {


    return (
        <Box sx={{border:1}}>
            <Button variant="contained">Create New Post</Button>
            {formErrors.length ? <ErrorAlert severity='error' messages={formErrors}/> : null } 
            <NewPostForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </Box>
    )
}

export default Post;