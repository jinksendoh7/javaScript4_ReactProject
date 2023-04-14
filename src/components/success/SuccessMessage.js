import { Alert, AlertTitle } from "@mui/material";

function SuccessMessage({ message }) {
    return (
        <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {message}
        </Alert>
    );
}
export default SuccessMessage