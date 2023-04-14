
import {Grid, Container} from '@mui/material';
const UsersPage = () =>{
 
        return <>
     <Container maxWidth={"xl"}>
        <Grid container spacing={3} 
            sx={{
                 display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                }} >
            <Grid item xs>
                <div style={{ fontWeight:700, verticalAlign:'top'}}>
                <span>App Users</span>
                </div>
             </Grid>
        </Grid>
        <Grid container spacing={{ xs: 1, md: 1 }}>
            <Grid item xs="auto">
                 1
            </Grid>
            <Grid item xs={6}>
              2
            </Grid>
            <Grid item xs>
              3
            </Grid>
         </Grid>
      </Container>
        </>
}
export default UsersPage;