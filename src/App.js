import {Routes, Route} from 'react-router-dom';

/*Pages */
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import PublicPage from './pages/PublicPage/PublicPage';
import InventoryPage from './pages/AdminPage/InventoryPage/InventoryPage'
import DashboardPage from "./pages/AdminPage/DashboardPage/DashboardPage";
import AdminPage from './pages/AdminPage/AdminPage';
import AboutPage from "./pages/AboutPage/AboutPage";

/*Constants */
import { RoutesConst } from "./constants/AppConstants";

import './App.scss';

export default function App () {
 

  return (
    <>
      <main className="page">
        <Routes>
           <Route path={RoutesConst.HOME_ROUTE} element={<LoginPage />}></Route>
           <Route path={RoutesConst.SIGNUP_ROUTE} element={<SignUpPage />} />
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </main>
    </>
  );
}


