import { Button, Typography, Card, CardContent } from "@mui/material";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import RatingDialog from "../rating/RatingDialog";
import Rating from '@mui/material/Rating';
import { StarBorderOutlined, StarOutlined } from "@mui/icons-material";

/** Show ProgressCard component. 
 * 
 * Is rendered by Progress to show a "card" for each user.
 * Each card renders Rating component from Material UI and
 * RatingDialog when progress is 100%
 *
 * {Progress} -> {ProgressCard} -> { RatingDialog }
 */

const ProgressCard = ({user, progress, color, percent, setShowForm, isCurrentUser, rating, setRating, ratingOpen, setRatingOpen, handleRatingOpen, buddyRead, bookData}) => {
    
    return (
        <Card 
            sx={{
                bgcolor: color, 
                m: 2, 
                mt: 0,
                borderRadius: '0.7rem',
                color: 'white', 
                width: '126px' 
            }}>  
            <CardContent>
                <Typography>
                    {user.firstName}
                </Typography>
                <Typography variant="subtitle2" sx={{fontWeight: 'light'}}>
                    on Page {progress}
                </Typography>
            </CardContent> 

            <CardContent sx={{width: '5rem', pt: 0}}>
                <CircularProgressbar 
                value={percent} 
                text={`${percent}%`}
                styles={{
                    width: '4rem',
                    path: {stroke: "white", strokeWidth: '5px', filter: 'drop-shadow(1px 1px 1px white)'}, 
                    trail: {display: 'none'}, 
                    text: {fill: 'white'}
                }}
                />
            </CardContent>
            {isCurrentUser && percent!== 100 ? 
                <Button 
                    sx={{p: 1, color: 'white', size: 'small'}}
                    onClick = {() => setShowForm(true)}
                >
                    Update
                </Button>
                : null
            }
            {rating ?
                <Rating
                    name="read-only"
                    value={rating}
                    readOnly
                    icon={<StarOutlined fontSize="inherit" color="inherit"/>}
                    emptyIcon={<StarBorderOutlined fontSize="inherit" sx={{color: 'white'}}/>}
                />
                : null
            }
            {isCurrentUser && progress === bookData.pageCount ?
                <Button onClick={handleRatingOpen} sx={{color: "white", display: 'block'}}>
                    Update Rating
                </Button> 
            : null
            }
            {isCurrentUser ? 
                <RatingDialog 
                    bookData={bookData}
                    buddyRead={buddyRead}
                    ratingOpen={ratingOpen} 
                    setRatingOpen={setRatingOpen}
                    handleRatingOpen={handleRatingOpen} 
                    rating={rating}
                    setRating={setRating}
                />
            : null
            }
        </Card>
    )
}

export default ProgressCard;