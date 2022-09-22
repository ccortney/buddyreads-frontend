import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useContext } from 'react';
import UserContext from "../auth/UserContext";
import Rating from '@mui/material/Rating';
import BuddyReadApi from '../api/api';

const RatingDialog = ({bookData, buddyRead, progress, ratingOpen, setRatingOpen, handleRatingOpen, rating, setRating}) => {
    const {currentUser} = useContext(UserContext);
    const [ratingUpdated, setRatingUpdated] = useState(false)

    const handleRatingSkip = () => {
        setRating(rating)
        setRatingOpen(false)
    }

    const handleRatingClose = async () => {
        setRatingOpen(false)
        if (ratingUpdated) {
            await BuddyReadApi.updateRating(buddyRead.id, currentUser.id, rating)
        }
    }


    return (
    <div>
        {progress.currentUserProgress === bookData.pageCount ?
        <Button onClick={handleRatingOpen}>
            Update Rating
        </Button> 
      : null
        }
       
      <Dialog open={ratingOpen} onClose={handleRatingClose}>
        <DialogTitle>You finished {bookData.title}!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newRating) => {
                setRating(newRating);
                setRatingUpdated(true);
            }}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRatingSkip}>Skip for Now</Button>
          <Button onClick={handleRatingClose}>Save Rating</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RatingDialog;