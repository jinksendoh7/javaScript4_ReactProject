import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { NumericFormat } from 'react-number-format';


import './HorizontalCardElement.scss'
export default function HorizontalCardElement({data}) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', border:1, borderColor: '#e3e3e3'}} elevation={0}>
    <CardMedia
        component="img"
        sx={{ maxWidth: 200, height: 150 }}
        image={data.imageUrl}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column',  maxWidth:380 }}>
        <CardContent sx={{}}>
          <div className="flex">
              <div>
                 <div className="card-title">{data.year+ ' ' +data.make + ' '+data.model}</div>
                <code>VIN:{data.vin}</code>
                <div  className="card-pricing">
                 <NumericFormat value={data.price.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
             </div>
             </div>
            
        </div>
        </CardContent>
       </Box>
      
    </Card>
  );
}