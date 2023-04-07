import { useState, useEffect } from "react";
import {Routes, Route} from 'react-router-dom';

/*Pages */
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import AboutPage from "./pages/AboutPage/AboutPage";

import * as database from './database'
import { useDispatch, useSelector} from 'react-redux';

import './App.scss';

export default function App () {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

useEffect(()=>{
          (async() =>{ 
          //  const data = await database.load('tasks');
            //dispatch(setTasks(data));
            
          })()
  }, [dispatch, tasks])

  return (
    <>
      <main className="page">
        <Routes>
           <Route path="/" element={<LoginPage/>}></Route>
            <Route path="/about" element={<AboutPage/>}></Route>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </main>
    </>
  );
}


