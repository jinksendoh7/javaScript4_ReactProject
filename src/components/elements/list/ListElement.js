import {Grid} from '@mui/material';
import "./ListElement.scss"
const ListElement=({data})=>{
    console.log(data,'data')
    return(
        <>
        <div className="data-title">Overview</div>
        <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={6} sm={6} md={6}>
                <div className="flex">
                    <div className="data-label">FUEL TYPE</div>
                    <div className="data-text">{data.fuel_type}</div>
                </div>  
                <div className="flex">   
                    <div className="data-label">TRANSMISSION</div>
                    <div className="data-text">{data.transmission}</div>
                </div>
                <div className="flex">
                    <div className="data-label">DRIVETRAIN</div>
                    <div className="data-text">{data.drivetrain}</div>
                </div>  
                <div className="flex">   
                    <div className="data-label">TYPE</div>
                    <div className="data-text">{data.type}</div>
                </div>
                <div className="flex">   
                    <div className="data-label">EXTERIOR</div>
                    <div className="data-text">{data.exterior}</div>
                </div>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                <div className="flex">
                    <div className="data-label">YEAR</div>
                    <div className="data-text">{data.year}</div>
                </div>  
                <div className="flex">   
                    <div className="data-label">MODEL</div>
                    <div className="data-text">{data.model}</div>
                </div>
                <div className="flex">   
                    <div className="data-label">MAKE</div>
                    <div className="data-text">{data.make}</div>
                </div>
                <div className="flex">
                    <div className="data-label">STOCK NUMBER</div>
                    <div className="data-text">{data.stockNumber}</div>
                </div> 
                <div className="flex">
                    <div className="data-label">INTERIOR</div>
                    <div className="data-text">{data.interior}</div>
                </div> 
                </Grid>
            </Grid>
        </>
    )

}
export default ListElement;