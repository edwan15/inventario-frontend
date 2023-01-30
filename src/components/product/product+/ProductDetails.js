import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../custom/useRedirect";
import { selectIsLoggedIn } from "../../../features/auth/authSlice/authSlice";
import { getProduct } from "../../../features/product/ProductSlice";
import Loader from "../../../Util/Loader";
import DOMPurify from "dompurify";

const ProductDetails = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );


  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }
    if (isError) {
      console.log(message);
    }
  }, [dispatch, isLoggedIn, isError, message, id]);

  return (
    <div className="flex justify-around items-start">

    <div className="border-solid border-2 border-gray-700 max-w-lg rounded-lg m-4 p-4 bg-cardOverlay ">
      <h3 className="text-lg  font-extrabold mb-3 border-solid border-b-2 shadow-lg  border-gray-500 ">
        Detalles del Producto
      </h3>
      <div>
        {isLoading && <Loader />}
        {product && (
          <div className="detail">
            <div cardClass="group">
              {product?.image ? (
                <img
                  src={product.image.filePath}
                  alt={product.image.fileName}
                />
              ) : (
                <p>No image set for this product</p>
              )}
            </div>
            <h4 className="flex justify-center mt-6 mb-2 border-solid border-b-2 shadow-lg  border-gray-500 max-w-lg ">
              Product Availability:{" "}
              {product.stock > 0 ? (
                <p className="text-green-500 font-extrabold text-2xl ">
                  {" "}
                  In Stock{" "}
                </p>
              ) : (
                <p className="text-red-500 font-extrabold text-2xl">Out Stock</p>
              )}
            </h4>
            <hr />
            <h4 className="mb-6 font-extrabold text-xl">
              <span className="text-red-500 font-extrabold text-xl mt-6  ">
                Name:{" "}
              </span>{" "}
              &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {product.sku}
            </p>
            <p className="mt-4   mb-2 ">
              <b className="text-xl">&rarr; Category : </b> {product.category}
            </p>
            <div className="flex justify-center gap-10">
              <p className="text-xl">
                <b>&rarr; Entradas : </b> {"$"}
                {product.entradas}
              </p>
              <p>
                <b className="text-xl">&rarr; Salidas: </b> {product.salidas}
              </p>
            </div>
            <p className="mt-5">
              <b className="text-xl ">&rarr; Total Stock : </b> {"$"}
              {product.entradas - product.salidas}
            </p>
            <hr />
            <div
              className="mt-4 border-solid border-b-2 shadow-lg  border-gray-500  mb-2 "
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>
            <hr />
            <code className="--color-dark">
              Created on: {product.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {product.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default ProductDetails;
