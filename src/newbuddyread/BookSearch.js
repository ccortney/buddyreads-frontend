import { Grid, Box, TextField, Button } from "@mui/material"

/** Book search widget.
 *
 * Appears on NewBuddyRead component
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `handleSearchSubmit` function prop that runs in a parent to do the
 * searching.
 *
 *  NewBuddyRead  -> BookSearch
 */

const BookSearch = ({handleSearchChange, handleSearchSubmit, searchField}) => {
    return (
        <Grid container align='center' sx={{justifyContent:'center'}}>
        
            <form onSubmit={handleSearchSubmit}>
                <Box sx={{ display: 'flex', justifyContent:  'center' }}>
                    <TextField
                        label="Book Title"
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
        </Grid>
    )
}

export default BookSearch;