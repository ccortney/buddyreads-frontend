import { Grid, Button, Typography, Box } from "@mui/material";
import Post from "./Post";

const PostList = ({posts, progress}) => {
    return (
        <Box>
            <ul>
            {posts.map(post => (<Post key={post.id} post={post} progress={progress}/>))}
            </ul>
        </Box>
    )
}

export default PostList;