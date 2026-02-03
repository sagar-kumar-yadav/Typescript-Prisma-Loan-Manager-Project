import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import SuperAdminDashboard from "../dashboard/SuperAdminDashboard";
import AdminDashboard from "../dashboard/AdminDashboard";
import Login from "../auth/pages/Login";
import OfficerDashboard from "../dashboard/OfficerDashboard";
import CustomerDashboard from "../dashboard/CustomerDashboard";

const Router=()=>(
    <Routes>
        <Route path="/login" element={<Login/>}/>

        <Route path="/super-admin" element={<ProtectedRoute roles={["SUPER_ADMIN"]}>
            <SuperAdminDashboard/>
        </ProtectedRoute>}/>

        <Route path="/admin" element={<ProtectedRoute roles={["ADMIN"]}><AdminDashboard/></ProtectedRoute>}/>

        <Route path="/officer" element={<ProtectedRoute roles={["OFFICER"]}><OfficerDashboard/></ProtectedRoute>}/>

        <Route path="/CUSTOMER_SERVICE" element={<ProtectedRoute roles={["CUSTOMER_SERVICE"]}><CustomerDashboard/></ProtectedRoute>}/>
    </Routes>

);
export default Router;