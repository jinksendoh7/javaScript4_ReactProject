import {useState} from 'react';
import {Box, Tabs, Tab, Alert, Divider, Button, Chip, Stack} from '@mui/material';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import TabPanel from './TabPanel';
import { AppTextConst } from '../../../constants/AppConstants';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import "./PaymentCalculator.scss";
import { NumericFormat } from 'react-number-format';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  
const PaymentCalculator=({price, isCash})=>{
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const [frequency, setFrequency] = useState('Bi-Weekly');
    const [terms, setTerms] = useState('60 Months');
    return(
        <>
      <Box sx={{ width: '100%' }}>
      <Alert severity="info"><b>{AppTextConst.BUILD_YOUR_DEAL_TEXT}</b>
      {AppTextConst.BUILD_YOUR_DEAL_DESCRIPTION}</Alert>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt:3}}>
        <Tabs value={value} onChange={handleChange} centered     variant="fullWidth">
          <Tab label="Finance" iconPosition="start"  icon ={<AddCardOutlinedIcon/>} {...a11yProps(0)} />
          <Tab label="Cash" iconPosition="start"  icon ={<MonetizationOnOutlinedIcon/>}  {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box sx={{ width: '100%', mt:1, mb:2 }}>
            <div className="data-heading">  
                <NumericFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
            <div className="data-subheading">
                Finance for 72 months for 7.99% APR
            </div>
        </Box>
        <Box sx={{ width: '100%', border:1, borderColor: '#e3e3e3',p:1, borderRadius:1 }}>
            <div className='flex-row'>
                <div className="data-title">Finance Total</div>
                <div className="data-title-text">$59,000</div>
            </div>
            <Divider/>
            <div className='flex-row'>
                <div className="data-title">Include Tax</div>
                <div className="data-title-text">
                <Button sx={{textTransform:'capitalize'}}>Pricing Breakdown
                    <ArrowRightAltOutlinedIcon/> 
                </Button>
                </div>
            </div>
        </Box>
        <Box sx={{ width: '100%', border:1, mt:2, borderColor: '#e3e3e3', backgroundColor: '#f1f1f1',p:1, borderRadius:1 }}>
                <div className="data-title">Frequency</div>
                <div className="flex-row">
                <Stack direction="row" spacing={2} sx={{mb:2}}>
                    <Chip label="Bi-Weekly" color="primary" variant={frequency === 'Bi-Weekly' ?'': 'outlined'} onClick={()=> setFrequency('Bi-Weekly')}/>
                    <Chip label="Weekly" color="primary" variant={frequency === 'Weekly' ?'': 'outlined'} onClick={()=> setFrequency('Weekly')} />
                    <Chip label="Monthly" color="primary" variant={frequency === 'Monthly' ?'': 'outlined'} onClick={()=> setFrequency('Monthly')}/>
                </Stack>
                </div> 
                <div className="data-title">Terms</div>
                <div className="flex-row">
                <Stack direction="row" spacing={2} sx={{mb:2}}>
                    <Chip label="36 Months" color="primary" variant={terms === '36 Months' ?'': 'outlined'} onClick={()=> setTerms('36 Months')}/>
                    <Chip label="48 Months" color="primary" variant={terms === '48 Months' ?'': 'outlined'} onClick={()=> setTerms('48 Months')} />
                    <Chip label="60 Months" color="primary" variant={terms === '60 Months' ?'': 'outlined'} onClick={()=> setTerms('60 Months')}/>
                    <Chip label="72 Months" color="primary" variant={terms === '72 Months' ?'': 'outlined'} onClick={()=> setTerms('72 Months')}/>
                    <Chip label="84 Months" color="primary" variant={terms === '84 Months' ?'': 'outlined'} onClick={()=> setTerms('84 Months')}/>
            
                </Stack>
                </div> 
        </Box>
    </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
  
    </Box>
        </>
    )

}
export default PaymentCalculator;