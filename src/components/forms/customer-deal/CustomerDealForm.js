import {Grid, TextField, Box, Button} from '@mui/material';
import {useState} from 'react';
const CustomerDealFrom = ({handleSaveForm}) =>{
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    
    const handleSaveDealForm = ()=>{
        handleSaveForm({
            firstname: firstname,
            lastname: lastname,
            email: email,
            contact: contactNumber
        })

    }
    return (
        <>
        <Grid container spacing={{ xs: 1,sm: 1, md: 1 }} sx={{px:5, mt:2}} >
            <Grid item xs={12} sm={12} md={6} sx={{mt:2}}>
                 <TextField id="firstname" label="Firstname" variant="outlined"
                   onChange={(event) => {
                    setFirstname(event.target.value);
                  }} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}  sx={{mt:2}}>
                  <TextField id="lastname" label="Lastname" variant="outlined"
                    onChange={(event) => {
                        setLastname(event.target.value);
                      }} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}  sx={{mt:2}}>
                  <TextField id="email" label="Email" variant="outlined" 
                    onChange={(event) => {
                        setEmail(event.target.value);
                      }}/>
            </Grid>
            <Grid item xs={12} sm={12} md={6}  sx={{mt:2}}>
                  <TextField id="contactNumber" label="Contact #" variant="outlined" 
                    onChange={(event) => {
                        setContactNumber(event.target.value);
                      }}/>
            </Grid>
        </Grid>
        <Box sx={{ width: '100%', mt:2}}>
            <Button 
            onClick={handleSaveDealForm}
            sx={{display:'block', width:'50%', margin: '2rem auto 0 auto'}} 
            disableElevation variant="contained" 
            color="warning">Save My Deal</Button>
        </Box>
        </>
    )
}
export default CustomerDealFrom;