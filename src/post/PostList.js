import { Typography, Box } from "@mui/material";
import Post from "./Post";

/** Shows list of posts. 
 *
 * Renders Post component for each post in the list.
 * 
 * Rendered by Posts component 
 *
 * {Posts} -> {PostList} -> { Post, Like }
 */

const PostList = ({posts, progress, deletePost}) => {
    return (
        <Box>
            {posts.length === 0 ? 
                <Box padding={2} align="center">
                    <Typography sx={{ textTransform: 'uppercase', fontWeight: 'light' }} variant='body1'>
                        This buddy read has no posts. Start the discussion!
                    </Typography> 
                </Box> 
            :
            posts.map(post => (
                <Post 
                    key={post.id} 
                    post={post} 
                    progress={progress}
                    deletePost={deletePost}
                />))
            }
        </Box>

    )
}

export default PostList;