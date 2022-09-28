import {useState, useEffect, useContext} from "react"
import { Grid } from "@mui/material";
import NewPost from "./NewPost";
import BuddyReadApi from "../api/api";
import UserContext from "../auth/UserContext";
import PostList from "./PostList";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show Posts component. 
 * 
 * On mount, loads new post component and post list component.
 *
 * It is rendered by BuddyReadDetails. 
 *
 * BuddyReadDetails -> {Posts} -> { NewPost, PostList, Post, Like }
 */

const Posts = ({buddyRead, bookData, progress}) => {
    const {currentUser} = useContext(UserContext);

    const INITIAL_STATE = {
        page: "", 
        message: ""
    }

    const [infoLoaded, setInfoLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);

    useEffect(() => {
        async function getPosts() {
            try {
                let postsRes = await BuddyReadApi.getPosts(buddyRead.id)
                setPosts(postsRes)
            }
            catch (err) {
                console.error("Error loading posts", err);
            }
            setInfoLoaded(true);
        }
        setInfoLoaded(false);
        getPosts()
    }, [buddyRead.id])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({...formData, [name]: value}));
    };

    const handleSubmit = async (e) => {
        setFormErrors([]);
        e.preventDefault()
        if (+formData.page < 0 || +formData.page > bookData.pageCount) {
            setFormData({page: '', message: formData.message});
            setFormErrors([`Page number must be between 0 and ${bookData.pageCount}`]);
            return;
        }
        if (isNaN(+formData.page)) {
            setFormData({page: '', message: formData.message});
            setFormErrors([`You must enter a number!`]);
            return;        
        }

        try {
            const postData = {buddyreadId: buddyRead.id, userId: currentUser.id, page: +formData.page, message: formData.message}
            await BuddyReadApi.createPost(postData);
            let postsRes = await BuddyReadApi.getPosts(buddyRead.id)
            setPosts(postsRes)
        } catch (errors) {
            setFormErrors(errors);
        }
        setFormData(INITIAL_STATE)

    }

    const deletePost = async (id) => {
        await BuddyReadApi.deletePost(id);
        setPosts(posts.filter(post => post.id !== id));

    }

    if (!infoLoaded) return <LoadingSpinner/>

    return (
        <Grid>
            <NewPost
                formData = {formData}
                formErrors = {formErrors}
                handleChange = {handleChange}
                handleSubmit = {handleSubmit}
            />
            <PostList
                posts = {posts}
                progress={progress}
                deletePost={deletePost}
            />
        </Grid>
    )
}

export default Posts;