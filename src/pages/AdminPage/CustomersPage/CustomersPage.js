import * as database from '../../../database';
import { FireStoreConst } from "../../../constants/AppConstants";

import { Grid, Container } from '@mui/material'; 
import { useEffect, useState } from 'react';

import ListAvatarElement from "../../../components/elements/list/ListAvatarElement";
import ModalElement from "../../../components/elements/modal/ModalElement";
import StatusTimelineElement from "../../../components/elements/timeline/StatusTimelineElement";

const CustomersPage = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [customerSelectedId, setCustomerSelectedId] = useState('');

    const handleModalOpen = (id) => {
        setOpen(true);
        setCustomerSelectedId(id)
    }
    const handleModalClose = () => {
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

    return (
        <>
            <Container maxWidth="xl" sx={{ mt: 3 }}>
                <Grid container spacing={3}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }} >
                    <Grid item xs>
                        <div style={{ fontWeight: 700, verticalAlign: 'top' }}>
                            <span>Customers</span>
                        </div>
                    </Grid>

                </Grid>
            </Container>
            <Container maxWidth="xl" sx={{ mt: 3 }}>
                <Grid container spacing={{ xs: 1, md: 1 }}>
                    <Grid item xs>
                        {!loading &&
                            customers && Array.from(customers).map((offer, index) => (
                                <Grid item xs key={index} sx={{ border: 1, borderColor: '#e3e3e3', borderRadius: 3, p: 1, ml: 5, mb: 1 }}>
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