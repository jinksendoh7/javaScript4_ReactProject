import { useEffect, useState } from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../redux/slices/usersSlice';
import {
  onAuthStateChanged,
 } from 'firebase/auth';
 import {auth} from '../../configs/firebase'
/* Custom Components */
import HeaderElements from '../../components/elements/header/HeaderElements';
import DrawerHeader from '../../components/elements/header/DrawerHeader';
import SpinnerLoader from '../../components/spinner-loader/SpinnerLoaderComponent';

/* MUI */
import Container from "@mui/material/Container";

import { RoutesConst, AppNumberConst } from '../../constants/AppConstants';


const AdminPage = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
      try {
        (async()=>{
          const timer = setTimeout(() => {
             onAuthStateChanged(auth, (userAuth) => {
              if (userAuth) {
                const user = {   
                  email: userAuth.email,
                  uid: userAuth.uid,
                  displayName: userAuth.displayName,
                  photoUrl: userAuth.photoURL
                }
               setUser(user);
               dispatch(login(user));
               setLoading(false);
               setIsLoggedIn(true)
              } else {
                dispatch(logout());
                navigate(RoutesConst.HOME_ROUTE);
              }
            });
       
          }, AppNumberConst.TIMEOUT_SEC);
          return () => clearTimeout(timer);
         
      })();
      }
      catch (e) {
        console.log(e);
      }
  
    }, [dispatch, navigate]);


    return(
        <> 
        {isLoggedIn &&
        <>
            <HeaderElements userData={user}/>
             <Container maxWidth={false} sx={{mt:5}} disableGutters>
             <DrawerHeader />
           
                {loading? <SpinnerLoader  size={55} loading={loading}/>
                :
                <Outlet/>
                }
                
            </Container>
        </>
        }
        {!isLoggedIn && <SpinnerLoader  size={55} loading={loading}/>}
        </>

    )
}
export default AdminPage;