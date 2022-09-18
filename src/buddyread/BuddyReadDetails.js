import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect, useContext} from "react"
import { Grid, Button, Typography, Box, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import GoogleBooksApi from "../api/bookApi";
import BuddyReadApi from "../api/api";
import UserContext from "../auth/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";
import Progress from "../progress/Progress";

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
    const [showButton, setShowButton] = useState(true);
    const [buddy, setBuddy] = useState({});
    const [progress, setProgress] = useState({});

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
                    setProgress({currentUserProgress: createdByStats.progress, buddyProgress: buddyStats.progress})

                } else {
                    setBuddy(buddyReadRes.createdBy);
                    setProgress({buddyProgress: createdByStats.progress, currentUserProgress: buddyStats.progress})
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

    const handleClick = async (id,status) => {
        await BuddyReadApi.changeStatus(id, {status});
        buddyRead.status = 'completed';
        setShowButton(false);
    }

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
                {/* {showButton === true ?
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
                } */}
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
            {/* <Grid container sx={{width: '75%', mt: 2}} variant='body2'>
                <div dangerouslySetInnerHTML={{__html: bookData.description}}/>
            </Grid>  */}
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
            />
        </Grid>
    </Box>
    )
}

export default BuddyReadDetails;