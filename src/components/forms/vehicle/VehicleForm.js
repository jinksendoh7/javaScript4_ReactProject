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
import * as database from "../../../database";
import { FireStoreConst, AppTextConst } from "../../../constants/AppConstants";

const VehicleForm = ({ handleCloseModal, modalType, forEditData }) => {
  //forms
  const [make, setMake] = useState();
  const [vin, setVin] = useState();
  const [model, setModel] = useState();
  const [year, setYear] = useState();
  const [drivetrain, setDriveTrain] = useState();
  const [fuel_type, setFuelType] = useState();
  const [exterior, setExterior] = useState();
  const [interior, setInterior] = useState();
  const [mileage, setMileage] = useState();
  const [stockNumber, setStockNumber] = useState();
  const [price, setPrice] = useState();
  const [transmission, setTransmission] = useState();
  const [type, setType] = useState();
  const [imageUrl, setImageUrl] = useState();

  //for edit modal
  if (modalType === AppTextConst.EDITMODALTITLE) {
    if (make === undefined) {
      setMake(forEditData.make);
    }
    if (vin === undefined) {
      setVin(forEditData.vin);
    }
    if (model === undefined) {
      setModel(forEditData.model);
    }
    if (year === undefined) {
      setYear(forEditData.year);
    }
    if (drivetrain === undefined) {
      setDriveTrain(forEditData.drivetrain);
    }
    if (fuel_type === undefined) {
      setFuelType(forEditData.fuel_type);
    }
    if (exterior === undefined) {
      setExterior(forEditData.exterior);
    }
    if (interior === undefined) {
      setInterior(forEditData.interior);
    }
    if (mileage === undefined) {
      setMileage(forEditData.mileage);
    }
    if (stockNumber === undefined) {
      setStockNumber(forEditData.stockNumber);
    }
    if (price === undefined) {
      setPrice(forEditData.price);
    }
    if (transmission === undefined) {
      setTransmission(forEditData.transmission);
    }
    if (type === undefined) {
      setType(forEditData.type);
    }
    if (imageUrl === undefined) {
      setImageUrl(forEditData.imageUrl);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      imageUrl: imageUrl,
      isAvailable: true,
    };

    try {
      if (modalType === AppTextConst.ADDMODALTITLE) {
        await database.save(FireStoreConst.INVENTORY_VEHICLES, data);
        console.log("Added!");
      } else {
        await database.update(
          FireStoreConst.INVENTORY_VEHICLES,
          data,
          forEditData.id
        );
        console.log("Edit!");
      }

      handleCloseModal();
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
      >
        <TextField
          label="Make"
          required
          value={make}
          onChange={(e) => {
            setMake(e.target.value);
          }}
        />
        <TextField
          label="VIN"
          required
          value={vin}
          onChange={(e) => {
            setVin(e.target.value);
          }}
        />
        <TextField
          label="Model"
          required
          value={model}
          onChange={(e) => {
            setModel(e.target.value);
          }}
        />
        <TextField
          label="Year"
          required
          type="number"
          value={year}
          onChange={(e) => {
            setYear(parseInt(e.target.value));
          }}
        />
        <TextField
          label="Drive Train"
          required
          value={drivetrain}
          onChange={(e) => {
            setDriveTrain(e.target.value);
          }}
        />
        <FormControl
          required
          style={{ m: 1, width: "25ch", margin: "8px", fontSize: "12px" }}
        >
          <InputLabel>Fuel</InputLabel>
          <Select
            label="Type"
            required
            value={fuel_type}
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
          required
          value={exterior}
          onChange={(e) => {
            setExterior(e.target.value);
          }}
        />
        <TextField
          label="Interior"
          required
          value={interior}
          onChange={(e) => {
            setInterior(e.target.value);
          }}
        />
        <TextField
          label="Mileage"
          required
          type="number"
          value={mileage}
          onChange={(e) => {
            setMileage(parseInt(e.target.value));
          }}
        />
        <TextField
          label="Stock Number"
          required
          value={stockNumber}
          onChange={(e) => {
            setStockNumber(e.target.value);
          }}
        />
        <FormControl
          required
          style={{ m: 1, width: "25ch", margin: "8px", fontSize: "12px" }}
        >
          <InputLabel>Price</InputLabel>
          <OutlinedInput
            endAdornment={<InputAdornment position="end">$</InputAdornment>}
            label="Price"
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(parseInt(e.target.value));
            }}
          />
        </FormControl>

        <FormControl
          required
          style={{ m: 1, width: "25ch", margin: "8px", fontSize: "12px" }}
        >
          <InputLabel>Transmission</InputLabel>
          <Select
            label="Transmission"
            value={transmission}
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
          required
          style={{ m: 1, width: "25ch", margin: "8px", fontSize: "12px" }}
        >
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            value={type}
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
          required
          value={imageUrl}
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
