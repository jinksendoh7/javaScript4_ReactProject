import { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import { Box, Tabs, Tab, Alert, Divider, Button, Chip, Stack, Switch, TextField } from '@mui/material';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

import * as database from '../../../database';
import { AppTextConst, FinanceConst, AppNumberConst, FireStoreConst } from '../../../constants/AppConstants';

import * as paymentHelper from '../../../helpers';
import TabPanel from './TabPanel';
import "./PaymentCalculator.scss";

import SpinnerLoader from '../../spinner-loader/SpinnerLoaderComponent';
import ModalElement from '../modal/ModalElement';
import CustomerDealForm from '../../forms/customer-deal/CustomerDealForm';
import SnackbarElement from '../snack-bar/SnackbarElement';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PaymentCalculator = ({ price, vehicleName, vin, vehicleId, stockNumber }) => {
  const [value, setValue] = useState(0);
  const [isTaxIncluded, setIsTaxIncluded] = useState(true);
  const [frequency, setFrequency] = useState('Monthly');
  const [terms, setTerms] = useState(60);
  const [isUpdating, setIsUpdating] = useState(false);
  const [financePrice, setFinancePrice] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [downpayment, setDownpayment] = useState(0)
  const [openSave, setOpenSave] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    updateFinancing();
  };

  const handleModalClose = () => {
    setOpenSave(false)
  }

  const handleOpenSave = () => {
    setOpenSave(true);

  }

  const handleSaveDeal = (customerInfo) => {
    setIsSaved(false);
    const timer = setTimeout(() => {
      (async () => {
        const data = {
          firstname: customerInfo.firstname,
          lastname: customerInfo.lastname,
          email: customerInfo.email,
          vehicle: vehicleName,
          vin: vin,
          vehicleId: vehicleId,
          stockNumber: stockNumber,
          contact: customerInfo.contact,
          isFinancing: !value ? true : false,
          pricing: financePrice,
          withTax: isTaxIncluded,
          taxAmount: taxAmount,
          frequency: frequency,
          downpayment: downpayment,
          terms: terms,
          financeFee: FinanceConst.finance_fee,
          vehiclePrice: price,
          status: customerInfo.status,
          createdAt: customerInfo.createdAt,
          assignedTo: customerInfo.assignedTo,
        }
        const save = await database.save(FireStoreConst.CUSTOMER_DEALS, data);
        const log = {
          id: save,
          type: AppTextConst.DEAL_CREATED,
          status: customerInfo.status,
          customerName: customerInfo.firstname + ' ' + customerInfo.lastname,
          email: customerInfo.email,
          createdAt: customerInfo.createdAt,
          pricing: financePrice,
          withTax: isTaxIncluded,
          frequency: frequency,
          isFinancing: !value ? true : false,
          terms: terms,
          financeFee: FinanceConst.finance_fee,
          vehiclePrice: price,
          imageUrl: data.imagUrl ||"",
          taxAmount: taxAmount,
          downpayment: downpayment
        }
        
        const updateLog = updateLogs(log);
        if (save && updateLog) {
          console.log('saved...')
          setIsSaved(true);
        }
        handleModalClose();
      })()
    }, AppNumberConst.TIMEOUT_SEC);
    return () => clearTimeout(timer);
  }

  const updateLogs = (data) => {
    (async () => {
      const update = await database.save(FireStoreConst.LOGS_CUSTOMER_DEALS, data);
      if (update) {
        console.log('update logs...')
        setIsSaved(true);
        return update;
        handleModalClose();
      }
    })();
  }

  const handleIncludeTax = () => {
    setIsTaxIncluded(!isTaxIncluded);
    console.log(isTaxIncluded, '40')
    updateFinancing();
  };

  const handleUpdateOnTerms = (terms) => {
    setTerms(terms);
    updateFinancing();
  }

  const updateFinancing = () => {
    setIsUpdating(true);
    const timer = setTimeout(() => {
      let taxTotal = isTaxIncluded ? ((price + FinanceConst.finance_fee) * (FinanceConst.tax / 100)) : 0;
      console.log(taxTotal)
      let pv = price + ((taxTotal) - (downpayment));
      let pricing = paymentHelper.computeFinancing(pv, terms, frequency);
      setTaxAmount(taxTotal)
      setFinancePrice(pricing);
      setIsUpdating(false);
    }, AppNumberConst.TIMEOUT_SEC);
    return () => clearTimeout(timer);
  }

  useEffect(() => {
    updateFinancing();
  }, [isTaxIncluded, terms, frequency]); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Alert severity="info"><b>{AppTextConst.BUILD_YOUR_DEAL_TEXT}</b>
          {AppTextConst.BUILD_YOUR_DEAL_DESCRIPTION}</Alert>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
          <Tabs value={value} onChange={handleChange} centered variant="fullWidth">
            <Tab label="Finance" iconPosition="start" icon={<AddCardOutlinedIcon />} {...a11yProps(0)} />
            <Tab label="Cash" iconPosition="start" icon={<MonetizationOnOutlinedIcon />}  {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box sx={{ width: '100%', mt: 1, mb: 2 }}>
            {isUpdating && <SpinnerLoader size={30} loading={isUpdating} />}
            {!isUpdating &&
              <>
                <div className="data-heading">
                  <NumericFormat value={financePrice.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                  /<span className="small-heading"> {frequency}</span>
                </div>
                <div className="data-subheading">
                  Finance for <b>{terms} months</b> for {FinanceConst.apr}% APR
                </div>
              </>
            }

          </Box>
          <Box sx={{ width: '100%', border: 1, borderColor: '#e3e3e3', p: 1, borderRadius: 1 }}>
            <div className='flex-row'>
              <div className="data-title">Vehicle Price</div>
              <div className="data-title-text">
                <NumericFormat value={(price).toFixed(2)}
                  displayType={'text'} thousandSeparator={true} prefix={'$'} />
              </div>
            </div>

            <div className='flex-row-alt'>
              <div className="data-title-small">Tax Total</div>
              <div className="data-title-text-small">
                + <NumericFormat value={taxAmount.toFixed(2)}
                  displayType={'text'} thousandSeparator={true} prefix={'$'} />
              </div>
            </div>
            <div className='flex-row-alt'>
              <div className="data-title-small">Finance Fee</div>
              <div className="data-title-text-small">
                +  <NumericFormat value={FinanceConst.finance_fee.toFixed(2)}
                  displayType={'text'} thousandSeparator={true} prefix={'$'} />
              </div>
            </div>
            <div className='flex-row'>
              <div className="data-title"> - Downpayment
                <div className="data-title-text-small">
                  To reduce payment, enter your desired downpayment.
                </div>
              </div>
              <div className="data-title-text">
                <TextField
                  size="small"
                  type="number"
                  onChange={(e) => { setDownpayment(e.target.value); updateFinancing() }}
                />
              </div>
            </div>

            <Divider />
            <div className='flex-row'>
              <div className="data-title">Finance Total</div>
              <div className="data-title-text">
                <NumericFormat value={((price + FinanceConst.finance_fee + taxAmount) - downpayment).toFixed(2)}
                  displayType={'text'} thousandSeparator={true} prefix={'$'} />
              </div>
            </div>

            <Divider />
            <div className='flex-row'>
              <div className="data-title">
                <Switch
                  checked={isTaxIncluded}
                  onChange={handleIncludeTax}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                Include Tax</div>
              <div className="data-title-text">

              </div>
            </div>
          </Box>
          <Box sx={{ width: '100%', border: 1, mt: 2, borderColor: '#e3e3e3', backgroundColor: '#f1f1f1', p: 1, borderRadius: 1 }}>
            <div className="data-title">Frequency</div>
            <div className="flex-row">
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Chip label="Bi-Weekly" color="primary" variant={frequency === 'Bi-Weekly' ? '' : 'outlined'} onClick={() => { setFrequency('Bi-Weekly'); updateFinancing(); }} />
                <Chip label="Weekly" color="primary" variant={frequency === 'Weekly' ? '' : 'outlined'} onClick={() => { setFrequency('Weekly'); updateFinancing(); }} />
                <Chip label="Monthly" color="primary" variant={frequency === 'Monthly' ? '' : 'outlined'} onClick={() => { setFrequency('Monthly'); updateFinancing(); }} />
              </Stack>
            </div>
            <div className="data-title">Terms</div>
            <div className="flex-row">
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Chip label="36 Months" color="primary" variant={terms === 36 ? '' : 'outlined'} onClick={() => { handleUpdateOnTerms(36) }} />
                <Chip label="48 Months" color="primary" variant={terms === 48 ? '' : 'outlined'} onClick={() => { handleUpdateOnTerms(48) }} />
                <Chip label="60 Months" color="primary" variant={terms === 60 ? '' : 'outlined'} onClick={() => { handleUpdateOnTerms(60) }} />
                <Chip label="72 Months" color="primary" variant={terms === 72 ? '' : 'outlined'} onClick={() => { handleUpdateOnTerms(72) }} />
                <Chip label="84 Months" color="primary" variant={terms === 84 ? '' : 'outlined'} onClick={() => { handleUpdateOnTerms(84) }} />
              </Stack>
            </div>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box sx={{ width: '100%', mt: 1, mb: 2 }}>
            {isUpdating && <SpinnerLoader size={30} loading={isUpdating} />}
            {!isUpdating &&
              <>
                <div className="data-heading">
                  <NumericFormat value={((price + taxAmount) - downpayment).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </div>
                <div className="data-subheading">
                  {isTaxIncluded ? <b>With TAX (13%)</b> : <b>Without TAX</b>}
                </div>
              </>
            }

          </Box>
          <Box sx={{ width: '100%', border: 1, borderColor: '#e3e3e3', p: 1, borderRadius: 1 }}>
            <div className='flex-row'>
              <div className="data-title">Vehicle Price</div>
              <div className="data-title-text">
                <NumericFormat value={(price).toFixed(2)}
                  displayType={'text'} thousandSeparator={true} prefix={'$'} />
              </div>
            </div>

            <div className='flex-row-alt'>
              <div className="data-title-small">Tax Total</div>
              <div className="data-title-text-small">
                + <NumericFormat value={taxAmount.toFixed(2)}
                  displayType={'text'} thousandSeparator={true} prefix={'$'} />
              </div>
            </div>
            <div className='flex-row'>
              <div className="data-title"> - Downpayment
                <div className="data-title-text-small">
                  To reduce payment, enter your desired downpayment.
                </div>
              </div>
              <div className="data-title-text">
                <TextField
                  size="small"
                  type="number"
                  onChange={(e) => { setDownpayment(e.target.value); updateFinancing() }}
                />
              </div>
            </div>
          </Box>
        </TabPanel>
        <Box sx={{ width: '100%' }}>
          <Button
            onClick={handleOpenSave}
            sx={{ mt: 3, display: 'block', width: '100%' }}
            disableElevation variant="contained"
            color="primary">Save My Deal</Button>
        </Box>
        {openSave &&
          <ModalElement
            title={"Save My Deal"}
            isOpen={openSave}
            handleCloseModal={handleModalClose}
            element={<CustomerDealForm handleSaveForm={handleSaveDeal} />}
            isSaveForm={true}
          />
        }
      </Box>
      {isSaved && <SnackbarElement isOpen={isSaved} message={'Your deal was saved. Please wait for our customer representative to call you.'} />}
    </>
  )
}
export default PaymentCalculator;