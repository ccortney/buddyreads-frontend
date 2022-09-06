import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect, useContext} from "react"
import { Grid, Button, Typography } from "@mui/material";
import GoogleBooksApi from "../api/bookApi";
import BuddyReadApi from "../api/api";
import UserContext from "../auth/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";

const BuddyReadDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {currentUser} = useContext(UserContext);

    const [infoLoaded, setInfoLoaded] = useState(false);
    const [buddyRead, setBuddyRead] = useState({})
    const [bookData, setBookData] = useState({});
    const [buddy, setBuddy] = useState({})
    const [showButton, setShowButton] = useState(true)

    console.debug(
        "BuddyReadDetails", 
        "bookData=", bookData, 
        "buddy=", buddy, 
        "buddyRead=", buddyRead
      )
    
    const fakeData = `<b>HELLO</b> <i>HI</i>`

    useEffect(() => {    
        async function getBuddyReadData() {
            try {
                let buddyReadRes = await BuddyReadApi.getBuddyRead(id);
                if (buddyReadRes.createdBy.id !== currentUser.id && buddyReadRes.buddy.id !== currentUser.id) {
                    navigate('/dashboard')
                }

                let bookRes = await GoogleBooksApi.getBook(buddyReadRes.bookId);

                setBookData(bookRes);
                setBuddyRead(buddyReadRes);
                setBuddy(buddyReadRes.buddy);
                if (buddyReadRes.status === 'completed') {
                    setShowButton(false)
                }
            } catch (err) {
                console.error("Error loading buddy read", err);
            }
            setInfoLoaded(true)
        }

        setInfoLoaded(false);
        getBuddyReadData();
    }, [id]);

    const handleClick = async (id,status) => {
        await BuddyReadApi.changeStatus(id, {status});
        buddyRead.status = 'completed';
        setShowButton(false);
    }

    if (!infoLoaded) return <LoadingSpinner/>

    return (
        <Grid
            container
            direction="row"
            justifyContent='center'
            alignItems='center'
            sx={{mt: 2}} 
            columnSpacing={2}
        >
            <Grid item>
                <img src={bookData.image.thumbnail} />
            </Grid>
            <Grid item >
                <Typography variant='h6' sx={{fontWeight: 'bold'}}>
                    {bookData.title}
                </Typography>
                <Typography sx={{fontWeight: 'bold'}}>
                    by {bookData.authors}
                </Typography>
                <Typography variant='subtitle1' sx={{fontWeight: 'light'}}>
                    {bookData.pageCount} pages  |  ISBN: {bookData.isbn}
                </Typography>
                <Typography variant='subtitle1' sx={{fontWeight: 'light'}}>
                    Published {bookData.publishedDate} by {bookData.publisher}
                </Typography>
                <Typography variant='subtitle1'>
                    Buddy: {buddy.firstName} {buddy.lastName}
                </Typography>
                {showButton === true ?
                    <Button color="success" 
                            size='small' 
                            variant="outlined"
                            onClick={() => handleClick(buddyRead.id, 'completed')}>
                        Complete Buddy Read
                    </Button> :
                    <Button color="success" 
                        size='small' 
                        variant="contained"
                        disabled>
                        Completed
                    </Button>
                }
            </Grid>
            <Grid container sx={{width: '75%', mt: 2}} variant='body2'>
                <div dangerouslySetInnerHTML={{__html: bookData.description}}/>
            </Grid> 
        </Grid>
    )
}

export default BuddyReadDetails;