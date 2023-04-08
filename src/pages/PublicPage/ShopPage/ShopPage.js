


import {Container, Grid} from '@mui/material';
import CardElement from '../../../components/elements/header/card/CardElement';

const ShopPage = () =>{
    return(
        <> 
    
       <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {Array.from(Array(6)).map((_, index) => (
                <Grid item xs={2} sm={3} md={3} key={index}>
                    <CardElement/>
                </Grid>
            ))}
            </Grid>
        </>
    )
}
export default ShopPage;