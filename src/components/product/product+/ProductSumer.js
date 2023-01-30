import React, { useEffect } from "react";
import { AiOutlineAppstoreAdd, AiOutlineFileProtect } from "react-icons/ai";
import { GrDocumentStore } from "react-icons/gr";
import { MdReportProblem } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTotalStoreValue,
  selectOutStock,
  selectCategory,
  CALC_STORE_VALUE,
  CALC_STORE_OUTOFSTOCK,
  CALC_CATEGOTY,
} from "../../../features/product/ProductSlice";
import Card from "../../Caja.js/Card";

// icons

const productsIcons = <AiOutlineFileProtect />;
const totalProduct = <GrDocumentStore />;
const outStock = <MdReportProblem />;
const allCategory = <AiOutlineAppstoreAdd />;

export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSumer = ({ products }) => {
  const dispatch = useDispatch();
  const totalStore = useSelector(selectTotalStoreValue);
  const stockProduct = useSelector(selectOutStock);
  const category = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_STORE_OUTOFSTOCK(products));
    dispatch(CALC_CATEGOTY(products));
  }, [dispatch, products]);

  return (
    <div className="">
      <h1 className="px-1 border-solid border-b-2 border-gray-300">-</h1>
      <h2 className="flex p-2 text-3xl justify-start items-start ">
        Estado del Inventario
      </h2>
      <div className="flex items-center justify-center ">
        <div  className="grid grid-cols-2 w-96 sm:grid-cols-2 md:grid-cols-4 gap-5 p-2  sm:w-full">
          <Card 
            icon={productsIcons}
            title="productos"
            count={products.length}
            className=""
          />
          <Card
            icon={totalProduct}
            title={"total  productos"}
            count={totalStore}

          />
          <Card
            icon={outStock}
            title={" fuera del Stock"}
            count={stockProduct}
          />
          <Card
            icon={allCategory}
            title={"todas las Categorias"}
            count={category.length}
          />
        </div>
      </div>
      <p className="px-1 w-full border-solid border-b-2 border-gray-300 mt-2"></p>
    </div>
  );
};

export default ProductSumer;
