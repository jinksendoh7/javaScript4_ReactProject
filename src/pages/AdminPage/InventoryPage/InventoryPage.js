
import {Button,Grid, Container} from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ModalElement from '../../../components/elements/modal/ModalElement';
import VehicleForm from '../../../components/forms/vehicle/VehicleForm';
import HorizontalCardElement from '../../../components/elements/card/HorizontalCardElement';
import {useEffect, useState} from 'react';
import * as database from '../../../database';
import { useDispatch, useSelector } from 'react-redux';
import { setDeals } from '../../../redux/slices/dealsSlice';
import { FireStoreConst, AppNumberConst } from '../../../constants/AppConstants';
import SpinnerLoader from '../../../components/spinner-loader/SpinnerLoaderComponent';
import { useNavigate } from 'react-router-dom';
import FilterBarElement from '../../../components/elements/filter-bar/FilterBarElement';

const InventoryPage = () =>{
    const navigate = useNavigate();
    const [open, setOpen]= useState(false);
    
    const dispatch = useDispatch();
    
    const handleModalOpen = () =>{
        setOpen(true);
    }
    const handleModalClose = ()=>{
        setOpen(false)
    }


    const deals = useSelector((state)=> state.deals);
    const [loading, setLoading] = useState(true);
    const [make, setMake] = useState('All');
    const [filters, setFilters] = useState(make);
    const [financeMode, setFinanceMode]= useState(true)
    const [terms, setTerms] = useState(60);
    const [frequency, setFrequency] = useState('Monthly');
    const [modalType, setModalType] = useState("");
    const [forEditData, setForEditData] = useState([]); //retrieve data for edit func
    
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
     //delete data in  firestore
  const onRemoveVehicle = async (id) => {
    try {
      await database.remove(FireStoreConst.INVENTORY_VEHICLES, id);
    } catch (e) {
      console.log(e);
    }
  };

  const onRetrieveClick = async (id) => {
    try {
      deals.map((data) => {
        if (data.id === id) {
          setForEditData(data);
        }
      });

      console.log(forEditData);
    } catch (e) {}
  };


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
        
        <Container maxWidth={"xl"}>
        <Grid container spacing={3} 
            sx={{
                 display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                }} >
            <Grid item xs>
                <div style={{ fontWeight:700, verticalAlign:'top'}}>
                <span>Vehicle Inventory</span>
                </div>
             </Grid>
             <div style={{flex: 5}}></div>
            <Grid item xs>
            <Button variant="contained" disableElevation color="warning" onClick={handleModalOpen}>
                 <AddBoxOutlinedIcon/>&nbsp;{'Add Inventory'}
            </Button>
            </Grid>
        </Grid>
      
        </Container>
        <Container maxWidth="xl"  sx={{mt:3}}>
        <Grid container spacing={{ xs: 1, md: 1 }} sx={{mb:3, p:1, borderRadius:1, backgroundColor: '#f5f4f4', border:1, borderColor: '#e3e3e3'}}>
          <FilterBarElement
         deals= {deals}
         filters={filters}
         make={make}
         terms={terms}
         frequency ={frequency}
         setFrequency= {setFrequency}
         setMake = {setMake}
         setTerms = {setTerms} 
         financeMode={financeMode}
         handleFilter = {handleFilter}
         handlePaymentChange = {handlePaymentChange}
         handleChangeFinanceMode = {handleChangeFinanceMode}
         isAdmin={true}
           />
        </Grid> 
        {
        !loading  && <>
       <Grid container spacing={{ xs: 1, md: 1 }}>
            {deals && Array.from(deals).map((deal, index) => (
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6} key={index} sx={{ml:0}}>
                    <HorizontalCardElement
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
        </Container>
        {open && 
                <ModalElement 
                title={modalType}
                isOpen={open} 
                handleCloseModal={handleModalClose}
                element={<VehicleForm handleCloseModal={handleModalClose}   
                modalType={modalType}
                forEditData={forEditData}/>} 
                />
            }
           
        </>

    )
}
export default InventoryPage;