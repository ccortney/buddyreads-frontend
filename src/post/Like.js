import { Grid, Button, Typography, Box } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import UserContext from "../auth/UserContext";


const Like = ({post, changeLike, liked}) => {
    const {currentUser} = useContext(UserContext)

        if (currentUser.id === post.userId && liked === true) {
            return (
                <Button disabled onClick={changeLike}>
                    Liked
                </Button>
            )
        }
        if (currentUser.id === post.userId && liked === false) {
            return null
        }
        if (liked === true) {
            return (
                <Button variant="contained" onClick={changeLike}>
                    Liked
                </Button>
            )
        }
        if (liked === false) {
            return (
                <Button variant="outlined" onClick={changeLike}>
                    Like
                </Button>
            )
        }

    // return {determineLike()}
    // return <p>Liked</p>
}

export default Like;