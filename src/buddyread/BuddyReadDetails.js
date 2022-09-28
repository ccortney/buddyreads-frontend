import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect, useContext} from "react"
import { Typography, Box,  Button, Stack } from "@mui/material";
import GoogleBooksApi from "../api/bookApi";
import BuddyReadApi from "../api/api";
import UserContext from "../auth/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";
import Progress from "../progress/Progress";
import Posts from "../post/Posts";
import BookModal from "../bookmodal/BookModal";

/** BuddyRead Detail page.
 *
 * Renders information about buddy read and book details. 
 *
 * Routed at /buddyreads/:id
 *
 * AppRoutes -> BuddyReadDetails -> BookModal
 */

const BuddyReadDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {currentUser} = useContext(UserContext);
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [buddyRead, setBuddyRead] = useState({});
    const [bookData, setBookData] = useState({});
    const [buddy, setBuddy] = useState({});
    const [progress, setProgress] = useState({});
    const [rating, setRating] = useState({});
    const [bookInfoOpen, setBookInfoOpen] = useState(false);

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
                    setRating({currentUserRating: createdByStats.rating, buddyRating: buddyStats.rating})
                } else {
                    setBuddy(buddyReadRes.createdBy);
                    setProgress({buddyProgress: createdByStats.progress, currentUserProgress: buddyStats.progress})
                    setRating({currentUserRating: buddyStats.rating, buddyRating: createdByStats.rating})

                }

                let bookRes = await GoogleBooksApi.getBook(buddyReadRes.bookId);
                setBookData(bookRes);

            } catch (err) {
                console.error("Error loading buddy read", err);
                navigate('/dashboard')
            }
            setInfoLoaded(true)
        }
        setInfoLoaded(false);
        getBuddyReadData();
    }, [id, currentUser.id, navigate]);

    const handleBookInfoClose = () => setBookInfoOpen(false);
  
    if (!infoLoaded) return <LoadingSpinner/>

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{pt: 2, pb: {xs: 0, sm: 2}}}>
                <Typography align="center" sx={{fontSize: {xs: '0.7rem', sm: '1.3rem'}}}>
                    Buddy Read for {bookData.title}
                </Typography>
            </Box>

            <Stack direction={{xs: "column", sm: "row"}} sx={{mx: 2}}>

                <Box align="center">
                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        <img 
                            src={bookData.image} 
                            alt={bookData.title}     
                        />
                    </Box>
                    <Button 
                        sx={{size: 'small', color: "darkgrey", display: 'block'}}
                        onClick={() => setBookInfoOpen(true)}
                    >
                        About Book
                    </Button>
                    <Box>
                        <Progress 
                            progress={progress} 
                            buddy={buddy} 
                            bookData={bookData}
                            buddyRead={buddyRead}
                            setProgress={setProgress}
                            rating={rating}
                            setRating={setRating}
                        />
                    </Box>
                </Box>

                <Box flex={1}>
                    <Posts
                    bookData = {bookData}
                    buddyRead = {buddyRead}
                    progress={progress} 
                    />
                </Box>

            </Stack> 

            <BookModal
                open={bookInfoOpen}
                handleClose={handleBookInfoClose}
                bookData={bookData}
            />
        </Box>
    )
}

export default BuddyReadDetails;




