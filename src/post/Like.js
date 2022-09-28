import { Checkbox, IconButton, Tooltip, } from "@mui/material";
import {  useContext, Fragment } from "react";
import { Favorite, FavoriteBorder, DeleteForever } from "@mui/icons-material";
import UserContext from "../auth/UserContext";

/** Show Like component
 *  
 * Like component is shown and disabled if buddy has liked their post.
 * Like component is shown if post is revealed
 *
 * It is rendered by Post 
 * 
 * {Post} -> { Like }
 */


const Like = ({post, changeLike, liked, deletePost}) => {
    const {currentUser} = useContext(UserContext)

        if (currentUser.id === post.userId && liked === true) {
            return (
                <Fragment>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => deletePost(post.id)}>
                            <DeleteForever/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Buddy Liked">
                        <IconButton>
                            <Checkbox
                                checked
                                disabled
                                checkedIcon={<Favorite sx={{ color: "grey" }} />}
                            />
                        </IconButton>
                    </Tooltip>
                </Fragment>
            )
        }
        if (currentUser.id === post.userId && liked === false) {
            return (
                <Tooltip title="Delete">
                    <IconButton onClick={() => deletePost(post.id)}>
                        <DeleteForever/>
                    </IconButton>
                </Tooltip>
            )
        }
 
        return (
            <Tooltip title="Like">
                <IconButton>
                    <Checkbox
                        checked = {liked}
                        onChange={changeLike}
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite sx={{ color: "error.main" }} />}
                    />
                </IconButton>
            </Tooltip>
        )
}

export default Like;