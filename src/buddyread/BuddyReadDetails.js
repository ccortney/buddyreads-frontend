import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect, useContext} from "react"
import { Grid, Button, Typography, Box, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GoogleBooksApi from "../api/bookApi";
import BuddyReadApi from "../api/api";
import UserContext from "../auth/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";
import Progress from "../progress/Progress";
import Posts from "../post/Posts";
import RatingDialog from "../rating/RatingDialog";
import Rating from '@mui/material/Rating';


/** BuddyRead Detail page.
 *
 * Renders information about buddy read and book details. 
 *
 * Routed at /buddyread/:id
 *
 * AppRoutes -> BuddyReadDetails
 */

const BuddyReadDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {currentUser} = useContext(UserContext);
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [buddyRead, setBuddyRead] = useState({});
    const [bookData, setBookData] = useState({});
    const [buddy, setBuddy] = useState({});
    const [showButton, setShowButton] = useState(true)
    const [progress, setProgress] = useState({});
    const [rating, setRating] = useState();
    const [ratingOpen, setRatingOpen] = useState(false);

    useEffect(() => {    
        async function getBuddyReadData() {
            try {
                let buddyReadRes = await BuddyReadApi.getBuddyRead(id);
                if (buddyReadRes.status === 'pending') {
                    navigate('/dashboard')
                }
                if (buddyReadRes.createdBy.id !== currentUser.id && buddyReadRes.buddy.id !== currentUser.id) {
                    navigate('/dashboard')
                }
                setBuddyRead(buddyReadRes);

                let buddyStats = await BuddyReadApi.getBuddyReadStat(id, buddyReadRes.buddy.id)
                let createdByStats = await BuddyReadApi.getBuddyReadStat(id, buddyReadRes.createdBy.id);

                if (currentUser.id === buddyReadRes.createdBy.id) {
                    setBuddy(buddyReadRes.buddy);
                    setProgress({currentUserProgress: createdByStats.progress, buddyProgress: buddyStats.progress});
                    setRating(createdByStats.rating)
                } else {
                    setBuddy(buddyReadRes.createdBy);
                    setProgress({buddyProgress: createdByStats.progress, currentUserProgress: buddyStats.progress})
                    setRating(buddyStats.rating)
                }

                let bookRes = await GoogleBooksApi.getBook(buddyReadRes.bookId);
                setBookData(bookRes);

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
    }, [id, currentUser.id, navigate]);

    const handleRatingOpen = () => {
        setRatingOpen(true);
    };
  
    if (!infoLoaded) return <LoadingSpinner/>

    return (
    <Box>  
        <Grid
            container
            direction="row"
            justifyContent='center'
            alignItems='center'
            sx={{mt: 2}} 
            columnSpacing={2}
        >
            <Grid item>
                <img src={bookData.image} alt={bookData.title}/>
            </Grid>
            <Grid item >
                <Typography variant='h6' sx={{fontWeight: 'bold'}}>
                    {bookData.title}
                </Typography>
                <Typography sx={{fontWeight: 'bold'}}>
                    by {bookData.authors}
                </Typography>
                <Typography variant='subtitle1'>
                    Buddy: {buddy.firstName} {buddy.lastName}
                </Typography>
                {rating ?
                    <Rating
                        name="read-only"
                        value={rating}
                        readOnly
                    />
                    : null
                }
                <RatingDialog 
                    bookData={bookData}
                    buddyRead={buddyRead}
                    ratingOpen={ratingOpen} 
                    setRatingOpen={setRatingOpen}
                    handleRatingOpen={handleRatingOpen} 
                    rating={rating}
                    setRating={setRating}
                    progress={progress}
                />
            </Grid>
            <Grid container sx={{width: '75%', mt: 2}} variant='body2'>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>Book Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography variant='subtitle1' sx={{fontWeight: 'light'}}>
                        {bookData.pageCount} pages  |  ISBN: {bookData.isbn}
                    </Typography>
                    <Typography variant='subtitle1' sx={{fontWeight: 'light'}}>
                        Published {bookData.publishedDate} by {bookData.publisher}
                    </Typography>
                    <div dangerouslySetInnerHTML={{__html: bookData.description}}/>
                    </AccordionDetails>
                </Accordion>
            </Grid> 
        </Grid>
        <Grid             
            container
            direction="row"
            justifyContent='center'
            alignItems='center'
            sx={{mt: 2}} 
            columnSpacing={2}>
            <Progress 
                progress={progress} 
                buddy={buddy} 
                buddyRead={buddyRead} 
                setProgress={setProgress}
                bookData={bookData}
                handleRatingOpen={handleRatingOpen}
            />
        </Grid>
        <Grid>
            <Posts
                bookData = {bookData}
                buddyRead = {buddyRead}
                progress={progress} 
            />
        </Grid>
    </Box>
    )
}

export default BuddyReadDetails;


