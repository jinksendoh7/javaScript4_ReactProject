import { Alert, AlertTitle } from "@mui/material";

function ErrorMessage({ message }) {
    return (
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {message}
        </Alert>
    );
}
export default ErrorMessage