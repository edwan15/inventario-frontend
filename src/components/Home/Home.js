import React from "react";
import { AiFillGithub, AiOutlineCloudServer } from "react-icons/ai";
import { FaUnity } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";
import { GrNode } from "react-icons/gr";
import IMAGE from "../../asset/inventary.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="  container mx-auto px-4 ">
      {" "}
      <div className="flex justify-around  p-4 mx-auto  items-center mb-16">
        <div className="">
          <h1 className="text-3xl text-white">
            <AiFillGithub />
          </h1>
        </div>
        <div className="flex  justify-around gap-2">
          <Link
            to="/register"
            className="p-1 px-2 rounded-md  text-white col-start-8 font-extrabold text-xl   "
          >
            register
          </Link>

          <Link
            to="/login"
            className="p-1 px-2 bg-blue-500 rounded-md text-white cursor-pointer font-extrabold text-xl "
          >
            login
          </Link>
        </div>
      </div>
      <div className=" grid grid-cols-2 justify-around items-center mt-10 px-20">
        <div className=" px-20 justify-center items-center ">
          <h1 className=" text-white text-5xl">
            {" "}
            Inventario & Stock De productos{" "}
          </h1>
          <h2 className="text-white text-xl mt-8">
            Sistema de inventario y control de Administracion para ser integrado
            en tiempo real utilizando una base de Datos implementada en la nube.{" "}
          </h2>
          <div className=" flex mt-10  gap-3  items-center">
            <h1 className="text-2xl text-white">
              <FaUnity />
            </h1>
            <h1 className="text-2xl text-white">
              <AiOutlineCloudServer />
            </h1>
            <h1 className="text-2xl text-white">
              <DiMongodb />
            </h1>
            <h1 className="text-2xl text-white">
              <GrNode />
            </h1>
          </div>
        </div>
        <div className=" flex justify-center items-center p-4">
          <img src={IMAGE} alt="logo" className="w-460  " />
        </div>
      </div>
    </div>
  );
};

export default Home;
