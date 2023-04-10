
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Grid from '@mui/material/Grid';
import { NumericFormat} from 'react-number-format';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

import './CardElement.scss'
import { AppNumberConst, FinanceConst } from '../../../constants/AppConstants';
import * as paymentHelper from '../../../helpers';

export default function CardElement({data, handleViewDetail, financeMode, terms, frequency}) {
  const handleClick= (id) =>{
    handleViewDetail(id);
  }

  const updateFinancing = () => {
       
        let pv = parseFloat(data.price);
        let pricing = paymentHelper.computeFinancing(pv, terms, frequency);
        return pricing.toFixed(2);
}

  return (
    <Card sx={{ maxWidth: 345, border: 1, borderColor: '#e3e3e3' }} elavation={2} >
      <CardHeader
        title={<div className="flex">
          <div>
              <code>VIN:{data.vin}</code>
          </div>
           <div className="card-highlight">
            {data.isAvailable ? 'In-Stock': ''}
          </div>
           </div>}
        subheader={''}
      />
      <CardMedia
        component="img"
        height="194"
        image={data.imageUrl}
        alt={data.year+ ' ' +data.make + ' '+data.model}
      />
      <CardContent>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <div className="card-title">{data.year+ ' ' +data.make + ' '+data.model}</div>
          <div className="card-currency-price">
          <NumericFormat value={financeMode ? updateFinancing() : data.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          {financeMode && <>/<span className="small-heading"> {frequency}</span></>}
          </div>
          {financeMode && 
          <div className="data-subheading" style={{textAlign:'start'}}>
                Finance for <b>{terms} months</b> for {FinanceConst.apr}% APR
                *TAX NOT INCLUDED
            </div>
        }
        </Grid>
        <Grid item xs={3}>
        {data.type.toLowerCase() === 'used' && 
              <div className="data-text-mileage">
            <NumericFormat value={data.mileage} displayType={'text'} thousandSeparator={true} /> km
            </div>}
        </Grid>
        <div className="card-tags">
            <Chip label={data.type} color="primary" sx={{width: 100}}/>
            <Chip label={data.transmission} color="warning" variant="outlined" sx={{width: 100}} />
            <Chip label={data.fuel_type} color="success" variant="outlined" sx={{width: 100}} />
            {data.mileage <=AppNumberConst.LOW_MILEAGE &&  <Chip label="Low Mileage" color="success" variant="outlined" sx={{width: 100}} />}
        </div>
      </Grid>
       </CardContent>
      <CardActions>
        <div className="card-button">
      <Button variant="contained" sx={{minWidth: 325}} disableElevation onClick={() => handleClick(data.id)}>
        View Detail
      </Button>
      </div>
      </CardActions>
       
    </Card>
  );
}