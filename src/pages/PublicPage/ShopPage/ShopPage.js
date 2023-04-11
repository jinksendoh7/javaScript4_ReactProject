

import {useEffect, useState} from 'react';
import {Grid, Chip, Stack,Switch, Select, MenuItem} from '@mui/material';
import CardElement from '../../../components/elements/card/CardElement';
import * as database from '../../../database';
import { useDispatch, useSelector } from 'react-redux';
import { setDeals } from '../../../redux/slices/dealsSlice';
import { FireStoreConst, AppNumberConst } from '../../../constants/AppConstants';
import SpinnerLoader from '../../../components/spinner-loader/SpinnerLoaderComponent';
import {useNavigate} from 'react-router-dom';

const ShopPage = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deals = useSelector((state)=> state.deals);
    const [loading, setLoading] = useState(true);
    const [make, setMake] = useState('All');
    const [filters, setFilters] = useState(make);
    const [financeMode, setFinanceMode]= useState(true)
    const [terms, setTerms] = useState(60);
    const [frequency, setFrequency] = useState('Monthly');

    const handleViewDetail = (id)=>{
        navigate('view/'+id);
    }
    const handleChangeFinanceMode = () =>{
        setFinanceMode(!financeMode)
    }
    const handleFilter = (selected) =>{
        setLoading(true);
        setMake(selected);
        let data = [];
        const timer = setTimeout(() => {
            (async() =>{ 
            const res = await database.load(FireStoreConst.INVENTORY_VEHICLES);
            if(selected !== 'All'){
                res.filter((deal)=> deal.make === selected && data.push(deal));
            }
            else{
                data = res;
            }
            dispatch(setDeals(data));
            setLoading(false);
        })()  
        }, AppNumberConst.TIMEOUT_SEC);
        return () => clearTimeout(timer);

    }
    const handlePaymentChange = ()=>{
        setLoading(true);
        const timer = setTimeout(() => {
            (async() =>{ 
                const data = await database.load(FireStoreConst.INVENTORY_VEHICLES);
                setLoading(false);
                dispatch(setDeals(data));
                setFilters( [
                    ...new Map(data.map((item) => [item["make"], item])).values(),
                ]);
              })() 
        }, AppNumberConst.TIMEOUT_SEC);
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            (async() =>{ 
                const data = await database.load(FireStoreConst.INVENTORY_VEHICLES);
                setLoading(false);
                dispatch(setDeals(data));
                setFilters( [
                    ...new Map(data.map((item) => [item["make"], item])).values(),
                ]);
              })() 
        }, AppNumberConst.TIMEOUT_SEC);
        return () => clearTimeout(timer);
      }, [dispatch]);
      
    return(
        <> 
        <Grid container spacing={{ xs: 1, md: 1 }} sx={{ mb:3, p:1,borderRadius:1, backgroundColor: '#f5f4f4', border:1, borderColor: '#e3e3e3'}}>
         <Grid item sm={8}>
          {filters && 
          <>
                <Chip label="All" onClick={() => {handleFilter('All')}} color="primary" variant={make === 'All' ? '': 'outlined'} sx={{mr:.5}}/>
                        {deals && Array.from(filters).map((deal, index) => deal.make && (
                            <Chip onClick={() => { handleFilter(deal.make)}} label={deal.make} key={index} color="primary" variant={make ===deal.make ? '': 'outlined'} sx={{mr:.5}}/>
                            ))}
            </> 
         }
         </Grid>
         <Grid item sm={4}>
          {financeMode && 
          <>  <Select
                size="small"
                sx={{ml:2, width: 120, fontSize:12}}
                value={frequency}
                onChange={(e) => {setFrequency(e.target.value); handlePaymentChange()}}
             
            >
                    <MenuItem disabled value="">
                        <em>Frequency</em>
                    </MenuItem>
                <MenuItem sx={{ width: 120, fontSize:12}} value={"Monthly"} selected={frequency==='Monthly'}>Monthly</MenuItem>
                <MenuItem sx={{ width: 120, fontSize:12}} value={"Weekly"} selected={frequency==='Weekly'}>Weekly</MenuItem>
                <MenuItem sx={{ width: 120, fontSize:12}} value={"Bi-Weekly"} selected={frequency==='Bi-Weekly'}>Bi-Weekly</MenuItem>
            </Select>
            <Select
                size="small"
                sx={{ml:2, width: 120, fontSize:12}}
                value={terms}
                onChange={(e) => {setTerms(e.target.value);handlePaymentChange()}}
            >
                    <MenuItem disabled value="">
                        <em>Terms</em>
                    </MenuItem>
                <MenuItem sx={{ width: 120, fontSize:12}} value={36} selected={terms===36? true: false}>36 Months</MenuItem>
                <MenuItem sx={{ width: 120, fontSize:12}} value={48} selected={terms===48 ? true: false}>48 Months</MenuItem>
                <MenuItem sx={{ width: 120, fontSize:12}} value={60} selected={terms===60? true: false }>60 Months</MenuItem>
                <MenuItem sx={{ width: 120, fontSize:12}} value={72} selected={terms===72 ? true: false}>72 Months</MenuItem>
            </Select>
            </>
            }
              <Switch
                checked={financeMode}
                onChange={() =>{handleChangeFinanceMode(); handlePaymentChange();}}
                /> <span style={{textAlign:'end', fontSize: 14, fontWeight:700}}> View in Finance Mode</span>
        </Grid>
        </Grid> 
        {
        !loading  && <>
       <Grid container spacing={{ xs: 2, md: 2 }}>
            {deals && Array.from(deals).map((deal, index) => (
                <Grid item xs key={index}>
                    <CardElement
                    handleViewDetail={handleViewDetail}
                    financeMode={financeMode}
                    terms={terms}
                    frequency={frequency}
                    data={deal}/>
                </Grid>
            ))}
            </Grid>
            </>
        } 
        {loading && <SpinnerLoader  size={55} loading={loading}/>}
        </>
    )
}
export default ShopPage;