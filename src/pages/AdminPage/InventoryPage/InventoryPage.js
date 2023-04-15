import { Button, Grid, Container } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ModalElement from "../../../components/elements/modal/ModalElement";
import VehicleForm from "../../../components/forms/vehicle/VehicleForm";
import HorizontalCardElement from "../../../components/elements/card/HorizontalCardElement";
import { useEffect, useState } from "react";
import * as database from "../../../database";
import { useDispatch, useSelector } from "react-redux";
import { setDeals } from "../../../redux/slices/dealsSlice";
import {
  FireStoreConst,
  AppNumberConst,
  AppTextConst,
} from "../../../constants/AppConstants";
import SpinnerLoader from "../../../components/spinner-loader/SpinnerLoaderComponent";
import FilterBarElement from "../../../components/elements/filter-bar/FilterBarElement";
import './InventoryPage.scss';

const InventoryPage = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleModalOpen = (modalName) => {
    setModalType(modalName);
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };

  const deals = useSelector((state) => state.deals);

  const [loading, setLoading] = useState(true);
  const [make, setMake] = useState("All");
  const [filters, setFilters] = useState(make);
  const [financeMode, setFinanceMode] = useState(true);
  const [terms, setTerms] = useState(60);
  const [frequency, setFrequency] = useState("Monthly");
  const [modalType, setModalType] = useState("");
  const [forEditData, setForEditData] = useState([]); //retrieve data for edit func

  const handleChangeFinanceMode = () => {
    setFinanceMode(!financeMode);
  };

  const handleFilter = (selected) => {
    setLoading(true);
    setMake(selected);
    let data = [];
    const timer = setTimeout(() => {
      (async () => {
        const res = await database.load(FireStoreConst.INVENTORY_VEHICLES);
        if (selected !== "All") {
          res.filter((deal) => deal.make === selected && data.push(deal));
        } else {
          data = res;
        }
        dispatch(setDeals(data));
        setLoading(false);
      })();
    }, AppNumberConst.TIMEOUT_SEC);
    return () => clearTimeout(timer);
  };

  const handlePaymentChange = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      (async () => {
        const data = await database.load(FireStoreConst.INVENTORY_VEHICLES);
        setLoading(false);
        dispatch(setDeals(data));
        setFilters([
          ...new Map(data.map((item) => [item["make"], item])).values(),
        ]);
      })();
    }, AppNumberConst.TIMEOUT_SEC);
    return () => clearTimeout(timer);
  };

  //delete data in  firestore
  const onRemoveVehicle = async (id) => {
    try {
      await database.remove(FireStoreConst.INVENTORY_VEHICLES, id);
    } catch (e) {
      console.log(e);
    }
  };

  const onRetrieveClick = async (id) => {  //ERROR EXPECTING RETURN VALUE
    try {
      deals.map((data) => {
        if (data.id === id) {
          setForEditData(data);
        }
        return null;
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      (async () => {
        const data = await database.load(FireStoreConst.INVENTORY_VEHICLES);
        setLoading(false);
        dispatch(setDeals(data));
        setFilters([
          ...new Map(data.map((item) => [item["make"], item])).values(),
        ]);
      })();
    }, AppNumberConst.TIMEOUT_SEC);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <>
      <Container maxWidth={false} sx={{ my:3}}>
        <div className="flex-root">
    
            <div
              style={{ fontWeight: 700, verticalAlign: "top" }}
            >
              <span>Vehicle Inventory</span>
            </div>
          <div style={{ flex: 1 }}></div>
          
            <Button
              variant="contained"
              disableElevation
              color="warning"
              onClick={(e) => {
                handleModalOpen(e.target.value);
              }}
              value={AppTextConst.ADDMODALTITLE}
            >
              <AddBoxOutlinedIcon />
              &nbsp;{"Add Inventory"}
            </Button>
    
        </div>
      
      </Container>
      <Container maxWidth="xl">
      <Grid container spacing={{ xs: 1, md: 1 }} sx={{ mb: 3, p: 1, borderRadius: 1, backgroundColor: '#f5f4f4', border: 1, borderColor: '#e3e3e3' }}>
           
          <FilterBarElement
            deals={deals}
            filters={filters}
            make={make}
            terms={terms}
            frequency={frequency}
            setFrequency={setFrequency}
            setMake={setMake}
            setTerms={setTerms}
            financeMode={financeMode}
            handleFilter={handleFilter}
            handlePaymentChange={handlePaymentChange}
            handleChangeFinanceMode={handleChangeFinanceMode}
            isAdmin={true}
          />
        </Grid>
        {!loading && (
          <>
            <Grid container spacing={{ xs: 1, md: 1 }} >
              {deals &&
                Array.from(deals).map((deal, index) => (
                  <Grid item sm={12} md={6} key={index}>
                    <HorizontalCardElement
                      financeMode={financeMode}
                      terms={terms}
                      frequency={frequency}
                      onRemoveVehicle={onRemoveVehicle}
                      handleModalOpen={handleModalOpen}
                      onRetrieveClick={onRetrieveClick}
                      modalTitleName={AppTextConst.EDITMODALTITLE}
                      data={deal}
                    />
                  </Grid>
                ))}
            </Grid>
          </>
        )}
        {loading && <SpinnerLoader size={55} loading={loading} />}
      </Container>
      {open && (
        <ModalElement
          title={modalType}
          isOpen={open}
          handleCloseModal={handleModalClose}
          element={
            <VehicleForm
              handleCloseModal={handleModalClose}
              modalType={modalType}
              forEditData={forEditData}
            />
          }
        />
      )}
    </>
  );
};
export default InventoryPage;
