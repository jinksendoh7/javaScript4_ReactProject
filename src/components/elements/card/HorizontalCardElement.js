import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import { NumericFormat } from 'react-number-format';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { FinanceConst } from '../../../constants/AppConstants';
import './HorizontalCardElement.scss'
import * as paymentHelper from '../../../helpers';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function HorizontalCardElement({data,handleViewDetail, financeMode, terms, frequency}) {
  const theme = useTheme();

  const updateFinancing = () => {
        let pv = parseFloat(data.price);
        let pricing = paymentHelper.computeFinancing(pv, terms, frequency);
        return pricing.toFixed(2);
}

  return (
    <Card sx={{ display: 'flex',border:1, borderColor: '#e3e3e3'}} elevation={0}>
    <CardMedia
        component="img"
        sx={{ maxWidth: 200, height: 165 }}
        image={data.imageUrl}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 370}}>
        <CardContent sx={{flex:'1 1 auto'}}>
          <div className="flex">
              <div>
                 <div className="card-title">{data.year+ ' ' +data.make + ' '+data.model}</div>
                <code>VIN:{data.vin}</code>
                <div  className="card-pricing">
                <NumericFormat value={financeMode ? updateFinancing() : data.price.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                {financeMode && <>/<span className="small-heading"> {frequency}</span></>}
                {financeMode && 
                <div className="data-subheading" style={{textAlign:'start'}}>
                      Finance for <b>{terms} months</b> for {FinanceConst.apr}% APR
                      <div>*TAX NOT INCLUDED</div>
                      <div className="card-highlight">
                      {data.isAvailable ? 'In-Stock': ''}
                    </div>
                  </div>
              }
             </div>
             </div>
            
        </div>
        </CardContent>
       </Box>
       <Box sx={{ display: 'flex', flexDirection: 'column', m:1, width:100, justifyContent:'space-between', alignContent:'flex-end' }}>
        <CardContent sx={{flex:'auto'}}>
        <Button variant="outlined" color="warning" sx={{pt:1,pl:2, mb:1}} size="small">
        <Badge badgeContent={6} color="warning" sx={{mr:3}}>
          </Badge>
          Deals
        
        </Button>
        <Button variant="outlined" sx={{pt:1, mt:2}} size="small">
        <EditOutlinedIcon/>
         Update</Button>
         <Button variant="contained"  sx={{pt:1, mt:1}} disableElevation color="error" size="small">
         <DeleteOutlineOutlinedIcon/>
         DELETE</Button>
        </CardContent>
       </Box>
    </Card>
  );
}