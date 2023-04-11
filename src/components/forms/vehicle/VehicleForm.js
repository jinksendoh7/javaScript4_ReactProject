import { useState } from "react";
import {
  FormControl,
  TextField,
  Box,
  MenuItem,
  Select,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
import { FaPlusCircle } from "react-icons/fa";
import { FireStoreConst } from "../../../constants/AppConstants";
import * as write from "../../../database/write";
const VehicleForm = ({ handleCloseModal }) => {
  //forms
  const [make, setMake] = useState("");
  const [vin, setVin] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(0);
  const [drivetrain, setDriveTrain] = useState("");
  const [fuel_type, setFuelType] = useState("");
  const [exterior, setExterior] = useState("");
  const [interior, setInterior] = useState("");
  const [mileage, setMileage] = useState(0);
  const [stockNumber, setStockNumber] = useState("");
  const [price, setPrice] = useState(0);
  const [transmission, setTransmission] = useState("");
  const [type, setType] = useState("");
  const [imageURL, setImageUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        make: make,
        vin: vin,
        model: model,
        year: year,
        drivetrain: drivetrain,
        fuel_type: fuel_type,
        exterior: exterior,
        interior: interior,
        mileage: mileage,
        stockNumber: stockNumber,
        price: price,
        transmission: transmission,
        type: type,
        imageUrl: imageURL,
        isAvailable: true,
      };

      await write.save(
        FireStoreConst.INVENTORY_VEHICLES,
        data
      );

      handleCloseModal();
      // //console.log(addVehicle);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch", fontSize: "12px" },
        }}
        //autoComplete="off"
      >
        <TextField
          label="Make"
          onChange={(e) => {
            setMake(e.target.value);
          }}
        />
        <TextField
          label="VIN"
          onChange={(e) => {
            setVin(e.target.value);
          }}
        />
        <TextField
          label="Model"
          onChange={(e) => {
            setModel(e.target.value);
          }}
        />
        <TextField
          label="Year"
          type="number"
          onChange={(e) => {
            setYear(e.target.value);
          }}
        />
        <TextField
          label="Drive Train"
          onChange={(e) => {
            setDriveTrain(e.target.value);
          }}
        />
        <FormControl
          style={{ m: 1, width: "25ch", margin: "8px", fontSize: "12px" }}
        >
          <InputLabel>Fuel</InputLabel>
          <Select
            label="Type"
            defaultValue=""
            onChange={(e) => {
              setFuelType(e.target.value);
            }}
          >
            <MenuItem value={"Gasoline"}>Gasoline</MenuItem>
            <MenuItem value={"Diesel"}>Diesel</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Exterior"
          onChange={(e) => {
            setExterior(e.target.value);
          }}
        />
        <TextField
          label="Interior"
          onChange={(e) => {
            setInterior(e.target.value);
          }}
        />
        <TextField
          label="Mileage"
          type="number"
          onChange={(e) => {
            setMileage(e.target.value);
          }}
        />
        <TextField
          label="Stock Number"
          onChange={(e) => {
            setStockNumber(e.target.value);
          }}
        />
        <FormControl
          style={{ m: 1, width: "25ch", margin: "8px", fontSize: "12px" }}
        >
          <InputLabel>Price</InputLabel>
          <OutlinedInput
            endAdornment={<InputAdornment position="end">$</InputAdornment>}
            label="Price"
            type="number"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </FormControl>

        <FormControl
          style={{ m: 1, width: "25ch", margin: "8px", fontSize: "12px" }}
        >
          <InputLabel>Transmission</InputLabel>
          <Select
            label="Transmission"
            defaultValue=""
            onChange={(e) => {
              setTransmission(e.target.value);
            }}
          >
            <MenuItem value={"Automatic"}>Automatic</MenuItem>
            <MenuItem value={"Hybrid"}>Hybrid</MenuItem>
            <MenuItem value={"Manual"}>Manual</MenuItem>
            <MenuItem value={"Electric"}>Electric</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          style={{ m: 1, width: "25ch", margin: "8px", fontSize: "12px" }}
        >
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            defaultValue=""
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <MenuItem value={"New"}>New</MenuItem>
            <MenuItem value={"Used"}>Used</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Image URL"
          
          onChange={(e) => {
            setImageUrl(e.target.value);
          }}
        />
      </Box>
      <Box m={1} display="flex" justifyContent="center" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          sx={{ height: 40 }}
          onClick={handleSubmit}
        >
          Save Inventory  
           </Button>
      </Box>
    </>
  );
};

export default VehicleForm;
