import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import { FireStoreConst } from '../../constants/AppConstants';
import { load } from '../../database/read';

import CustomerOffersList from './CustomerOffersList';



function CustomerOffers() {
    

    const [offers, setOffers] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await load(FireStoreConst.CUSTOMER_DEALS);
            setOffers(data);
        })();

    }, []);
    console.log('Loaded data: ', offers);

    return (
        <div>
            {offers && Array.from(offers).map((offer, index) => (
                <Grid item xs key={index}>
                    <CustomerOffersList
                        data={offer}
                        />
                </Grid>
            ))}


        </div>
    );
}

export default CustomerOffers;
