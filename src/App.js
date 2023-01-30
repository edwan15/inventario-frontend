import Home from "./Pages/Home/Home";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Forgot from "./Pages/Auth/Forgot";
import Reset from "./Pages/Auth/Reset";
import SideBar from "./components/SideBar/SideBar";
import Layout from "./components/Layout/Layout";
import DashBoard from "./Pages/DashBoard/DashBoard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus } from "./services/Services";
import { SET_LOGIN } from "../src/features/auth/authSlice/authSlice";
import AddProduct from "./Pages/addProduct/AddProduct";
import { ToastContainer } from "react-toastify";
import EditProduct from "./Pages/editProduct/EditProduct";
import ProductDetails from "./components/product/product+/ProductDetails";
import Profile from "./Pages/Profile/Profile";
import EditProfile from "./Pages/EditProfile/EditProfile";
import Contact from "./Pages/contact/Contact";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset" element={<Reset />} />

        <Route
          path="/panel"
          element={
            <SideBar>
              <Layout>
                <DashBoard />
              </Layout>
            </SideBar>
          }
        />

        <Route
          path="/add-product"
          element={
            <SideBar>
              <Layout>
                <AddProduct />
              </Layout>
            </SideBar>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <SideBar>
              <Layout>
                <EditProduct />
              </Layout>
            </SideBar>
          }
        />
        <Route
          path="/product-detail/:id"
          element={
            <SideBar>
              <Layout>
                <ProductDetails />
              </Layout>
            </SideBar>
          }
        />
        <Route
          path="/profile"
          element={
            <SideBar>
              <Layout>
                <Profile />
              </Layout>
            </SideBar>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <SideBar>
              <Layout>
                <EditProfile />
              </Layout>
            </SideBar>
          }
        />
        <Route
          path="/contact-us"
          element={
            <SideBar>
              <Layout>
                <Contact />
              </Layout>
            </SideBar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
