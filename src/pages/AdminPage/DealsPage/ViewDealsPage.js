import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { Card, CardContent, CardMedia, CardActions, Button, Grid, Container } from '@mui/material'
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';

import * as database from '../../../database'
import { FireStoreConst } from '../../../constants/AppConstants';

import ListAvatarElement from "../../../components/elements/list/ListAvatarElement";
import ModalElement from '../../../components/elements/modal/ModalElement';
import StatusTimelineElement from '../../../components/elements/timeline/StatusTimelineElement';

const ViewDealsPage = () => {
    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [customerSelectedId, setCustomerSelectedId] = useState('');
    const { vehicleId } = useParams();
    const [vehicleInfo, setVehicleInfo] = useState([]);

    const handleModalOpen = (id) => {
        setOpen(true);
        setCustomerSelectedId(id)
    }

    const handleModalClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        setLoading(true);
        let data = [];

        (async () => {
            const res = await database.load(FireStoreConst.CUSTOMER_DEALS);
            res.filter((deal) => deal.vehicleId === vehicleId && data.push(deal));
            setCustomers(data);
            setLoading(false);
            if (data) {
                setVehicleInfo({
                    vehicleId: data[0].vehicleId,
                    vehicleName: data[0].vehicle,
                    vin: data[0].vin,
                    vehicleImage: data[0].imageUrl,
                    stockNumber: data[0].stockNumber,
                    vehiclePrice: data[0].vehiclePrice,
                })
            }
        })();

    }, [vehicleId, setCustomers]);

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
                        <div style={{ paddingLeft: 25, fontWeight: 700, verticalAlign: 'top' }}>
                            <span>Offers from Customers </span>
                        </div>
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth="xl" sx={{ mt: 3 }}>
                <Grid container spacing={{ xs: 1, md: 1 }}>
                    <Grid item xs={9}>
                        <div style={{ paddingLeft: 25, fontWeight: 700, verticalAlign: 'top' }}>
                            <Card sx={{ display: 'flex', border: 1, borderColor: '#e3e3e3', ml: 2, mb: 3 }} elevation={0}>
                                <CardMedia
                                    component="img"
                                    sx={{ maxWidth: 200, height: 165 }}
                                    image={vehicleInfo.vehicleImage}
                                />
                                <CardContent>
                                    {vehicleInfo.vehicleName}
                                    <div style={{ fontSize: 12 }}>VIN #: {vehicleInfo.vin}</div>
                                    <div style={{ fontSize: 12 }}>Stock #: {vehicleInfo.stockNumber}</div>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                    <Grid item xs>
                        <div style={{ paddingLeft: 25, fontWeight: 700, verticalAlign: 'top' }}>
                            <Card sx={{ display: 'flex', border: 1, borderColor: '#e3e3e3', ml: 2, mb: 3 }} elevation={0}>
                                <CardContent>
                                    <NumericFormat value={vehicleInfo.vehiclePrice} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    <div style={{ fontSize: 12, fontWeight: 700 }}>VEHICLE PRICE</div>

                                    <CardActions>
                                        <Button variant="contained" disableElevation sx={{ p: 1, minWidth: 100 }} size="small"
                                            onClick={() => navigate('/view/' + vehicleId)}>
                                            View Vehicle
                                        </Button>
                                    </CardActions>
                                </CardContent>
                            </Card>

                        </div>
                    </Grid>
                </Grid>
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
    );
}
export default ViewDealsPage;