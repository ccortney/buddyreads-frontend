import { Button, Avatar, Typography, Card, CardHeader, CardContent, CardActions } from "@mui/material";
import { useState, useContext, Fragment } from "react";
import BuddyReadApi from "../api/api";
import Like from "./Like";
import UserContext from "../auth/UserContext";

/** Show Post component
 * 
 * Is rendered by PostList to show a "card" for each post.
 * 
 * Posts by user is always shown, along with delete button and 
 * a disabled Like component if buddy liked their post. 
 * 
 * Posts by buddy is shown if viewed. If not, it will show a button to
 * reveal post if user progress is greater than or equal to post page. 
 * 
 * {PostList} -> {Post} -> { Like }
 */


const Post = ({post, progress, deletePost}) => {
    const {currentUser} = useContext(UserContext);
    const [liked, setLiked] = useState(post.liked);
    const [viewed, setViewed] = useState(post.viewed);

    const determineColor = () => {
        if (currentUser.id === post.userId) {
            return "secondary.main"
        } else {
            return "primary.main"
        }
    }

    const changeLike = async () => {
        await BuddyReadApi.updatePost(post.id, {liked: !liked})
        setLiked(!liked)
    }
    const changeViewed = async () => {
        await BuddyReadApi.updatePost(post.id, {viewed: true})
        setViewed(true)
    }

    return (
        <Fragment>
            {currentUser.id === post.userId || viewed ? 
                <Card sx={{my: 2}}>
                    <CardHeader
                            avatar={
                            <Avatar sx={{ bgcolor: determineColor() }} aria-label={`post ${post.id}`}>
                                {post.user.firstName[0]}
                            </Avatar>
                            }
                            action={
                                <Like changeLike={changeLike} liked={liked} post={post} deletePost={deletePost}/>
                            }
                            title={`${post.user.firstName} ${post.user.lastName}`}
                            subheader={`Page ${post.page}`}
                        />
                    <CardContent sx={{pt: 0, flex: 1, flexWrap: 'wrap'}}>
                        <Typography variant="body2" color="text.secondary" >
                            {post.message}
                        </Typography>
                    </CardContent>
                </Card>
            : 
                <Card sx={{my: 2}}>
                    <CardHeader
                        avatar={
                        <Avatar sx={{ bgcolor: determineColor() }} aria-label={`post ${post.id}`}>
                            {post.user.firstName[0]}
                        </Avatar>
                        }
                        title={`${post.user.firstName} ${post.user.lastName}`}
                        subheader={`Page ${post.page}`}
                        sx={{pb: 0}}
                    />
                    <CardActions sx={{justifyContent: 'center'}}>
                        {post.page <= progress.currentUserProgress ? 
                            <Button onClick={changeViewed} sx={{color: "secondary.main"}}>Reveal Post</Button>
                            :
                            <Button disabled>Reveal Post</Button>
                        } 
                    </CardActions>
                </Card>
            }
        </Fragment>
    )
}

export default Post;