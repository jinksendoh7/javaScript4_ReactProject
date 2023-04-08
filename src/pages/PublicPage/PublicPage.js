
import {Outlet} from 'react-router-dom';
import {Container} from '@mui/material';
import HeaderPublic from '../../components/elements/header/HeaderPublic';

const PublicPage = () =>{
    return(
        <> 
          <HeaderPublic/>
         <Container maxWidth="xl" sx={{mt:5}}>
            <Outlet/>
        </Container>
        </>

    )
}
export default PublicPage;