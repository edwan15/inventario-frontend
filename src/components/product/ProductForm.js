import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { RiProductHuntFill } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { VscSignIn, VscSignOut } from "react-icons/vsc";

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  return (
    <div className=" border-solid border-2  rounded-lg shadow-xl max-w-lg flex bg-cardOverlay">
      <div className="flex justify-start items-start p-4 text-lg">
        <form onSubmit={saveProduct}>
          <div className="flex flex-col border-solid border-2 border-gray-400 rounded-md p-2">
            <label className="mb-2 font-bold">Imagen del Producto</label>
            <code className="font-extrabold mb-3">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              className="border-solid  p-2 rounded-md mb-3 border-gray-400 border-2"
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview && imagePreview.length !== 0 ? (
              <div className="justify-center flex">
                <img src={imagePreview} alt="produmotract" required />
              </div>
            ) : (
              <p>Agrega una imagen</p>
            )}

            {/* 
            {imagePreview != null ? (
              <div className="justify-center flex">
                <img src={imagePreview} alt="produmotract" />
              </div>
            ) : (
              <p>No image set for this poduct.</p>
            )}  */}
          </div>
          <div className="flex flex-col p-4">
            <label className=" gap-2 flex justify-center ">
              <RiProductHuntFill /> Nombre Producto:
            </label>
            <input
              className="outline-none rounded-sm shadow-md mb-2"
              type="text"
              placeholder="  Nombre del Producto"
              name="name"
              value={product?.name}
              onChange={handleInputChange}
            />

            <label className=" gap-2 flex justify-center ">
              {" "}
              <BiCategoryAlt />
              Categoria Producto
            </label>
            <input
              required
              className="flex outline-none rounded-sm shadow-md mb-2"
              type="text"
              placeholder="  Categoria  Producto"
              name="category"
              value={product?.category}
              onChange={handleInputChange}
            />

            <label className=" gap-2 flex justify-center ">
              <VscSignIn />
              Entradas Producto
            </label>
            <input
              className="outline-none rounded-sm shadow-md mb-2"
              type="text"
              placeholder="  Entradas"
              name="entradas"
              value={product?.entradas}
              onChange={handleInputChange}
            />

            <label className=" gap-2 flex justify-center ">
              <VscSignOut />
              Salidas Producto:
            </label>
            <input
              className="outline-none rounded-sm shadow-md mb-2"
              type="text"
              placeholder="  Salidas"
              name="salidas"
              value={product?.salidas}
              onChange={handleInputChange}
            />
          </div>
          <div className="text-red-500 text-lg font-extrabold mb-2 ">
            {" "}
            Stock Actual : <span className="text-red-500 font-extrabold text-2xl"> {product?.entradas - product?.salidas}</span>
          </div>

          <label>Product Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />

          <div className="">
            <button
              className=" mt-5 p-1 px-2 bg-red-400 rounded-md"
              type="submit"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
