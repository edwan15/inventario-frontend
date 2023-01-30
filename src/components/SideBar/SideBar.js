import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { SlDirections } from "react-icons/sl";
import { BiSearchAlt2, BiSupport } from "react-icons/bi";
import { motion } from "framer-motion";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import { GrDashboard } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import Menu from "../../data/Sidebar";
import SideBarItem from "./SideBarItem";
import { Link } from "react-router-dom";
import Agro from "../../asset/agro.png";

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMenu, setIsMenu] = useState(false);
  // const toggle = () => {
  //   setIsOpen(!isOpen);
  // };
  const navigate = useNavigate();

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <header className="grid sm:flex ">
      {" "}
      <div
        className={` hidden sm:block bg-blue-300 p-5 pt-8   ${
          isOpen ? " w-30  md:w-72 " : " w-0 sm:w-24  "
        } relative duration-500`}
      >
        <div className="inline-flex gap-5  justify-center items-center">
          <p
            className="text-4xl font-bold mt-1   text-white cursor-pointer "
            onClick={goHome}
          >
            <AiFillGithub />
          </p>
          <h1
            className={`origin-left text-2xl font-bold duration-500    ${
              !isOpen && "scale-0"
            }`}
          >
            DashBoard
          </h1>
        </div>

        <SlDirections
          className=" text-4xl rounded-full bg-white p-2 cursor-pointer absolute -right-3 top-9  text-blue-500 border border-gray-500"
          onClick={() => setIsOpen(!isOpen)}
        />

        <div className=" flex items-center   bg-white rounded-md mt-6 px-4 py-2 ">
          <BiSearchAlt2 className="text-lg  origin-left cursor-pointer" />
          <input
            type="search"
            placeholder=" Search"
            className="w-full focus:outline-none"
          />
        </div>

        {/* <div className=" inline-flex gap-5 mt-8 justify-center items-center   ">
          <RiDirectionFill className=" inline-block float-left  text-4xl rounded-full  border border-gray-500  mr-2 cursor-pointer bg-white " />
          <h1
            className={`origin-left text-2xl font-extrabold duration-500    ${
              !isOpen && "scale-0"
            }`}
          >
            DashBoard
          </h1>
        </div> */}

        <div>
          {Menu.map((product, index) => {
            return (
              <SideBarItem key={index} product={product} isOpen={isOpen} />
            );
          })}
        </div>
      </div>
      <div className="flex bg-blue-300  sm:hidden justify-between p-4 py-5">
        {/* <div className="flex  items-center px-4 ">
          <Link to={"/panel"}>
            <div className="p-2  text-2xl rounded-full bg-white">
              <MdAgriculture />
            </div>
          </Link>
        </div> */}

        <div>
          <img
            src={Agro}
            alt="agro"
            className="absolute -top-32 right-20 w-[330px]  "
          />
        </div>

        {isMenu && (
          <motion.div
            variants={variants}
            className="md:hidden w-35 bg-slate-100 shadow-xl rounded-lg flex-col  absolute top-20 right-0"
          >
            <Link to={"/panel"} onClick={() => setIsMenu(!isMenu)}>
              <motion.p
                initial="hidden"
                animate="visible"
                variants={variants}
                className="px-4 py-2 flex jus items-center gap-3 cursor-pointer hover:bg-boton hover:rounded-lg transition-all duration-100 ease-in-out  "
              >
                <GrDashboard />
                Panel
              </motion.p>
            </Link>
            <Link to={"/add-product"} onClick={() => setIsMenu(!isMenu)}>
              <motion.p
                initial="hidden"
                animate="visible"
                variants={variants}
                className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-boton hover:rounded-lg transition-all duration-100 ease-in-out  "
              >
                <MdAdd />
                Product+
              </motion.p>
            </Link>
            <Link to={"/profile"}>
              <motion.p
                initial="hidden"
                animate="visible"
                variants={variants}
                className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-boton hover:rounded-lg transition-all duration-100 ease-in-out "
              >
                <CgProfile /> Profile
              </motion.p>
            </Link>
            <Link to={"/contact-us"}>
              <motion.p
                initial="hidden"
                animate="visible"
                variants={variants}
                className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-boton hover:rounded-lg transition-all duration-100 ease-in-out "
              >
                <BiSupport /> Support
              </motion.p>
            </Link>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={variants}
              className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-boton hover:rounded-lg transition-all duration-100 ease-in-out "
            >
              New item <MdAdd />
            </motion.p>
          </motion.div>
        )}
        <div className="flex p-3 justify-end items-end rounded-full bg-white">
          <BsMenuButtonWideFill onClick={() => setIsMenu(!isMenu)} />
        </div>
      </div>
      <div className={`text-center  w-full bg-slate-50`}>
        <div className="bg-gray-200 ">{children}</div>
      </div>
    </header>
  );
};

export default SideBar;
