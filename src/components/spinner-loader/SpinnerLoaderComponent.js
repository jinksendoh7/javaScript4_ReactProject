

import MoonLoader from "react-spinners/MoonLoader";
import './SpinnerLoader.scss'  

const SpinnerLoader = ({loading, size}) => {
    return(
      <div className="spinner-wrapper">      
      <MoonLoader
      color={'#064c72'}
      loading={loading}
      size={size}
      width={10}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
    </div>
    );
  };
  
export default SpinnerLoader;