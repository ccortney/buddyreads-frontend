import { Modal, Box, Typography } from "@mui/material";

/** Modal component for showing book information.
 *
 * { InviteList, BuddyReadDetails } -> BookModal
 **/

const BookModal = ({open, handleClose, bookData}) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'white',
        p: 4, 
        width: '60%', 
        height: '300px',
        borderRadius: 3, 
        overflow: "hidden",
        overflowY: "scroll",
    };
      
    return(
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='modal-overlay'
            >
            <Box sx={style} className='modal-content'>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {bookData?.title}
                </Typography>
                <Typography id="modal-modal-title" variant="subtitle1">
                    {bookData?.authors}  |  {bookData?.pageCount} pages  |  ISBN {bookData?.isbn}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} variant='subtitle2'>
                    <div dangerouslySetInnerHTML={{__html: bookData?.description}}/>
                </Typography>
            </Box>
        </Modal>  
    )
}

export default BookModal;
