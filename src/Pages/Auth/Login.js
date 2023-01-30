import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { SlLogin } from "react-icons/sl";
import { SET_LOGIN, SET_NAME } from "../../features/auth/authSlice/authSlice";
import { useDispatch } from "react-redux";
import { loginUser, validateEmail } from "../../services/Services";
import Loader from "../../Util/Loader";


const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      console.log(data.name);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/panel");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  // const initialState = {
  //   email: "",
  //   password: "",
  // };
  // const Login = () => {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [formData, setFormData] = useState(initialState);
  //   const { email, password } = formData;

  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({ ...formData, [name]: value });
  //   };

  //   const log = async (e) => {
  //     e.preventDefault();

  //     if (!email || !password) {
  //       return toast.error("completa todos los campos");
  //     }
  //     if (!validateEmail) {
  //       return toast.error("email invalido");
  //     }

  //     const userData = {
  //       email,
  //       password,
  //     };
  //     setIsLoading(true);

  //     try {
  //       const data = await loginUser(userData);
  //       console.log(data);
  //       await dispatch(SET_LOGIN(true));
  //       await dispatch(SET_NAME(data.name));
  //       navigate("/panel");
  //       setIsLoading(false);
  //     } catch (error) {
  //       setIsLoading(false);
  //       console.log(error)
  //     }
  //   };

  return (
    <>
      {isLoading && <Loader />}

      <div className="h-screen sticky  bg-[url('https://grupovillaescusa.com/wp-content/uploads/2018/03/Grupo-Villaescusa-obra-contruccion-nave-industrial-el-jimenado-empresa-de-contruccion-murcia-alicante-2.jpg')]  bg-cover  bg-center bg-no-repeat  ">
        <section>
          <div className="flex flex-cols-2 items-center justify-center py-16  ">
            <div className="max-w-lg max-h-[200px flex items-end   ">
              {/* <img src={login} alt="login" className=" h-[465px] w-[500px] " /> */}
            </div>
            <div className="p-2  bottom-28  mt-20   ">
              <div className="p-12  border-solid border-2  rounded-lg shadow-lg my-10 bg-cardOverlay">
                <form className="flex flex-col" onSubmit={login}>
                  <div className="flex gap-2 justify-center mb-6">
                    <p
                      className="text-center text-3xl text-white font-extrabold mb-5
                      "
                    >
                      {" "}
                      Login
                    </p>
                    <h1 className="text-2xl text-white mt-1">
                      <SlLogin />
                    </h1>
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    name="email"
                    placeholder="  Email "
                    className="border-solid border-2 rounded-md mt-3  "
                    onChange={handleInputChange}
                  />
                  <input
                    type="password"
                    required
                    value={password}
                    name="password"
                    placeholder="  Password"
                    className="border-solid border-2 rounded-md mt-2"
                    onChange={handleInputChange}
                  />
                  <button
                    className="p-1 px-2 bg-blue-500 rounded-md mt-2 text-white"
                    type="submit"
                  >
                    Enviar
                  </button>
                  <Link to="/reset">
                    <p className="text-lg text-white  p-1  border-solid border-b-2  border-emerald-400 font-extrabold hover:text-orange-600 cursor-pointer">
                      Reset Password
                    </p>
                  </Link>
                  <p className="text-center  text-2xl font-extrabold">--or--</p>
                  {/* <button
                    className="p-1 px-2 bg-orange-500 rounded-md mt-2 text-white flex items-center justify-center"
                    type="submit"
                    onClick=""
                  >
                    <FaGooglePlusG /> Login With Google
                  </button> */}
                  <p className="text-center  mt-2">
                    <Link to={"/"}>
                      <span className="text-lg text-white  p-1  border-solid border-b-2 border-emerald-400 font-extrabold hover:text-orange-600 cursor-pointer">
                        {" "}
                        Home
                      </span>
                    </Link>{" "}
                    Don't have an account?
                    <Link to="/register">
                      <span className="text-lg text-white  p-1  border-solid border-b-2 border-emerald-400 font-extrabold hover:text-orange-600 cursor-pointer">
                        Register
                      </span>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login
