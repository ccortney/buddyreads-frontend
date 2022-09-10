import { useEffect, useState } from "react";
import {createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import {  Typography, 
          Button, 
          Box, 
          Card, 
          CardContent, 
          CardMedia, 
          CardActions, 
          Collapse } from '@mui/material';
import BuddyReadForm from "./BuddyReadForm";
import defaultImage from "../bookcovernotfound.png"; 

/** Show limited information about a book
 * 
 * Is rendered by SearchResults to show a "card" for each book.
 * When card is clicked, new buddy read form appears. 
 *
 * Routed as /buddyreads/new
 * SearchResults -> Result -> { BuddyReadForm }
 */


const Result = ({book, formData, setFormData, handleFormChange, handleFormSubmit}) => {
  
  const [expanded, setExpanded] = useState(false);
  const [cleanedData, setCleanedData] = useState({
      id: book.id,
      title: book.volumeInfo.title, 
      authors: 'unknown', 
      publishedDate: 'unknown', 
      pageCount: null,
      image: defaultImage
  })

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const handleClick = (book) => {
    setFormData(data => ({...data, bookId: book.id, bookTitle: book.volumeInfo.title}));
    setExpanded(!expanded);
}

  useEffect(() => {
    if (book.volumeInfo.hasOwnProperty('authors')) {
      setCleanedData(data => ({...data, authors: book.volumeInfo.authors.join(', ')}))
    }
    if (book.volumeInfo.hasOwnProperty('publishedDate')) {
      setCleanedData(data => ({...data, publishedDate: book.volumeInfo.publishedDate}))
    }
    if (book.volumeInfo.hasOwnProperty('pageCount')) {
      setCleanedData(data => ({...data, pageCount: book.volumeInfo.pageCount}))
    }
    if (book.volumeInfo.hasOwnProperty('imageLinks')) {
      setCleanedData(data => ({...data, image: book.volumeInfo.imageLinks.thumbnail}))
    }
    if (book.volumeInfo.hasOwnProperty('industryIdentifiers')) {
      setCleanedData(data => ({...data, isbn: book.volumeInfo.industryIdentifiers[0].identifier}))
    }
  }, [])


  return (

    <Card sx={{ display: 'flex' }}>
      <ThemeProvider theme={theme}>
      <CardMedia
        component="img"
        sx={{width: 90, height: 135, p: 2}}
        image={cleanedData.image}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="div" variant="h6" noWrap={true}>
          {cleanedData.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary"  noWrap={true}>
          By {cleanedData.authors}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {cleanedData.pageCount} pages  |  Published: {cleanedData.publishedDate}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          ISBN {cleanedData.isbn}
        </Typography>

      </CardContent>
      <CardActions disableSpacing>
        <Button 
          variant='contained' 
          onClick={() => handleClick(book)}
        >
          Start Buddy Read
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <BuddyReadForm
            formData={formData} 
            handleFormChange={handleFormChange}
            handleFormSubmit={handleFormSubmit} 
            book={book}
          />
        </CardContent>
      </Collapse>
      </Box>
      </ThemeProvider>
    </Card>
  );
}

export default Result;