import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegIdCard } from "react-icons/fa";
import { GiFruitTree } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { registerUser, validateEmail } from "../../services/Services";
import { SET_LOGIN, SET_NAME } from "../../features/auth/authSlice/authSlice";
import Loader from "../../Util/Loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { name, email, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      name,
      email,
      password,
    };
    setIsLoading(true);
    
    try {
      const data = await registerUser(userData);
      console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/panel");
      setIsLoading(false);
      setformData(initialState);
      toast.success("Registered successfully");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
      <div className="h-screen sticky  bg-[url('https://pablomoratinos.es/wp-content/uploads/2020/01/clean-login-wordpress-2048x1338.jpg')] bg-cover  bg-center bg-no-repeat flex  justify-center items-center  ">
        <section className="border-b-2 border-gray-300  w-350 ">
          <div className=" items-center justify-center ">
            <div className="p-2  bottom-28    ">
              <div className="p-8 py-12 border-solid border bg-cardOverlay rounded-lg shadow-lg ">
                <form className="flex flex-col" onSubmit={register}>
                  <div className="flex gap-4 justify-center mb-8">
                    <p className="text-center text-3xl   text-white font-extrabold ">
                      Register
                    </p>
                    <h1 className=" justify-center text-3xl mt-1  text-white font-extrabold ">
                      <FaRegIdCard />
                    </h1>
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    value={name}
                    placeholder="  Nombre "
                    className="border-solid border-2 rounded-md mt-3  "
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="email"
                    required
                    value={email}
                    placeholder="  Email "
                    className="border-solid border-2 rounded-md mt-3  "
                    onChange={handleInputChange}
                  />
                  <input
                    type="password"
                    name="password"
                    required
                    value={password}
                    placeholder="  Password"
                    className="border-solid border-2 rounded-md mt-2"
                    onChange={handleInputChange}
                  />
                  <input
                    type="password"
                    name="password2"
                    required
                    value={password2}
                    placeholder="  Confirm-Password"
                    className="border-solid border-2 rounded-md mt-2"
                    onChange={handleInputChange}
                  />
                  <button
                    type="submit"
                    className="p-1 px-2 bg-blue-500 rounded-md mt-2 text-white"
                  >
                    Register
                  </button>

                  <p className="text-center mt-2">
                    Already an account?
                    <Link to="/login">
                      <span className="font-bold cursor-pointer justify-center">
                        Login
                      </span>
                    </Link>
                  </p>
                  <div className="flex justify-center mt-6 gap-2">
                    <p className="font-extrabold text-2xl">AGRODOLORES</p>
                    <h1 className="text-2xl font-bold">
                      <GiFruitTree />
                    </h1>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Register;
