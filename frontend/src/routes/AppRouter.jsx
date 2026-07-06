import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Schedules from "../pages/Schedules";
import MyReservations from "../pages/MyReservations";

export default function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/schedules" element={<Schedules/>}/>
                    <Route path="/my-reservations" element={<MyReservations/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}