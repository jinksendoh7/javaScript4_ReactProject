import * as React from 'react';
// import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import { NumericFormat } from 'react-number-format';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {useNavigate} from 'react-router-dom';
import { FinanceConst, RoutesConst, AppTextConst } from '../../../constants/AppConstants';
import './HorizontalCardElement.scss'
import * as paymentHelper from '../../../helpers';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';
import * as database from '../../../database';
import { FireStoreConst } from '../../../constants/AppConstants';
import {useState, useEffect} from 'react';


export default function HorizontalCardElement({data,handleModalOpen, financeMode, terms, frequency, modalTitleName, onRemoveVehicle, onRetrieveClick}) {
const navigate = useNavigate();

  const updateFinancing = () => {
        let pv = parseFloat(data.price);
        let pricing = paymentHelper.computeFinancing(pv, terms, frequency);
        return pricing.toFixed(2);
}
const [total, setTotal] = useState(0);
const handleViewDetailClick = (id)=>{
  navigate('/view/'.concat(id));
}
const handleViewDealClick = (id) =>{
  navigate(RoutesConst.ADMIN_ROUTE.concat('/customers/', id));
}

useEffect(() => {
  (async() =>{ 
    const total = await database.countTotalById(FireStoreConst.CUSTOMER_DEALS, data.id);
    console.log(total, 'total')
    setTotal(total)
})()  

}, [data, setTotal]);



const retrieveClick = () => {
  handleModalOpen(modalTitleName);
  onRetrieveClick(data.id);
  };


 const deleteClick = () => {
    const id = data.id;
    onRemoveVehicle(id);
  };

  return (
    <Card sx={{ display: 'flex',border:1, marginX:2, marginY: 0, borderColor: '#e3e3e3'}} elevation={0}>
    <CardMedia
        component="img"
        sx={{ maxWidth: 200, height: 165 }}
        image={data.imageUrl}
      />
      <Box sx={{ display: 'flex'}}>
        <CardContent sx={{flex:'1 1 auto', cursor:'pointer'}}>
          <div className="flex">
              <div>
                 <div className="card-title" onClick={() => handleViewDetailClick(data.id)}>
                    {data.year+ ' ' +data.make + ' '+data.model}
                   </div>  
                <code>VIN:{data.vin}</code>
                <div  className="card-pricing">
                <NumericFormat value={financeMode ? updateFinancing() : data.price.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                {financeMode && <>/<span className="small-heading"> {frequency}</span></>}
                {financeMode && 
                <div className="data-subheading" style={{textAlign:'start'}}>
                      Finance for <b>{terms} months</b> for {FinanceConst.apr}% APR
                      <div>*TAX NOT INCLUDED</div>
                     
                  </div>
              }
             </div>
             </div>
            
        </div>
        </CardContent>
       </Box>
       <Box sx={{ display: 'flex', flexDirection: 'column', m:1, width:100, justifyContent:'space-between', alignContent:'flex-end' }}>
        <CardContent sx={{flex:'auto'}}>
        <Button variant="contained" 
        disabled={total ===0}
        disableElevation  sx={{p:1, minWidth:100}} size="small" onClick={() =>handleViewDealClick(data.id)}>
        Deals ({total}) 
        </Button>
        <Button variant="outlined" sx={{pt:1, mt:2}} size="small" onClick={retrieveClick} value={AppTextConst.EDITMODALTITLE}>
        <EditOutlinedIcon/>
         Update</Button>
         <Button variant="outlined"  sx={{pt:1, mt:1}} disableElevation color="error" size="small" onClick={deleteClick}>
         <DeleteOutlineOutlinedIcon/>
         DELETE</Button>
        </CardContent>
       </Box>
    </Card>
  );
}