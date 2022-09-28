import { Box, List, ListItem, ListItemAvatar, Button, ListItemText, Typography, Divider } from "@mui/material";
import {Fragment, useState, useEffect, useContext} from 'react';
import { Check, Close } from "@mui/icons-material";
import GoogleBooksApi from "../api/bookApi";
import BuddyReadApi from "../api/api";
import UserContext from "../auth/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";
import BookModal from "../bookmodal/BookModal";

/** Show component with list pending buddy reads and buddy read invites
 *
 * It is rendered by Dashboard to show a list of pending buddy reads. 
 * 
 * When book title image is clicked, book information is shown in a BookModal component. 
 * 
 * Dashboard -> { InviteList } -> BookModal
 */

const InviteList = ({setCurrentBuddyReads}) => {
    const {currentUser} = useContext(UserContext);

    const [infoLoaded, setInfoLoaded] = useState(false);
    const [pendingBuddyReads, setPendingBuddyReads] = useState([]);
    const [buddyReadInvites, setBuddyReadInvites] = useState([]);
    const [book, setBook] = useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {    
        async function getBookData() {
        try {
            let invites = await BuddyReadApi.getInvites(currentUser.id);
            invites = invites.filter(br => br.status === 'pending');
            for (let book of invites) {
                const res = await GoogleBooksApi.getBook(book.bookId);
                setBuddyReadInvites(books=> [...books, {...book, bookData: res}])
            }       
            
            let buddyReads = await BuddyReadApi.getBuddyReads(currentUser.id);
            buddyReads = buddyReads.filter(br => br.status === 'pending');
            for (let book of buddyReads) {
                const res = await GoogleBooksApi.getBook(book.bookId);
                setPendingBuddyReads(books=> [...books, {...book, bookData: res}])
            }   
        } catch (err) {
            console.error("Error loading books", err);
        }
        setInfoLoaded(true)
        }

        setInfoLoaded(false);
        setPendingBuddyReads([]);
        setBuddyReadInvites([]);
        getBookData();
    }, []);

    const handleOpen = async (id, type) => {
        if (type === 'invites') {
            let index = buddyReadInvites.findIndex((book) => book.id ===id);
            setBook(buddyReadInvites[index])
        } 
        if (type === 'pending') {
            let index = pendingBuddyReads.findIndex((book) => book.id ===id);
            setBook(pendingBuddyReads[index])
        }
        setOpen(true)
    }

    const handleClose = () => setOpen(false);

    const updateStatus = async (id, status) => {
        await BuddyReadApi.changeStatus(id, {status});
        if (status === 'rejected') {
            setBuddyReadInvites(buddyReadInvites.filter(invite => invite.id !== id));
        } 
        if (status === 'in-progress') {
            setBuddyReadInvites(buddyReadInvites.filter(invite => invite.id !== id));
            setCurrentBuddyReads(books => ([...books, buddyReadInvites.filter(invite => invite.id === id)[0]]));
            const buddyRead = await BuddyReadApi.getBuddyRead(id);
            BuddyReadApi.createBuddyReadStat({buddyreadId: buddyRead.id, userId: buddyRead.createdBy.id, progress: 0})
            BuddyReadApi.createBuddyReadStat({buddyreadId: buddyRead.id, userId: buddyRead.buddy.id, progress: 0})
        } 
    }

    if (!infoLoaded) return <LoadingSpinner/>

    return (
        <Box>
            <Typography variant="h5" component='div' sx={{pt: {sm: 3}}}>Buddy Read Invites</Typography>
            {buddyReadInvites.length === 0 ? 
                <Typography sx={{ textTransform: 'uppercase',fontWeight: 'light' }} variant='body2'>
                    You have no invites.
                </Typography>  
             :  
                <List sx={{ 
                        minWidth: 200, 
                        maxWidth: 500
                        }}>
                    {buddyReadInvites.map(br => (
                        <Fragment key={br.id}>
                            <ListItem alignItems="flex-start" >
                                <ListItemAvatar 
                                    onClick={()=> handleOpen(br.id, 'invites')} 
                                    sx={{minWidth: 80, mb: 1, cursor: 'pointer'}}>
                                        <img 
                                            src={br.bookData.image}
                                            style={{width: 75, height: 112.5}}
                                            alt={br.bookTitle}
                                        />
                                </ListItemAvatar>
                                <ListItemText
                                    disableTypography
                                    sx={{ml: 1}}
                                    primary={br.bookData.title}
                                    secondary={
                                        <Fragment>
                                            <Typography
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                by {br.bookData.authors}
                                            </Typography>
                                            <Typography
                                                variant="overline"
                                                display="block"
                                                color="text.primary"
                                            >
                                                Invite from {br.createdBy.firstName} {br.createdBy.lastName[0]}.
                                            </Typography>
                                                <Button 
                                                    sx={{size:'small', color: 'green', p: 0, display: 'flex', justifyContent: 'right'}}
                                                    onClick={() => updateStatus(br.id, 'in-progress')}
                                                >
                                                    {<Check/>} Accept
                                                </Button>
                                                <Button 
                                                    sx={{size:'small', color: 'red', p: 0, display: 'flex', justifyContent: 'right'}}
                                                    onClick={() => updateStatus(br.id, 'rejected')}
                                                >
                                                    {<Close/>} Decline
                                                </Button>
                                        </Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider />
                        </Fragment>
                    ))}
                </List>
            }
            <Typography variant="h5" component='div' sx={{pt: 3}}>Pending Buddy Reads</Typography>
            {pendingBuddyReads.length === 0 ? 
                <Typography sx={{ textTransform: 'uppercase',fontWeight: 'light' }} variant='body2'>
                    You have no pending buddy reads.
                </Typography>  
             :  
                <List sx={{ 
                        minWidth: 200, 
                        maxWidth: 500
                        }}>
                    {pendingBuddyReads.map(br => (
                        <Fragment key={br.id}>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    disableTypography
                                    sx={{ml: 1}}
                                    primary={br.bookData.title}
                                    secondary={
                                        <Fragment>
                                            <Typography
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                by {br.bookData.authors}
                                            </Typography>
                                            <Typography
                                                variant="overline"
                                                display="block"
                                                color="text.primary"
                                            >
                                                Awaiting response from {br.buddy.firstName} {br.buddy.lastName[0]}.
                                            </Typography>
                                        </Fragment>
                                    }
                                />
                                <ListItemAvatar 
                                    onClick={()=> handleOpen(br.id, 'pending')} 
                                    sx={{minWidth: 80, mb: 1, cursor: 'pointer'}}>
                                        <img 
                                            src={br.bookData.image}
                                            style={{width: 75, height: 112.5}}
                                            alt={br.bookTitle}
                                        />
                                </ListItemAvatar>
                            </ListItem>
                            <Divider />
                        </Fragment>
                    ))}
                </List>
            }
            <BookModal
                open={open}
                handleClose={handleClose}
                bookData={book.bookData}
            />
        </Box>
      );
}

export default InviteList;


