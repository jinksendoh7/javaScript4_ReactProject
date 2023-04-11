
import {Outlet} from 'react-router-dom';
import {Container} from '@mui/material';
import HeaderPublic from '../../components/elements/header/HeaderPublic';
import Footer from '../../components/footer/Footer';
const PublicPage = () =>{
    return(
        <> 
          <HeaderPublic/>
         <Container maxWidth="xl" sx={{mt:15}}>
            <Outlet/>
        </Container>
        <Footer/>
        </>

    )
}
export default PublicPage;