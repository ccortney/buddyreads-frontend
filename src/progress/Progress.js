import { Stack } from "@mui/material";
import {useContext, useState, useEffect } from "react"
import UserContext from "../auth/UserContext";
import ProgressForm from "./ProgressForm";
import BuddyReadApi from "../api/api";
import ProgressCard from "./ProgressCard";

/** Show Progress component. 
 * 
 * On mount, loads progress card component for each user. 
 * Renders ProgressForm for user to update progress
 *
 * It is rendered by BuddyReadDetails. 
 *
 * BuddyReadDetails -> {Progress} -> { ProgressCard, ProgressForm }
 */

const Progress = ({progress, setProgress, buddy, buddyRead, bookData, rating, setRating}) => {
    const {currentUser} = useContext(UserContext);
    const [formData, setFormData] = useState({progress: ''});
    const [formErrors, setFormErrors] = useState([]);
    const [percents, setPercents] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [ratingOpen, setRatingOpen] = useState(false);

    useEffect(() => {
        setPercents({
            currentUser: Math.floor((progress.currentUserProgress/bookData.pageCount)*100),
            buddy: Math.floor((progress.buddyProgress/bookData.pageCount)*100),
        })
        if (progress.currentUserProgress === bookData.pageCount) {
            setShowForm(false);
        }
    }, [progress, bookData.pageCount])

    const handleRatingOpen = () => {
        setRatingOpen(true);
    };
    
    const handleChange = (e) => {
        const {value} = e.target;
        setFormData({progress: value});
    };

    const handleSubmit = async (e) => {
        setFormErrors([]);
        e.preventDefault()
        if (+formData.progress < 0 || +formData.progress > bookData.pageCount) {
            setFormData({progress: ''});
            setFormErrors([`Page number must be between 0 and ${bookData.pageCount}`]);
            return;
        }
        if (isNaN(+formData.progress)) {
            setFormData({progress: ''});
            setFormErrors([`You must enter a number!`]);
            return;        
        }
        try {
            const newProgress = await BuddyReadApi.updateProgress(buddyRead.id, currentUser.id, +formData.progress);
            setProgress(data => ({...data, currentUserProgress: newProgress.progress}))
            setShowForm(false)
        } catch (errors) {
            setFormErrors(errors);
        }

        if (+formData.progress === bookData.pageCount) {
            handleRatingOpen();
            setShowForm(false);
        }
        if (+formData.progress === bookData.pageCount && progress.buddyProgress === bookData.pageCount) {
            await BuddyReadApi.changeStatus(buddyRead.id, {status: 'completed'});
        }
        setFormData({progress: ''});
    }

    return (
        <Stack direction={{xs: 'row', sm: "column"}} justifyContent="center">
            <ProgressCard
                user={currentUser}
                progress={progress.currentUserProgress}
                color="secondary.main"
                percent={percents.currentUser}
                isCurrentUser={true}
                setShowForm={setShowForm}
                rating={rating.currentUserRating}
                setRating={setRating}
                ratingOpen={ratingOpen}
                setRatingOpen={setRatingOpen}
                handleRatingOpen={handleRatingOpen}
                bookData={bookData}
                buddyRead={buddyRead}
            />
            <ProgressCard
                user={buddy}
                progress={progress.buddyProgress}
                color="primary.main"
                percent={percents.buddy}
                isCurrentUser={false}
                setShowForm={setShowForm}
                rating={rating.buddyRating}
                ratingOpen={ratingOpen}
                setRatingOpen={setRatingOpen}
                handleRatingOpen={handleRatingOpen}
                setRating={setRating}
                bookData={bookData}
                buddyRead={buddyRead}
            />
            <ProgressForm
                showForm={showForm}
                setShowForm={setShowForm}
                formData={formData}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </Stack>
    )
}

export default Progress;