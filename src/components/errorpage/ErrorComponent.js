import { Typography, Container, Button, Box } from "@mui/material";
import { IMAGE } from "../../assets/images/Images";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <Container
        disableGutters
        maxWidth="md"
        component="main"
        sx={{ pt: 10, pb: 6 }}
      >
        <Typography align="center" gutterBottom>
          <img src={IMAGE.ERRIMAGE} alt="error logo" />
        </Typography>
        <Typography
          variant="h2"
          align="center"
          color="text.secondary"
          component="p"
        >
          Oops! Lost your way?
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Sorry we can't find that page. You'll find loads to explore in the
          homepage
        </Typography>

        <Box textAlign="center">
          <Button
            component={Link}
            to={"/"} //change to mainpage or dashboard
            style={{
              borderRadius: 35,
              backgroundColor: "#000738",
              padding: "18px 36px",
              marginTop: "15px",
              fontSize: "18px",
            }}
            variant="contained"
            size="large"
          >
            Home
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ErrorPage;
