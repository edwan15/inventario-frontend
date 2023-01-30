import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import {motion} from "framer-motion"
const SideBarItem = ({ isOpen, product }) => {
  const [expandir, setExpandir] = useState(false);

  if (product.childrens) {
    return (
      <div className="">
        <div className="flex justify-between items-center">
          <span className="flex gap-4 mt-7">
            {product.icon && (
              <div className="  rounded-full bg-white p-2">{product.icon}</div>
            )}
            {isOpen && (
              <div
                className={`text-2xl font-extrabold origin-left duration-500 ${
                  !isOpen && "scale-0"
                } `}
              >
                {product.title}
              </div>
            )}
          </span>
          <MdKeyboardArrowRight
            className={`cursor-pointer text-2xl mt-7 hover:rotate-90 duration-500 ${
              !isOpen && "scale-0"
            }`}
            onClick={() => setExpandir(!expandir)}
          />
        </div>
        <div
          className={
            expandir
              ? "block duration-500 origin-center"
              : "hidden duration-500"
          }
        >
          {product.childrens.map((child, index) => {
            return (
              <div key={index} className=" border-2 rounded-md mt-2">
                <NavLink to={child.path}>
                  <div className="">
                    <div>
                      <span>
                        {child.icon && <div class>{child.icon} </div>}
                        {isOpen && (
                          <div className="text-lg px-5 m-1">{child.title}</div>
                        )}
                      </span>
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <NavLink
        to={product.path}
        className=" gap-5  justify-center items-center"
      >
        <motion.div
        whileHover={{scale:1.1}}
        whileTap={{scale:0.8}}
        
        className="flex gap-5 mt-3">
          <div to={product.path} className="mt-5 bg-white rounded-full p-2 ">
            {product.icon}
          </div>
          <div
            className={`origin-left  gap-5 mt-5 flex text-2xl font-bold duration-500    ${
              !isOpen && "scale-0"
            }`}
          >
            {product.title}
          </div>
        </motion.div>
      </NavLink>
    );
  }
};

export default SideBarItem;
