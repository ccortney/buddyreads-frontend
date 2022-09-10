import { Grid, Typography, Box, Chip, Stack, Paper, Modal, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import GoogleBooksApi from "../api/bookApi";
import "./Modal.css"

/** Show page with list pending buddy reads and buddy read invites
 *
 * It is rendered by Dashboard to show a list of pending buddy reads. 
 * 
 * When book title is clicked, book information is shown in a modal. 
 * 
 * Dashboard -> InviteList
 */


const InviteList = ({pendingBuddyReads, buddyReadInvites, updateStatus}) => {
    const [open, setOpen] = useState(false);
    const [books, setBooks] = useState([]);
    const [book, setBook] = useState({});

    useEffect(() => {    
        async function getBookData() {
        try {
            for (let book of pendingBuddyReads) {
                const res = await GoogleBooksApi.getBook(book.bookId);
                setBooks(books=> [...books, res])
            }  
            for (let book of buddyReadInvites) {
                const res = await GoogleBooksApi.getBook(book.bookId);
                setBooks(books=> [...books, res])
            }            
        } catch (err) {
            console.error("Error loading books", err);
        }
        }

        getBookData();
    }, []);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary
      }));

    const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4
    };
      
    const handleOpen = async (id) => {
        let index = books.findIndex((book) => book.id ===id);
        setBook(books[index])
        setOpen(true)
    }
    const handleClose = () => setOpen(false);

    return (
        <Grid align='center' sx={{m: 2}}>
            <Typography variant="h5" component='div' sx={{mb: 1}}>Buddy Read Invites</Typography>
            <Item spacing={1} sx={{ width: '75%' }}>
                <Stack>
                    {pendingBuddyReads.length === 0 && buddyReadInvites.length === 0 ?
                        <Typography sx={{ textTransform: 'uppercase',fontWeight: 'light' }} variant='body2'>
                            You have no invites.
                        </Typography> : 
                        pendingBuddyReads.map(br => (
                            <Typography sx={{ fontStyle: 'italic' }} variant='body2' key={br.id}>
                                Your buddy read with {br.buddy.firstName} for
                                        <Button 
                                            onClick={() => handleOpen(br.bookId)}
                                            // sx={{ color: 'black', fontWeight: 'bold'}}
                                            size='small'
                                        >{br.bookTitle}</Button>
                                is pending. 
                            </Typography>
                    ))}  
                </Stack>
                {buddyReadInvites.length === 0 ? null :  
                    <Stack>
                        {buddyReadInvites.map(br => (<Box sx={{my: 1}} key={br.id}>
                        <Typography sx={{ fontWeight: 'bold'}}>
                            {br.createdBy.firstName} is inviting you to buddy read 
                                <Button size ='small' 
                                        onClick={() => handleOpen(br.bookId)}
                                >
                                    {br.bookTitle}
                                </Button>.
                        </Typography>
                        <Chip label="Accept" color="success" size="small" sx={{mr: 1}} onClick={() => updateStatus(br.id, 'in-progress')}/>
                        <Chip label="Decline" color="error" size="small" sx={{ml: 1}} onClick={() => updateStatus(br.id, 'rejected')}/>
                        </Box>))}
                    </Stack>
                }
            </Item>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='modal-overlay'
                >
                <Box sx={style} className='modal-content'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {book.title}
                    </Typography>
                    <Typography id="modal-modal-title" variant="subtitle1">
                        {book.authors}  |  {book.pageCount} pages  |  ISBN {book.isbn}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} variant='subtitle2'>
                        <div dangerouslySetInnerHTML={{__html: book.description}}/>
                    </Typography>
                </Box>
            </Modal>

        </Grid>

        
    )
}

export default InviteList;

