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
        </>
    )
);

export default router;
