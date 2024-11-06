import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import SingleProduct from "../pages/SingleProduct";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import ProtectedAuth from "../components/auth/ProtectedAuth";
import SidebarWithHeader from "../pages/dashboard/DashboardLayout";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import DashboardProductsPage from "../pages/dashboard/DashboardProductsPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<ProtectedRoute element={<Home />} />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<SingleProduct />} />
            </Route>
            <Route path="/login" element={<ProtectedAuth element={<Login />} />} />
            <Route path="/register" element={<Register />} />


            <Route path="/dashboard" element={<SidebarWithHeader/>}>
                <Route path="/dashboard/" element={<AdminDashboard/>} />
                <Route path="/dashboard/products" element={<DashboardProductsPage/>} />
                <Route path="/dashboard/category" element={<h1>category</h1>} />
            </Route>
        </>
    )
);

export default router;
