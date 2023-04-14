
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { update } from '../../database';
import { FireStoreConst } from '../../constants/AppConstants';

import {
    Grid, 
    Paper, 
    Typography, 
    Checkbox, 
    Select, 
    MenuItem,
    IconButton
} from '@mui/material';

import { TbLiveView } from "react-icons/tb";

function CustomerOffersList({ data }) {
    const navigate = useNavigate();

    const [statusChange, setStatusChange] = useState(data.status);

    const handleViewDetail = () => {
        const id = data.vehicleID;
        navigate('/view/' + id);
    }

    const handleStatusChange = async () => {
        const id = data.id;
        const updated = await update(FireStoreConst.CUSTOMER_DEALS, { status: statusChange }, id);
        console.log(statusChange)
        if (!updated) {
            console.error('Failed to update status');
        } else {
            console.log('Success');
        }
    }

    return (
        <>
            <Paper
                sx={{
                    p: 1,
                    mr: 2,
                    mb: 1,
                    ml: 10,
                    maxWidth: 'auto',
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

                    <Select
                        size="small"
                        sx={{ ml: 2, width: 160, fontSize: 12 }}
                        value={statusChange}
                        onChange={(e) => { setStatusChange(e.target.value); handleStatusChange(); }}
                    >
                        <MenuItem sx={{ width: 160, fontSizez: 12 }} value="Open">Open</MenuItem>
                        <MenuItem sx={{ width: 160, fontSizez: 12 }} value="Awaiting">Awaiting Customer</MenuItem>
                        <MenuItem sx={{ width: 160, fontSizez: 12 }} value="Closed">Closed</MenuItem>
                    </Select>

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