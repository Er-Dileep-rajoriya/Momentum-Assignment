import React from "react";
import navIcon from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="h-[7vh] w-full bg-[#363636] flex gap-3">
      <div className="flex pl-1 pt-3">
        <img src={navIcon} alt={navIcon} className="h-7" />
      </div>
      <p className="h-[100%] flex justify-center items-center text-[#FFFFFF] text-[16px]">
        Configure Flows
      </p>
    </nav>
  );
}

export default Navbar;
