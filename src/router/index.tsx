import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "../pages/Layout";
import Products from "../pages/Products";
import SingleProduct from "../pages/SingleProduct";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import ProtectedAuth from "../components/auth/ProtectedAuth";
import SidebarWithHeader from "../pages/dashboard/DashboardLayout";
import DashboardProductsPage from "../pages/dashboard/DashboardProductsPage";
import DashboardHome from "../pages/dashboard/DashboardHome";
import DashboardCategories from "../pages/dashboard/DashboardCategories";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout />}>
                <Route path="/dashboard" element={<ProtectedRoute element={<SidebarWithHeader />} />} />
                <Route path="/products" element={<ProtectedRoute element={<Products />} />} />
                <Route path="/products/:id" element={<SingleProduct />} />
            </Route>
            <Route path="/login" element={<ProtectedAuth element={<Login />} />} />
            <Route path="/register" element={<Register />} />

            {/* Admin layout */}
            <Route path="/dashboard" element={<SidebarWithHeader />}>
                <Route path="/dashboard/" element={<DashboardHome />} />
                <Route path="/dashboard/products" element={<DashboardProductsPage />} />
                <Route path="/dashboard/category" element={<DashboardCategories />} />
            </Route>
        </>
    )
);

export default router;
