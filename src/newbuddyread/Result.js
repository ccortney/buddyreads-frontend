import { useState} from "react";
import {createTheme, responsiveFontSizes } from '@mui/material/styles';
import {  Typography, Button, Box, Stack} from '@mui/material';
import BuddyReadForm from "./BuddyReadForm";

/** Show limited information about a book
 * 
 * Is rendered by SearchResults to show a "card" for each book.
 * When card is clicked, new buddy read form appears. 
 *
 * It is rendered by SearchResults 
 * 
 * {SearchResults} -> {Result} -> { BuddyReadForm }
 */


const Result = ({book, formData, setFormData, handleFormChange, handleFormSubmit}) => {
  
  
  const [showForm, setShowForm] = useState(false);

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const handleClick = (book) => {
    setFormData(data => ({...data, bookId: book.id, bookTitle: book.title}));
    setShowForm(!showForm)
  }

  return (
    <Box sx={{border: "solid darkgrey", borderRadius: 2, m: 1, p: 1, width: {xs: 300, sm: 500}, mx: 'auto'}} >
        <Stack direction="row" align="left">
            <Box>
              <img
                width='75'
                height='113'
                src={book.image}
                alt={book.title}
              />
            </Box>

            <Box sx={{pl: 1}}>
              <Typography>
                {book.title}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary"  noWrap={true}>
                By {book.authors}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {book.pageCount} pages
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                 Published: {book.publishedDate}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                ISBN {book.isbn}
              </Typography>
            </Box>
        </Stack>

      <Box >
        {showForm ?
          <BuddyReadForm
            formData={formData} 
            setShowForm={setShowForm}
            handleFormChange={handleFormChange}
            handleFormSubmit={handleFormSubmit} 
          />
        : 
          <Button onClick={() => handleClick(book)}>Start Buddy Read</Button>
        }
      </Box>
    </Box>
  );
}

export default Result;
