import ListAvatarElement from "../../../components/elements/list/ListAvatarElement";
import {Grid, Container} from '@mui/material';
import {useEffect, useState} from 'react';
import * as database from '../../../database';
import { FireStoreConst } from "../../../constants/AppConstants";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCustomers } from "../../../redux/slices/customersSlice";
import ModalElement from "../../../components/elements/modal/ModalElement";
import StatusTimelineElement from "../../../components/elements/timeline/StatusTimelineElement";
const CustomersPage = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [customers, setCustomers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [open, setOpen]= useState(false);
    const [customerSelectedId, setCustomerSelectedId] = useState('');

    const handleModalOpen = (id) =>{
        setOpen(true);
        setCustomerSelectedId(id)
    }
    const handleModalClose = ()=>{
        setOpen(false)
    }


    useEffect(() => {
        setLoading(true);
        (async () => {
            const data = await database.load(FireStoreConst.CUSTOMER_DEALS);
            setCustomers(data);
            setLoading(false);
        })();

    }, [setCustomers]);

 
    return(
        <> 
          <Grid container spacing={3} 
            sx={{pb:1,
                ml:5,
                mr:3,
                mb:3,
                 display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                borderBottom:1, borderColor:'#e3e3e3'
                }} >
            <Grid item xs>
                <div style={{paddingLeft:25, fontWeight:700, verticalAlign:'top'}}>
                <span>Customers</span>
                </div>
             </Grid>
            
        </Grid>
        <Container maxWidth="xl"  sx={{mt:3}}>
            <Grid container spacing={{ xs: 1, md: 1 }}> 
                <Grid item xs>
                    { !loading  &&
                    customers && Array.from(customers).map((offer, index) => (
                        <Grid item xs key={index} sx={{border: 1, borderColor:'#e3e3e3', borderRadius:3, p:1, ml:5, mb:1}}>
                            <ListAvatarElement
                                data={offer}
                                handleModalOpen={handleModalOpen}
                                />
                        </Grid>
                    ))}
               </Grid>
            </Grid>
        </Container>
        {open && 
                <ModalElement 
                title={"Timeline of the Deal"}
                isOpen={open} 
                handleCloseModal={handleModalClose}
                element={<StatusTimelineElement id={customerSelectedId} />} 
                />
            }
        </>

    )
}
export default CustomersPage;