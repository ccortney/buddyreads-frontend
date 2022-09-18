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

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const handleClick = (book) => {
    setFormData(data => ({...data, bookId: book.id, bookTitle: book.title}));
    setExpanded(!expanded);
  }

  return (

    <Card sx={{ display: 'flex' }}>
      <ThemeProvider theme={theme}>
      <CardMedia
        component="img"
        sx={{width: 90, height: 135, p: 2}}
        image={book.image}
        alt={book.title}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="div" variant="h6" noWrap={true}>
          {book.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary"  noWrap={true}>
          By {book.authors}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {book.pageCount} pages  |  Published: {book.publishedDate}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          ISBN {book.isbn}
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