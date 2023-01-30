import React, { useEffect, useState } from "react";
import Search from "../../../search/Search";
import Loader from "../../../Util/Loader";
import { AiFillEye, AiTwotoneDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { SiMicrosoftexcel } from "react-icons/si";
import "react-confirm-alert/src/react-confirm-alert.css"; //
import {motion} from "framer-motion"
import {
  deleteProduct,
  getProducts,
} from "../../../features/product/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredProduct,
} from "../../../features/filter/FilterSearch";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import * as XLSX from "xlsx";


const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState("");

  const filteredProduct = useSelector(selectFilteredProduct);
  const dispatch = useDispatch();

let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const ExportToExcel = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(currentItems)
    XLSX.utils.book_append_sheet(wb, ws, "My Sheet 1");

    XLSX.writeFile(wb, `Inventario-${day}-${month}-${year}.xlsx`);
  };

  const delProduct = async (id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelate = (id) => {
    confirmAlert({
      title: "Eliminar Producto",
      message: "Estas Seguro que quieres eliminar este producto",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  // nuevo tema Paginacion

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffice, setItemOffice] = useState(0);
  const itemPerPage = 5;

  useEffect(() => {
    const endOffSet = itemOffice + itemPerPage;

    setCurrentItems(filteredProduct.slice(itemOffice, endOffSet));
    setPageCount(Math.ceil(filteredProduct.length / itemPerPage));
  }, [itemOffice, itemPerPage, filteredProduct]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemPerPage) % filteredProduct.length;
    setItemOffice(newOffset);
  };

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  return (
    <div>
      <div className="px-2 py-4">
        <div className="flex  justify-between ">
          <h2 className="text-3xl">Productos del Inventario</h2>

          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>
        {isLoading && <Loader />}
        <div className="mt-3">
          {!isLoading && products.length === 0 ? (
            <p className="flex justify-start">
              -- No hay Productos en la Lista , Por favor agrega un producto
              para almacenarlo...
            </p>
          ) : (
            <table className="grid border-solid border-2 border-blue-400 rounded-md p-2 bg-cardOverlay ">
              <thead className="hidden md:block border-solid border-b-2 mb-3 shadow-md">
                <tr className="grid grid-cols-7 text-lg">
                  <th>ID</th>
                  <th >Nombre</th>
                  <th>Categoria</th>
                  <th>Entradas</th>
                  <th>Salidas</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <thead className="border-solid md:hidden border-b-2 mb-3 shadow-md">
                <tr className="grid grid-cols-7 text-lg">
                  <th>ID</th>
                  <th >Nomb</th>
                  <th>Categ</th>
                  <th>Ent +</th>
                  <th>Sal -</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className=" grid ">
                {currentItems.map((product, index) => {
                  const { _id, name, category, entradas, salidas } = product;

                  return (
                    <tr
                      key={_id}
                      className="grid grid-cols-7 border-solid border-b-2 mb-4 text-lg"
                    >
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 10)}</td>
                      <td>{category}</td>
                      <td>{entradas}</td>
                      <td>{salidas}</td>
                      <td>{entradas - salidas}</td>
                      <motion.td whileHover={{scale:1.2}} whileTap={{scale:0.8}} className="flex  justify-center  mt-2 gap-2 md:gap-4">
                        <span>
                          <Link to={`/product-detail/${_id}`}>
                            <AiFillEye className="text-purple-400" />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-product/${_id}`}>
                            <BiEditAlt className="text-green-400" />
                          </Link>
                        </span>
                        <span>
                          <Link>
                            <AiTwotoneDelete
                              className="text-red-400"
                              onClick={() => confirmDelate(_id)}
                            />
                          </Link>
                        </span>
                      </motion.td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <div className="flex justify-center items-center mt-3 ">
            <motion.button
            whileTap={{scale:0.8}}
              className="px-1 p-2 bg-blue-200 hover:bg-blue-200  hover:text-white border-solid border-2 border-blue-500  rounded-md  flex justify-center items-center gap-2"
              onClick={ExportToExcel}
            >
              Export To Excel <SiMicrosoftexcel />
            </motion.button>
          </div>
        </div>
      </div>
      <div className="">
        <ReactPaginate
          className="flex  gap-5 text-xl justify-center items-center "
          breakLabel="..."
          nextLabel="Next "
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default ProductList;
