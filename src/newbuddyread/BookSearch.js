import { Box, TextField, Button } from "@mui/material"

/** Book search component.
 *
 * Rendered by NewBuddyRead component
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `handleSearchSubmit` function prop that runs in 
 * NewBuddyRead component to do the searching.
 *
 *  Dashboard => {NewBuddyRead}  -> {BookSearch}
 */

const BookSearch = ({handleSearchChange, handleSearchSubmit, searchField}) => {
    return (
        <Box align='center' sx={{justifyContent:'center'}}>
            <form onSubmit={handleSearchSubmit}>
                <Box sx={{ display: 'flex', justifyContent:  'center' }}>
                    <TextField
                        label="Search for a Book"
                        id="searchField"
                        name="searchField"
                        value={searchField}
                        onChange = {handleSearchChange}
                        sx={{ m: 1, width: '25ch' }}
                    />
                    <Box sx={{display: 'flex', alignItems: 'center',  m: 1}}>
                        <Button variant="contained" type="submit">Search</Button>
                    </Box>
                </Box>
            </form>
        </Box>
    )
}

export default BookSearch;