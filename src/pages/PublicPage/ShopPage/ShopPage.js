import * as database from '../../../database';
import { FireStoreConst, AppNumberConst } from '../../../constants/AppConstants';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { setDeals } from '../../../redux/slices/dealsSlice';

import CardElement from '../../../components/elements/card/CardElement';
import SpinnerLoader from '../../../components/spinner-loader/SpinnerLoaderComponent';
import FilterBarElement from '../../../components/elements/filter-bar/FilterBarElement';

const ShopPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deals = useSelector((state) => state.deals);
    const [loading, setLoading] = useState(true);
    const [make, setMake] = useState('All');
    const [filters, setFilters] = useState(make);
    const [financeMode, setFinanceMode] = useState(true)
    const [terms, setTerms] = useState(60);
    const [frequency, setFrequency] = useState('Monthly');

    const handleViewDetail = (id) => {
        navigate('view/' + id);
    }

    const handleChangeFinanceMode = () => {
        setFinanceMode(!financeMode)
    }

    const handleFilter = (selected) => {
        setLoading(true);
        setMake(selected);
        let data = [];
        const timer = setTimeout(() => {
            (async () => {
                const res = await database.load(FireStoreConst.INVENTORY_VEHICLES);
                if (selected !== 'All') {
                    res.filter((deal) => deal.make === selected && data.push(deal));
                }
                else {
                    data = res;
                }
                dispatch(setDeals(data));
                setLoading(false);
            })()
        }, AppNumberConst.TIMEOUT_SEC);
        return () => clearTimeout(timer);

    }

    const handlePaymentChange = () => {
        setLoading(true);
        const timer = setTimeout(() => {
            (async () => {
                const data = await database.load(FireStoreConst.INVENTORY_VEHICLES);
                setLoading(false);
                dispatch(setDeals(data));
                setFilters([
                    ...new Map(data.map((item) => [item["make"], item])).values(),
                ]);
            })()
        }, AppNumberConst.TIMEOUT_SEC);
        return () => clearTimeout(timer);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            (async () => {
                const data = await database.load(FireStoreConst.INVENTORY_VEHICLES);
                setLoading(false);
                dispatch(setDeals(data));
                setFilters([
                    ...new Map(data.map((item) => [item["make"], item])).values(),
                ]);
            })()
        }, AppNumberConst.TIMEOUT_SEC);
        return () => clearTimeout(timer);
    }, [dispatch]);

    return (
        <>
            <Grid container spacing={{ xs: 1, md: 1 }} sx={{ mb: 3, p: 1, borderRadius: 1, backgroundColor: '#f5f4f4', border: 1, borderColor: '#e3e3e3' }}>
                <FilterBarElement
                    deals={deals}
                    filters={filters}
                    make={make}
                    terms={terms}
                    frequency={frequency}
                    setFrequency={setFrequency}
                    setMake={setMake}
                    setTerms={setTerms}
                    financeMode={financeMode}
                    handleFilter={handleFilter}
                    handlePaymentChange={handlePaymentChange}
                    handleChangeFinanceMode={handleChangeFinanceMode}
                />
            </Grid>
            {
                !loading && <>
                    <Grid container spacing={{ xs: 2, md: 2 }} sx={{ overflow: 'hidden' }}>
                        {deals && Array.from(deals).map((deal, index) => (
                            <Grid item xs key={index}>
                                <CardElement
                                    handleViewDetail={handleViewDetail}
                                    financeMode={financeMode}
                                    terms={terms}
                                    frequency={frequency}
                                    data={deal} />
                            </Grid>
                        ))}
                    </Grid>
                </>
            }
            {loading && <SpinnerLoader size={55} loading={loading} />}
        </>
    )
}
export default ShopPage;