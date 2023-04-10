import { useState, useEffect} from 'react';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

import { FireStoreConst } from '../../constants/AppConstants';
import { load } from '../../database/read';


function CustomerOffers(props) {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        //IIFE - Immediatlye Invoked Function Expression: 
        (async () => {
          const data = await load(FireStoreConst.CUSTOMER_DEALS);
          setOffers(data);
          console.log('Loaded data: ', data);
        })();
    
      }, []);

      console.log(offers[0].contact)

    return (
        <Paper
            sx={{
                p: 1,
                margin: 'auto',
                maxWidth: 'auto',
                flexGrow: 1,
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs>  
                    <Typography gutterBottom variant="subtitle1" component="div">
                        Name: {offers[0].contact}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default CustomerOffers;