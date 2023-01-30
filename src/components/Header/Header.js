import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectName, SET_LOGIN } from "../../features/auth/authSlice/authSlice";
import { logoutUser } from "../../services/Services";
import { motion } from "framer-motion";
const Header = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const logout = async () => {
    await logoutUser();
    await dispath(SET_LOGIN(false));
    navigate("/");
  };

  return (
    <div>
      <div className="flex justify-between px-4 py-9">
        <div className="text-3xl">
          Welcome , <span className="font-bold text-red-500">{name}</span>
        </div>
        <div>
          <motion.button
          whileHover={{scale:1.1}}
          whileTap={{scale:0.9}}
            className="p-1 px-2 rounded-lg bg-red-400 text-white "
            onClick={logout}
          >
            Logout
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Header;
