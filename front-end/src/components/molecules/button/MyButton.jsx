import React from "react";
import LoginIcon from "@mui/icons-material/AccountCircle";

const MyBtn = ({ textContent, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`relative bg-gradient-to-r from-pink-500 to-red-500 cursor-pointer px-4 py-2 text-white font-bold text-center rounded-full shadow-lg transform transition-transform hover:scale-110 hover:bg-gradient-to-r hover:from-pink-600 hover:to-red-600 hover:shadow-xl flex items-center justify-center`}
    >
      <LoginIcon className="mr-2" />
      {textContent}
    </button>
  );
};

export default MyBtn;
