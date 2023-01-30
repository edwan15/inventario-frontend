import React from "react";
import {motion} from "framer-motion"
const Card = ({ icon, title, count }) => {
  return (
    <motion.div whileHover={{scale:0.9}} className={" flex justify-center items-start gap-2 rounded-lg  border-2 border-blue-500 p-4 shadow-md max-w-xs cursor-pointer hover:bg-blue-300 hover:text-white"}>
      {" "}
      <div className="flex justify-center items-center ">
        <h1 className="flex justify-center items-center text-3xl fond-bold mb-4">
          {icon}
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center">{title}</h1>
        <h1> {count} </h1>
      </div>
    </motion.div>
  );
};

export default Card;
