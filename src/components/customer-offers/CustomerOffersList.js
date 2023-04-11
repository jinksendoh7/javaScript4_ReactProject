
import {useNavigate} from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { TbLiveView } from "react-icons/tb";
import { IconButton } from '@mui/material';

function CustomerOffersList({ data }) {

    const navigate = useNavigate();

    const handleViewDetail = ()=>{
        const id = data.vehicleID;
        navigate('/view/'+id);
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