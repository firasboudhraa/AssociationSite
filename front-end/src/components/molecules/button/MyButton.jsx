import React from "react";
import LoginIcon from "@mui/icons-material/AccountCircle";

const MyBtn = ({ textContent }) => {
  return (
    <div
      className={`relative bg-gradient-to-r from-pink-500 to-red-500 cursor-pointer px-4 py-2 text-white font-bold text-center rounded-full shadow-lg transform transition-transform hover:scale-110 hover:bg-gradient-to-r hover:from-pink-600 hover:to-red-600 hover:shadow-xl`}
    >
      <LoginIcon className="mr-2" />
      {textContent}
    </div>
  );
};

export default MyBtn;
