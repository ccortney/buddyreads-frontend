import { Alert } from "@mui/material";

const ErrorAlert = ({severity = 'error', messages=[]}) => {

    return (
        <div>
            {messages.map(error => (
                <Alert severity={severity} key={error} sx={{m: 2}}>
                    {error}
                </Alert>
            ))}
        </div>


    )
}

export default ErrorAlert;