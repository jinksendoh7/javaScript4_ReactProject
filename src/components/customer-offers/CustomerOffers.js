import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';

import { load } from '../../database/read';
import { FireStoreConst } from '../../constants/AppConstants';

import CustomerOffersList from './CustomerOffersList';
import SpinnerLoader from '../spinner-loader/SpinnerLoaderComponent';

function CustomerOffers() {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        (async () => {
            const data = await load(FireStoreConst.CUSTOMER_DEALS);
            setOffers(data);
            setLoading(false);
        })();

    }, []);
    console.log('Loaded data: ', offers);

    return (
        <div>
            {
                !loading && <>
                    {offers && Array.from(offers).map((offer, index) => (
                        <Grid item xs key={index}>
                            <CustomerOffersList
                                data={offer}
                            />
                        </Grid>
                    ))}
                </>
            }
            {loading && <SpinnerLoader size={55} loading={loading} />}
        </div>
    );
}
export default CustomerOffers;
