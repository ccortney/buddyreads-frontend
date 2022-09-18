import { Grid } from "@mui/material";
import Result from "./Result";
import ErrorAlert from "../common/ErrorAlert";

/** Shows list of books. 
 *
 * Re-loads book results on submit from search form.
 *
 * This is routed to at /buddyreads/new
 *
 * NewBuddyRead -> BookSearch -> SearchResults -> { Result, ErrorAlert }
 */


const SearchResults = ({books, setFormData, formData, handleFormChange, handleFormSubmit}) => {
    return (
        <Grid container spacing={2} sx={{pl: 2, pr: 2}}>
            {books ? books.map(book => (
            <Grid item xs={12} md={6} key={book.id}>
                <Result 
                    book={book} 
                    formData={formData} 
                    setFormData={setFormData}
                    handleFormChange={handleFormChange}
                    handleFormSubmit={handleFormSubmit} 
                />
            </Grid>
            )) : <ErrorAlert severity='error' messages={["No Books Found"]}/> 
        } 
        </Grid>
    )
}

export default SearchResults;