import { useState, useContext } from "react";
import { Typography } from "@mui/material"
import GoogleBooksApi from "../api/bookApi";
import BuddyReadApi from "../api/api";
import SearchResults from "./SearchResults";
import BookSearch from "./BookSearch";
import ErrorAlert from "../common/ErrorAlert";
import UserContext from "../auth/UserContext";

/** Show page with book search and search results. 
 *
 * When a search result is clicked, a form is shown for users
 * to enter buddy's email.  
 * Submitting the form calls the API to create new buddy read.
 *
 * Confirmation of a successful save is normally a simple <ErrorAlert>
 *
 * This is routed to at /buddyreads/new
 *
 * AppRoutes -> NewBuddyRead -> { BookSearch, SearchResults, ErrorAlert }
 */

const NewBuddyRead = () => {
    const { currentUser } = useContext(UserContext);

    const INITIAL_STATE = {
        bookId: '',
        bookTitle: '',
        createdBy: currentUser.id, 
        buddy: '',
        status: 'pending'
    }

    const [searchField, setSearchField] = useState('');

    const [books, setBooks] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);
    const [createSuccess, setCreateSuccess] = useState(false);

    const handleSearchChange = (e) => {
        setSearchField(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setCreateSuccess(false);
        setFormErrors([])
        try {
            let res = await GoogleBooksApi.bookSearch(searchField);
            if (res.totalItems === 0) {
                setFormErrors(["No Books Found"])
                setBooks([])
            }
            else setBooks([...res.items]);
        } catch (errors) {
            setFormErrors(errors);
            return;
        }
        setSearchField("");
        setShowResults(true);
    }

    const handleFormChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({...formData, [name]: value}));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const user = await BuddyReadApi.getUserbyEmail(formData.buddy);
            await BuddyReadApi.createBuddyRead({...formData, buddy: user.id})
        } catch (errors) {
            setFormErrors(errors);
            return;
        }

        setShowResults(false);
        setFormErrors([]);
        setFormData(INITIAL_STATE);
        setCreateSuccess(true);
    }


    return (
        <div>
            <Typography gutterBottom variant="h5" component="div" sx={{pt: 3}} align="center">
                    Start a New Buddy Read
            </Typography>

            {createSuccess ? <ErrorAlert severity='success' messages={["Your Buddy Read invite was sent!"]}/> : null } 
            {formErrors.length ? <ErrorAlert severity='error' messages={formErrors}/> : null } 

           <BookSearch     
                handleSearchChange={handleSearchChange} 
                handleSearchSubmit={handleSearchSubmit}
                searchField={searchField}
            />
            {showResults ? 
                <SearchResults  
                    books={books} 
                    setFormData={setFormData} 
                    formData={formData} 
                    handleFormChange={handleFormChange}
                    handleFormSubmit={handleFormSubmit} 
                    setShowResults={setShowResults}
                /> : null}
        </div>

    )
}

export default NewBuddyRead;