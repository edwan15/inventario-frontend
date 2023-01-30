import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ProductForm from '../../components/product/ProductForm';
import {
  selectIsLoading,
  createProduct,
} from "../../features/product/ProductSlice";
import Loader from '../../Util/Loader';


const initialState = {
  name: "",
  category: "",
  entradas : "", 
  salidas: "",
}

const AddProduct = () => {


  const dispatch = useDispatch()
  const navigate =  useNavigate()
  const [product, setProduct] = useState(initialState)
  const [description, setDescription] = useState("");
  const [productImage] = useState("")
  const [imagePreview] = useState("")
   const isLoading = useSelector(selectIsLoading)


   const {name , category , entradas , salidas} = product;

   const handleInputChange = (e) => {
    const {name,value } = e.target
    setProduct({...product,[name]:value})
   } 
   
  // const handleImageChange = (e) => {
  //   setProductImage(e.target.files[0]);

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setImagePreview(reader.result);
  //     }
  //   };
  //   reader.readAsDataURL(e.target.files[0]);

  //   setProductImage(e.target.files[0]);
  //   setImagePreview(URL.createObjectURL(e.target.files[0]));
  // };
    const generateKSKU = (category) => {
      const letter = category.slice(0, 3).toUpperCase();
      const number = Date.now();
      const sku = letter + "-" + number;
      return sku;
    };

    const saveProduct = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("sku", generateKSKU(category));
      formData.append("category", category);
      formData.append("entradas", Number(entradas));
      formData.append("salidas", salidas);
      formData.append("description", description);
      formData.append("image", productImage);

      console.log(...formData);

      await dispatch(createProduct(formData));

      navigate("/panel");
    };

  return (
    <div className='flex flex-col   justify-center items-center gap-5'>
      {isLoading && <Loader />}
      <h3 className="text-2xl">Agrega un Nuevo Producto</h3>
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
}

export default AddProduct