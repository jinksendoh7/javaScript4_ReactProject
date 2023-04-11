import { Typography, Container, Button, Box } from "@mui/material";
import { IMAGE } from "../../assets/images/Images";
import { Link } from "react-router-dom";
import './ErrorComponent.scss'

const ErrorPage = () => {
  return (
    <>
      <Container
        className="errorContainer"
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 10, pb: 6 }}
      >
        <Typography gutterBottom>
          <img src={IMAGE.ERRIMAGE} alt="error logo" />
        </Typography>
        <Typography
          variant="h3"
          component="p"
          className="errpageStyle"
        >
          Oops! Lost your way?
        </Typography>
        <Typography
          variant="h6"
          component="p"
          className="errpageStyle"
        >
          Sorry we can't find that page. You'll find loads to explore in the
          homepage
        </Typography>
          <Button
            component={Link}
            to={"/"} //change to mainpage or dashboard
            variant="contained"
            size="large"
            className="btn"
          >
            Home
          </Button>
 
      </Container>
    </>
  );
};

export default ErrorPage;
