import {useState, useEffect, useContext} from "react"
import { Grid, Button, Typography, Box } from "@mui/material";
import NewPost from "./NewPost";
import BuddyReadApi from "../api/api";
import UserContext from "../auth/UserContext";
import PostList from "./PostList";

const Post = ({buddyRead, bookData, progress}) => {
    const {currentUser} = useContext(UserContext);

    const INITIAL_STATE = {
        page: "", 
        message: ""
    }

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
        }
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
            const newPost = await BuddyReadApi.createPost(postData);
            console.log(`new post: ${JSON.stringify(newPost)}`)
            setPosts(posts => ([...posts, newPost]))
        } catch (errors) {
            setFormErrors(errors);
        }
        setFormData(INITIAL_STATE)
    }
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
            />
        </Grid>
    )
}

export default Post;