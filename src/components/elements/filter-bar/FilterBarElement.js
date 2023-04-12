

import {Grid, Select, Chip, MenuItem, Switch} from '@mui/material';

const FilterBarElement = ({deals,
                filters,
                make,
                terms,
                frequency,
                setFrequency,
                setMake,
                setTerms, 
                financeMode,
                handleFilter,
                handlePaymentChange,
                handleChangeFinanceMode,
                isAdmin}) =>{

    return (
        <>
         <Grid item sm={isAdmin ? 7: 8}>
          {filters && 
          <>
                <Chip label="All" onClick={() => {handleFilter('All')}} color="primary" variant={make === 'All' ? '': 'outlined'} sx={{mr:.5}}/>
                        {deals && Array.from(filters).map((deal, index) => deal.make && (
                            <Chip onClick={() => { handleFilter(deal.make)}} label={deal.make} key={index} color="primary" variant={make ===deal.make ? '': 'outlined'} sx={{mr:.5}}/>
                            ))}
            </> 
         }
         </Grid>
         <Grid item sm={isAdmin? 5: 4}>
          {financeMode && 
          <>  <Select
                size="small"
                sx={{ml:2, width: 120, fontSize:12}}
                value={frequency}
                onChange={(e) => {setFrequency(e.target.value); handlePaymentChange()}}
             
            >
                    <MenuItem disabled value="">
                        <em>Frequency</em>
                    </MenuItem>
                <MenuItem sx={{ width: 120, fontSize:12}} value={"Monthly"} selected={frequency==='Monthly'}>Monthly</MenuItem>
                <MenuItem sx={{ width: 120, fontSize:12}} value={"Weekly"} selected={frequency==='Weekly'}>Weekly</MenuItem>
                <MenuItem sx={{ width: 120, fontSize:12}} value={"Bi-Weekly"} selected={frequency==='Bi-Weekly'}>Bi-Weekly</MenuItem>
            </Select>
            <Select
                size="small"
                sx={{ml:2, width: 120, fontSize:12}}
                value={terms}
                onChange={(e) => {setTerms(e.target.value);handlePaymentChange(e.target.value)}}
            >
                    <MenuItem disabled value="">
                        <em>Terms</em>
                    </MenuItem>
                <MenuItem sx={{ width: 120, fontSize:12}} value={36} selected={terms===36? true: false}>36 Months</MenuItem>
                <MenuItem sx={{ width: 120, fontSize:12}} value={48} selected={terms===48 ? true: false}>48 Months</MenuItem>
                <MenuItem sx={{ width: 120, fontSize:12}} value={60} selected={terms===60? true: false }>60 Months</MenuItem>
                <MenuItem sx={{ width: 120, fontSize:12}} value={72} selected={terms===72 ? true: false}>72 Months</MenuItem>
            </Select>
            </>
            }
              <Switch
                checked={financeMode}
                onChange={() =>{handleChangeFinanceMode(); handlePaymentChange()}}
                /> <span style={{textAlign:'end', fontSize: 14, fontWeight:700}}> View in Finance Mode</span>
        </Grid>
        </>
    );
}
export default FilterBarElement;