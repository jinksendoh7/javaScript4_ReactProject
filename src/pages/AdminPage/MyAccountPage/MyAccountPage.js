import {Grid, Container, TextField, Box, Button, FormControlLabel, Checkbox} from '@mui/material'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import {
    onAuthStateChanged,

   } from 'firebase/auth';
import {auth} from '../../../configs/firebase'
import { RoutesConst, AppNumberConst, FireStoreConst } from '../../../constants/AppConstants';
import * as database from '../../../database';
import SnackbarElement from '../../../components/elements/snack-bar/SnackbarElement';

const MyAccountPage = ()=>{
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [received, setReceived] = useState('');
    const [user, setUser] = useState();

    const [isUpdated, setIsUpdated] = useState(false);

    const handleUpdateAccount = (id) =>{
           setIsUpdated(false);
             (async()=>{
                const userData ={
                    firstname: firstname,
                    lastname: lastname,
                    received: received,
                    email: email
                }
                 const save = database.update(FireStoreConst.USER_DOC, userData, id);
                 if(save){
                    setIsUpdated(true);
                 }
                 else{
                    setIsUpdated(false);
                 }
            })();
          
      
        
    }
    useEffect(() => {
        try {
          (async()=>{
            const timer = setTimeout(() => {
               onAuthStateChanged(auth, (userAuth) => {
                console.log(userAuth)
                if (userAuth.uid) {
                    (async () => {
                    const user = await database.loadByUid(FireStoreConst.USER_DOC, userAuth.uid);
                        setFirstname(user[0].firstname);
                        setLastname(user[0].lastname);
                        setEmail(user[0].email);
                        setReceived(user[0].received);
                        setUser(user[0]);
                    })();
               
                }
              });
         
            }, AppNumberConst.TIMEOUT_SEC);
            return () => clearTimeout(timer);
           
        })();
        }
        catch (e) {
          console.log(e);
        }
    
      }, [setUser,setFirstname, setLastname]);

      
    return (
        <>
        
        <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Grid
        container
        spacing={3}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Grid item xs={6} sm={8} md={9} lg={10}>
          <div
            style={{fontWeight: 700, verticalAlign: "top" }}
          >
            <span>My Account</span>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={{ xs: 1,sm: 2, md: 3 }} sx={{pl:6, mt:2}} >
 
            <Grid item xs={12} sm={6} sx={{mt:2}}>
                 <TextField type="text" id="firstname" label="Firstname" variant="outlined" fullWidth
                    value={firstname}
                   onChange={(event) => {
                    setFirstname(event.target.value);
                  }} />
            </Grid>
            <Grid item xs={12} sm={6} sx={{mt:2}}>
                  <TextField type="text" id="lastname" label="Lastname" variant="outlined" fullWidth
                  value={lastname}
                    onChange={(event) => {
                        setLastname(event.target.value);
                      }} />
            </Grid>
            <Grid item xs={12} sm={6}  sx={{mt:1}}>
                  <TextField  label="Email" variant="outlined" fullWidth
                  value={email}
                  disabled
                    onChange={(event) => {
                        setEmail(event.target.value);
                      }}/>
            </Grid>
            <Grid item xs={12} sm={6}  sx={{mt:1}}>
            <FormControlLabel
                        control={
                            <Checkbox
                                checked={received}  // changed value to checked to enable the false state set after submission to uncheck if was checked originally.
                                onChange={(e) => setReceived(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Received Marketing Promtions"
                    />
            </Grid>
         
        </Grid>
        
        <Box sx={{ width: '100%', mt:2}}>
            <Button 
            onClick={()=>handleUpdateAccount(user.id)}
            sx={{display:'block', width:{sm:'100%', md:'30%'}, margin: '2rem auto 0 auto'}} 
            disableElevation variant="contained" 
            color="warning">Update My Account</Button>
        </Box>
        {isUpdated && <SnackbarElement isOpen={isUpdated} message={'You have successfully updated your profile.'}/>}
    
     
      </Container>
        </>
    )
}

export default MyAccountPage;