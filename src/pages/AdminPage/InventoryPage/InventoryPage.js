
import {Button,Grid} from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useState} from 'react';
import ModalElement from '../../../components/elements/modal/ModalElement';
import VehicleForm from '../../../components/forms/vehicle/VehicleForm';

const InventoryPage = () =>{
    const [open, setOpen]= useState(false);
    const handleModalOpen = () =>{
        setOpen(true);
    }
    const handleModalClose = ()=>{
        setOpen(false)
    }
    return(
        <> 
        <Grid container spacing={2}>
            <Grid item xs={8}>
                Vehicle Inventory
             </Grid>
            <Grid item xs={4}>
            <Button variant="outlined" onClick={handleModalOpen}>
                 <AddBoxOutlinedIcon/>&nbsp;{'Add Inventory'}
            </Button>
            </Grid>
            {open && 
                <ModalElement 
                title={"Add Vehicle Inventory"}
                isOpen={open} 
                handleCloseModal={handleModalClose}
                element={<VehicleForm handleCloseModal={handleModalClose} />} 
                />
            }
        </Grid>
        </>

    )
}
export default InventoryPage;