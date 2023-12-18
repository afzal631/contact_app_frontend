import React, { useContext } from "react";
import Logo from "../../assets/public/Logo.svg";
import { Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { user_context } from "../../App";

function Header({ username }) {
  const { logout } = useContext(user_context);
  const user = username?.split("");

  return (
    <motion.div
      initial={{ y: "-80%" }}
      animate={{ y: "0%" }}
      className="absolute top-0 bg-[#6666ff] w-[80%] justify-between flex items-center rounded-bl-2xl rounded-br-2xl px-[0.9rem] py-[0.6rem] "
      style={{ boxShadow: "0rem 0rem 1rem #6666ff" }}
    >
      <div className="flex items-center gap-3">
        <img src={Logo} alt="logo" className="w-[2rem]" />
        <span className="text-lg font-bold">CONTACT APP</span>
      </div>
      <div
        className="flex items-center  font-semibold gap-3 cursor-pointer"
        onClick={() => logout()}
      >
        {username ? username.toUpperCase() : "user"}{" "}
        <Avatar>{user ? user[0]?.toUpperCase() : "U"}</Avatar>
      </div>
    </motion.div>
  );
}

export default Header;
