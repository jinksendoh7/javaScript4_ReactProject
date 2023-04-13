


import {useEffect, useState} from 'react';
import {Grid, Paper, Box, Card, CardMedia, CardContent} from '@mui/material';
import * as database from '../../../database';
import { FireStoreConst, AppNumberConst } from '../../../constants/AppConstants';
import SpinnerLoader from '../../../components/spinner-loader/SpinnerLoaderComponent';
import { useParams } from "react-router";
import ListElement from '../../../components/elements/list/ListElement';
import './ViewDetail.scss';
import { styled } from '@mui/material/styles';
import PaymentCalculator from '../../../components/elements/payment-calculator/PaymentCalculator';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    border: 2,
    borderColor: theme.palette.text.primary,
  }));

const ViewDetailPage = () =>{
   const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const timer = setTimeout(() => {
            (async() =>{ 
                const result = await database.loadById(FireStoreConst.INVENTORY_VEHICLES, id);
                setData(result[0]);
                setLoading(false);
              })() 
        }, AppNumberConst.TIMEOUT_SEC);
        return () => clearTimeout(timer);
      }, [id]);
    return(
        <> 
        {
        !loading  && 
    <Box sx={{ flexGrow: 1, mb:20 }}>
          <Grid container spacing={{ xs: 1,sm: 2, md: 2 }} >
            <Grid item xs={12} sm={12} md={6}>
                <Item>
                <div className="header-panel">
                <div className="title-text">
                    {data.year+ ' ' +data.make + ' '+data.model}
                </div>
                <code>VIN: {data.vin}</code>
                </div>
                <Card variant="outlined">
                    <CardMedia
                        component="img"
                        height="320"
                        alt={data.year+ ' ' +data.make + ' '+data.model}
                        image={data.imageUrl}
                    />
                    <CardContent>
                    <ListElement data={data}></ListElement>
                    </CardContent>
                    </Card>
                </Item>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <Item>
                    <PaymentCalculator 
                    price={parseFloat(data.price)}
                    isCash={false}
                    vehicleName={data.year + ' ' + data.make + ' '+ data.model}
                    vin={data.vin}
                    vehicleId={data.id}
                    stockNumber= {data.stockNumber}
                    />
                </Item>
            </Grid>
        </Grid>
        </Box>
        } 
        {loading && <SpinnerLoader  size={55} loading={loading}/>}
        </>
    )
}
export default ViewDetailPage;