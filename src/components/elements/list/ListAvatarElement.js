
import {List, 
    ListItem, 
    ListItemAvatar, 
    Avatar, 
    ListItemText, 
    Select,
    MenuItem,
    Grid, 
    Button} from '@mui/material';
import "./ListElement.scss"
import { NumericFormat } from 'react-number-format';
import { generate } from "get-initials"
import { lightBlue, deepOrange} from '@mui/material/colors';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FinanceConst } from '../../../constants/AppConstants';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import * as database from '../../../database'
import { FireStoreConst } from '../../../constants/AppConstants';
import SnackbarElement from '../snack-bar/SnackbarElement';
import TimelineIcon from '@mui/icons-material/Timeline';
import {AppTextConst} from '../../../constants/AppConstants';
import { Timestamp } from "@firebase/firestore";

const ListAvatarElement=({data, handleModalOpen})=>{
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const [statusChange, setStatusChange] = useState(data.status);
    const [isUpdated, setIsUpdated] = useState(false);
    const [open, setOpen] = useState(false)
    const handleStatusChange = async (status) => {
        const id = data.id;
        setIsUpdated(false);
        setStatusChange(status);
        const updated = await database.update(FireStoreConst.CUSTOMER_DEALS,
             {status: status, createdAt:  Timestamp.fromDate(new Date())}, id);
        const log = {
            id:data.id,
            type: status === 'Closed' ? AppTextConst.DEAL_CLOSED: AppTextConst.DEAL_ACCEPTED_BY_SALES,
            status:status,
            customerName:  data.firstname + ' '+ data.lastname,
            email: data.email,
            createdAt:  Timestamp.fromDate(new Date()),
            pricing: data.pricing,
            withTax: data.withTax,
            frequency: data.frequency,
            isFinancing: data.isFinancing ? true: false,
            terms: data.terms,
            financeFee: FinanceConst.finance_fee,
            vehiclePrice: data.vehiclePrice,
            taxAmount:data.taxAmount, 
            downpayment: data.downpayment
          }
          if(updated){
              console.log('saved...')
            const updateLog =  updateLogs(log);
            
          }
          else{
            console.error('Failed to update status');
          }
    }

    const updateLogs = (data) =>{
        (async() =>{ 
        const update = await database.save(FireStoreConst.LOGS_CUSTOMER_DEALS, data);
        if(update){
          console.log('update logs...')
          setIsUpdated(true);
          }
        })(); 
      }
    return(
        <>
           <Grid container spacing={3}>
            <Grid item xs>
            <List sx={{ width: 'auto', bgcolor: 'background.paper'}}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    <Avatar sx={{ bgcolor: lightBlue[800], mt:1, width: 48, height: 48, mr:1  }} alt={data.firstname + ' ' + data.lastname}>{ generate(data.firstname, data.lastname)}</Avatar>
                    </ListItemAvatar>
                    <div>
                    <div className="data-title-alt">{data.firstname + ' ' + data.lastname}</div>
                    <div className="data-text-alt">{data.email}</div>
                    <div className="data-text-alt">{data.contact}</div>
                    </div>
                  </ListItem>
                </List>
            </Grid>
                <Grid item xs>
             <List sx={{ width: 'auto', bgcolor: 'background.paper'}}>
                     <ListItem alignItems="flex-start">
                        <div>
                     <div className="data-title-alt">{data.vehicle}</div>
                     <div className="data-text-alt">VIN#: {data.vin}</div>
                    <div className="data-text-alt">Stock#: {data.stockNumber}</div>
                    </div>
                    </ListItem>
                </List>
                </Grid>
                <Grid item xs>
             <List sx={{ width: 'auto', bgcolor: 'background.paper'}}>
                     <ListItem alignItems="flex-start">
                     <ListItemAvatar>
                    <Avatar variant="square" sx={{ bgcolor: data.isFinancing ? lightBlue[800]: deepOrange[800], mt:1, width: 48, height: 48, mr:2  }}>
                            {data.isFinancing ?
                                 <><AddCardOutlinedIcon/> </> 
                                 :
                                <> <MonetizationOnOutlinedIcon/></>
                                
                                } 
                    </Avatar>
                    </ListItemAvatar>
                            <div>
                            <div className="data-title-alt">
                                <NumericFormat value={data.isFinancing ? data.pricing.toFixed(2) : data.vehiclePrice.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                {data.isFinancing && <>/<span className="small-heading"> {data.frequency}</span></>}
                                </div>
                                {!data.isFinancing && <><span className="small-heading"> Straight Cash</span></>  }
                       
                            {data.isFinancing && <>
                            <div className="data-text-alt" style={{textAlign:'start'}}>
                                    Finance for <b>{data.terms} months</b> for {FinanceConst.apr}% APR
                                </div>
                             
                            </>
                            }
                            {data.witTax ?
                            <div className="data-text-alt" style={{textAlign:'start'}}>
                               TAX INCLUDED
                            </div>
                            :
                            <div className="data-text-alt" style={{textAlign:'start'}}>
                                    TAX NOT INCLUDED
                              </div>
                            }
                            </div>
                    </ListItem>
                </List>
                </Grid>
                <Grid item xs>
             <List sx={{ width: 'auto', bgcolor: 'background.paper'}}>
                     <ListItem alignItems="flex-start">
                        <>
                        <div>
                        <Select
                        size="small"
                        sx={{ width: 160, fontSize: 12, mb:1}}
                        value={statusChange}
                        onChange={(e) => {  handleStatusChange(e.target.value);}}
                        disabled ={statusChange === 'Closed'}
                    >
                        <MenuItem sx={{ width: 160, fontSizez: 12 }} selected={statusChange === 'Open'} value="Open">Open</MenuItem>
                        <MenuItem sx={{ width: 160, fontSizez: 12 }} selected={statusChange === 'Awaiting for Customer'} value="Awaiting">Awaiting Customer</MenuItem>
                        <MenuItem sx={{ width: 160, fontSizez: 12 }} selected={statusChange === 'Closed'} value="Closed">Closed</MenuItem>
                    
                    </Select>
                    <div className="small-heading" style={{textAlign:'start', fontSize:12,mt:2}}>
                        <b>Last Update: </b> {data.createdAt.toDate().toDateString()} {data.createdAt.toDate().toLocaleTimeString('en-US')}
                        </div>
                        <Button color="primary" 
                        disableElevation size="small"  variant="outlined" sx={{mt:1, width: 160}} onClick={()=> {setOpen(false); handleModalOpen(data.id)}}>
                           <TimelineIcon/> View Timeline
                        </Button>
                        </div>
                    </>
                    </ListItem>
                </List>
                </Grid>
               
            </Grid>
            {isUpdated && <SnackbarElement isOpen={isUpdated} message={'Status was successfully updated to '+ statusChange + '.'}/>}
   
        </>
    )

}
export default ListAvatarElement;