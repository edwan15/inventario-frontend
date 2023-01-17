import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FaRegIdCard } from "react-icons/fa";
import { GiFruitTree } from "react-icons/gi";
// import Loader from '../../Util/Loader';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div>
      <div className="h-screen sticky  bg-[url('https://pablomoratinos.es/wp-content/uploads/2020/01/clean-login-wordpress-2048x1338.jpg')] bg-cover  bg-center bg-no-repeat flex  justify-center items-center  ">
        <ToastContainer />

        <section className="border-b-2 border-gray-300  w-350 ">
          <div className=" items-center justify-center ">
            <div className="p-2  bottom-28    ">
              <div className="p-8 py-12 border-solid border bg-cardOverlay rounded-lg shadow-lg ">
                <form action="" className="flex flex-col" onSubmit="">
                  <div className="flex gap-4 justify-center mb-8">
                    <p className="text-center text-3xl   text-white font-extrabold ">
                      Register
                    </p>
                    <h1 className=" justify-center text-2xl mt-2  text-white font-extrabold ">
                      <FaRegIdCard />
                    </h1>
                  </div>
                  <input
                    type="text"
                    placeholder="  Nombre "
                    className="border-solid border-2 rounded-md mt-3  "
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="  Email "
                    className="border-solid border-2 rounded-md mt-3  "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="  Password"
                    className="border-solid border-2 rounded-md mt-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="  Confirm-Password"
                    className="border-solid border-2 rounded-md mt-2"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="p-1 px-2 bg-blue-500 rounded-md mt-2 text-white"
                  >
                    Register
                  </button>

                  <p className="text-center mt-2">
                    Already an account?
                    <Link to="/">
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
    </div>
  );
};

export default Register;
