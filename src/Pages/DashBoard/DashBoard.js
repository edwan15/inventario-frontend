import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/product/product+/ProductList";
import ProductSumer from "../../components/product/product+/ProductSumer";
import useRedirectLoggedOutUser from "../../custom/useRedirect";
import { selectIsLoggedIn } from "../../features/auth/authSlice/authSlice";
import { getProducts } from "../../features/product/ProductSlice";

const DashBoard = () => {
  useRedirectLoggedOutUser("/login");
const dispatch = useDispatch();

const isLoggedIn = useSelector(selectIsLoggedIn);
const { products, isLoading, isError, message } = useSelector(
  (state) => state.product
);

useEffect(() => {
  if (isLoggedIn === true) {
    dispatch(getProducts());
  }

  if (isError) {
    console.log(message);
  }
}, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="">
      <ProductSumer products={products} />
      <ProductList products={products} isLoading={isLoading} />
    </div>
  );
};

export default DashBoard;
