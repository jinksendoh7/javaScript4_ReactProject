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
import { AppNumberConst } from '../../../constants/AppConstants';

export default function CardElement({data, handleViewDetail}) {

  const handleClick= (id) =>{
    handleViewDetail(id);
  }
  return (
    <Card sx={{ maxWidth: 350, border: 1, borderColor: '#e3e3e3' }} elavation={2} >
      <CardHeader
        title={<div className="flex">
          <div>
              <code>VIN: {data.vin}</code>
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="card-title">{data.year+ ' ' +data.make + ' '+data.model}</div>
          <div className="card-currency-price">
          <NumericFormat value={data.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </div>
        </Grid>
        <Grid item xs={6}>
       
        </Grid>
        <div className="card-tags">
            <Chip label={data.type} color="primary" sx={{width: 100}}/>
            <Chip label={data.transmission} color="primary" variant="outlined" sx={{width: 100}} />
            <Chip label={data.fuel_type} color="success" sx={{width: 100}} />
            {data.mileage <=AppNumberConst.LOW_MILEAGE &&  <Chip label="Low Mileage" color="success" variant="outlined" sx={{width: 100}} />}
        </div>
      </Grid>
       </CardContent>
      <CardActions>
        <div className="card-button">
      <Button variant="contained" sx={{minWidth: 300}} disableElevation onClick={() => handleClick(data.id)}>
        View Detail
      </Button>
      </div>
      </CardActions>
       
    </Card>
  );
}