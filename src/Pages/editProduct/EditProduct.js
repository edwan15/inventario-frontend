import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../components/product/ProductForm";
import {
  getProduct,
  getProducts,
  updateProduct,
  selectIsLoading,
  selectProduct,
} from "../../features/product/ProductSlice";
import Loader from "../../Util/Loader";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productEdit = useSelector(selectProduct);
  const isLoading = useSelector(selectIsLoading);
  const [product, setProduct] = useState(productEdit);
  const [productImage, ] = useState("")
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getProduct(id));    
  }, [dispatch , id]);

  useEffect(() => {
    setProduct(productEdit);
   
    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );
    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    )
  }, [productEdit])

  const handleInputChange = (e) => {
    const {value , name }  = e.target;
    setProduct({ ...product, [name]: value });
  };

    // const handleImageChange = (e) => {
    //   setProductImage(e.target.files[0]);
    //   setImagePreview(URL.createObjectURL(e.target.files[0]));
    // };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product?.name);
     formData.append("entradas", product?.entradas);
     formData.append("salidas", product?.salidas);
     formData.append("description", description);
       if (productImage) {
         formData.append("image", productImage);
       }

     
     console.log(...formData);

     await dispatch(updateProduct({ id, formData }));
     await dispatch(getProducts());
     navigate("/panel");

  }
  

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      {isLoading && <Loader />}
      <h3 className="text-2xl">Editar Producto</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        // handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default EditProduct;
