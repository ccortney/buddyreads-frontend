import { Box, Stack } from "@mui/material";
import Result from "./Result";
import ErrorAlert from "../common/ErrorAlert";

/** Shows list of books from book search. 
 *
 * Re-loads Result component for each result on submit from search form.
 * 
 * Rendered by NewBuddyRead component 
 *
 * NewBuddyRead -> {SearchResults} -> { Result, ErrorAlert }
 */

const SearchResults = ({books, setFormData, formData, handleFormChange, handleFormSubmit}) => {
    return (
        <Box >
            <Stack direction="column">
                {books ? books.map(book => (
                    <Result 
                        key={book.id} 
                        book={book} 
                        formData={formData} 
                        setFormData={setFormData}
                        handleFormChange={handleFormChange}
                        handleFormSubmit={handleFormSubmit} 
                    />
                    )) : <ErrorAlert severity='error' messages={["No Books Found"]}/> 
                } 
            </Stack>
        </Box>
    )
}

export default SearchResults;