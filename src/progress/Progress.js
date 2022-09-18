import { Grid, Button, Typography, Box, linearProgressClasses } from "@mui/material";
import {useContext, useState, useEffect} from "react"
import UserContext from "../auth/UserContext";
import ProgressForm from "./ProgressForm";
import BuddyReadApi from "../api/api";
import ErrorAlert from "../common/ErrorAlert";


const Progress = ({progress, setProgress, buddy, buddyRead, bookData}) => {
    const {currentUser} = useContext(UserContext);
    const [formData, setFormData] = useState({progress: ''});
    const [formErrors, setFormErrors] = useState([]);
    const [percents, setPercents] = useState({});

    useEffect(() => {
        setPercents({
            currentUser: Math.floor((progress.currentUserProgress/bookData.pageCount)*100),
            buddy: Math.floor((progress.buddyProgress/bookData.pageCount)*100),
        })
    }, [progress])

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
        } catch (errors) {
            setFormErrors(errors);
        }

        setFormData({progress: ''});
        if (progress.currentUserProgress === bookData.pageCount && progress.buddyProgress === bookData.pageCount) {
            await BuddyReadApi.changeStatus(buddyRead.id, {status: 'completed'});
        }
    }
    
    return (
        <div>
            {formErrors.length ? <ErrorAlert severity='error' messages={formErrors}/> : null } 
            <Box sx={{ border: 1}}>
                <Typography variant='subtitle1' sx={{fontWeight: 'light'}}>
                    Your Progress
                </Typography>
                <Typography variant='subtitle1' sx={{fontWeight: 'bold'}}>
                    Page: {progress.currentUserProgress} |  {percents.currentUser}%
                </Typography>
                <ProgressForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
            />
            </Box>
            <Box sx={{ border: 1}}>
                <Typography variant='subtitle1' sx={{fontWeight: 'light'}}>
                    {buddy.firstName}'s Progress
                </Typography>
                <Typography variant='subtitle1' sx={{fontWeight: 'bold'}}>
                Page: {progress.buddyProgress} |  {percents.buddy}%
                </Typography>
            </Box>
        </div> 
    )
}

export default Progress;