
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

import { TbLiveView } from "react-icons/tb";
import { IconButton } from '@mui/material';

import {useNavigate} from 'react-router-dom';

import { useState, useEffect } from 'react';
import { FireStoreConst } from '../../constants/AppConstants';
import { load } from '../../database';


function CustomerOffersList({ data }) {

    const navigate = useNavigate();
    const [vehicleView, setVehicleView] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await load(FireStoreConst.INVENTORY_VEHICLES);
            setVehicleView(res);
        })();

    }, []);
    console.log(vehicleView)
    console.log(data.id)

    const handleViewDetail = ()=>{
        const viewVehicle = [...vehicleView];
        viewVehicle.forEach((vehicle) => {
            const id = vehicle.id;
            if(vehicle.id === data.vehicleID) {
                console.log('Navigating to Vehicle Information')
                navigate('/view/'+id);
            }
        })
    }
    

    return (
        <>
            <Paper
                sx={{
                    p: 1,
                    mb: 1,
                    width: 'auto',
                    flexGrow: 1,
                }}
            >

                <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    textAlign='center'
                    margin="5px"
                >
                    <Checkbox />

                    <Typography variant='body2' sx={{ padding: 1 }}>
                        {data.firstname} {data.lastname}<br />{data.email} <br />{data.contact}
                    </Typography>

                    <Typography variant='body2' sx={{ padding: 1 }}>
                        {data.assignedTo}
                    </Typography>

                    <Typography variant='body2' sx={{ padding: 1 }}>
                        {data.isFinancing.toString()} <br /> Fee: ${data.financeFee}
                    </Typography>

                    <Typography variant='body2' sx={{ padding: 1 }}>
                        {data.frequency} <br /> ${data.pricing.toFixed(2)}
                    </Typography>

                    <Typography variant='body2' sx={{ padding: 1 }}>
                        {data.terms}
                    </Typography>

                    <Typography variant='body2' sx={{ padding: 1 }}>
                        {data.withTax.toString()}
                    </Typography>

                    <Typography variant='body2' sx={{ padding: 1 }}>
                        {data.status}
                    </Typography>

                    <Typography variant='body2' sx={{ padding: 1 }}>
                        ${data.vehiclePrice}
                    </Typography>

                    <Typography variant='body2' sx={{ padding: 1 }}>
                        {data.createdAt.toDate().toDateString()} <br /> {data.createdAt.toDate().toLocaleTimeString('en-US')}
                    </Typography>

                    <IconButton color="primary" onClick={() => handleViewDetail(data.id)}>
                        <TbLiveView />
                    </IconButton>


                </Grid>
            </Paper>
        </>

    )
}

export default CustomerOffersList;