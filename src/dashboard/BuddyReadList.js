import { OpenInNew } from "@mui/icons-material";
import { Box, List, ListItem, ListItemAvatar, Button, ListItemText, Typography, Divider } from "@mui/material";
import {Fragment, useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import GoogleBooksApi from "../api/bookApi";
import UserContext from "../auth/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show component with list buddy reads (current or completed)
 *
 * It is rendered by Dashboard to show a list of buddy reads. 
 * 
 * When buddy read is clicked, book information is shown on a new page (/buddyread/:id)
 * 
 * Dashboard -> { BuddyReadList }
 */


const BuddyReadList = ({buddyReadList, type}) => {
    const {currentUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [infoLoaded, setInfoLoaded] = useState(false);

    useEffect(() => {    
        async function getBookData() {
        try {
            for (let book of buddyReadList) {
                const res = await GoogleBooksApi.getBook(book.bookId);
                setBooks(books=> [...books, {...book, bookData: res}])
            }   
        } catch (err) {
            console.error("Error loading books", err);
        }
        setInfoLoaded(true)
        }

        setInfoLoaded(false);
        setBooks([]);
        getBookData();
    }, []);

    const findBuddy = (br) => {
        if (br.createdBy.id === currentUser.id) {
            const buddy = `${br.buddy.firstName} ${br.buddy.lastName[0]}.`
            return buddy
        }
        else {
            const buddy = `${br.createdBy.firstName} ${br.createdBy.lastName[0]}.`
            return buddy    
        }
    }

    const handleClick = (id) => {
        navigate(`/buddyreads/${id}`)
    }

    if (!infoLoaded) return <LoadingSpinner/>

    return (
        <Box>
            <Typography variant="h5" component='div' sx={{pt: {sm: 3}}}>{type} Buddy Reads</Typography>
            {books.length === 0 ? 
                <Typography sx={{ textTransform: 'uppercase',fontWeight: 'light' }} variant='body2'>
                    You have no {type} buddy reads.
                </Typography>  
             :  
                <List sx={{ 
                        minWidth: 200, 
                        maxWidth: 500
                        }}>
                    {books.map(br => (
                        <Fragment key={br.id}>
                            <ListItem alignItems="flex-start" >
                                <ListItemAvatar 
                                    sx={{minWidth: 80, mb: 1}}>
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
                                                Buddy Read with {findBuddy(br)}
                                            </Typography>
                                                <Button 
                                                    sx={{size:'small', color: 'primary.main', p: 0, display: 'flex'}}
                                                    onClick={() => handleClick(br.id)}
                                                >
                                                    {<OpenInNew/>} Go to Buddy Read Details
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
        </Box>
    )
}

export default BuddyReadList;