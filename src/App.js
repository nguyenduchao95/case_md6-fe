import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import AddHouse from "./components/AddHouse";
import EditProfile from "./component/account/crud/EditProfile";
import ChangePassword from "./component/account/crud/ChangePassword";


function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<HouseDetail/>}/>
            <Route path="/add" element={<AddHouse/>}/>
            <Route path={"/editProfile/:id"} element={<EditProfile/>}/>
            <Route path={"/changePassword/:id"} element={<ChangePassword/>}/>
        </Routes>
        <ToastContainer/>
    </div>
  );
}

export default App;
