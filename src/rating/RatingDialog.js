import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating} from '@mui/material';
import { useState, useContext } from 'react';
import UserContext from "../auth/UserContext";
import BuddyReadApi from '../api/api';

/** Show RatingDialog component. 
 * 
 * Is rendered by ProgressCard for users to update rating. 
 * RatingDialog can be rendered when user is at 100%
 *
 * {ProgressCard} -> { RatingDialog }
 */


const RatingDialog = ({bookData, buddyRead, ratingOpen, setRatingOpen, rating, setRating}) => {
    const {currentUser} = useContext(UserContext);
    const [ratingUpdated, setRatingUpdated] = useState(false)

    const handleRatingClose = async () => {
        setRatingOpen(false)
        if (ratingUpdated) {
            await BuddyReadApi.updateRating(buddyRead.id, currentUser.id, rating)
        }
    }

    return (
    <div>
      <Dialog open={ratingOpen} onClose={handleRatingClose} sx={{borderRadius: 3}}>
        <DialogTitle>You finished {bookData.title}!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            How would you rate this book?
          </DialogContentText>
          <Rating
              name="simple-controlled"
              value={rating}
              sx={{pt: 1}}
              onChange={(event, newRating) => {
                  setRating(ratings => ({...ratings, currentUserRating: newRating}));
                  setRatingUpdated(true);
              }}
              />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRatingClose}>Save Rating</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RatingDialog;