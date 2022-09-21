import { Grid, Button, Typography, Box } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import BuddyReadApi from "../api/api";
import Like from "./Like";
import UserContext from "../auth/UserContext";

const Post = ({post, progress}) => {
    const {currentUser} = useContext(UserContext);
    const [liked, setLiked] = useState(post.liked);
    const [viewed, setViewed] = useState(post.viewed);
    // const [progress, setProgress] = useState();

    // useEffect(() => {
    //     async function getProgress() {
    //         let statRes = await BuddyReadApi.getBuddyReadStat(post.buddyreadId, currentUser.id);
    //         setProgress(statRes.progress)
    //     }
    //     getProgress()
    // }, [])


    const changeLike = async () => {
        await BuddyReadApi.updatePost(post.id, {liked: !liked})
        setLiked(!liked)
    }
    const changeViewed = async () => {
        await BuddyReadApi.updatePost(post.id, {viewed: true})
        setViewed(true)
    }

    return (
        <Box>
            {currentUser.id === post.userId || viewed ? 
                <Typography>
                    {post.user.firstName}'s Post for Page {post.page}: {post.message}
                    <Like changeLike={changeLike} liked={liked} post={post}/> 
                </Typography>
                :
                <Typography>
                    {post.user.firstName}'s Post for Page {post.page}:
                    {post.page <= progress.currentUserProgress ? 
                        <Button onClick={changeViewed}>Reveal Post</Button>
                    :
                        <Button disabled>Reveal Post</Button>
                    } 
                </Typography>
            }

            
        </Box>
    )
}

export default Post;