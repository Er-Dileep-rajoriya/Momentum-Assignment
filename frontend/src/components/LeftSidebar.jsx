import React from "react";
import home_icon from "../assets/home-icon.png";
import history_icon from "../assets/history-icon.png";
import git_icon from "../assets/git.png";
import repo_icon from "../assets/repo.png";
import user_icon from "../assets/user.png";

function LeftSidebar() {
  return (
    <div className="w-11 h-[88vh] bg-[#363636] flex flex-col justify-between items-center pt-6 pb-4">
      <div className="w-full flex flex-col gap-8 justify-center items-center">
        <img src={home_icon} alt={home_icon} className="h-4 cursor-pointer" />
        <img
          src={history_icon}
          alt={history_icon}
          className="h-5 cursor-pointer"
        />
        <img src={repo_icon} alt={repo_icon} className="h-6 cursor-pointer" />
        <img src={git_icon} alt={git_icon} className="h-6 cursor-pointer" />
      </div>
      <div>
        <img src={user_icon} alt={user_icon} className="h-7 cursor-pointer" />
      </div>
    </div>
  );
}

export default LeftSidebar;
