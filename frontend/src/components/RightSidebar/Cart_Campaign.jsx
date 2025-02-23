import React from "react";
import commit_icon from "../../assets/commit-icon.png";

function Cart_Campaign() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xl font-bold">cart_campaign</p>
      <div>
        <span className="flex flex-row justify-items-start items-center gap-2">
          <img src={commit_icon} alt={commit_icon} className="h-3" />
          <p>Last 2 commits scanned</p>
        </span>
        <span className="flex flex-row justify-items-start items-center gap-2">
          <img src={commit_icon} alt={commit_icon} className="h-3" />
          <p>5 entry points identified</p>
        </span>
      </div>
    </div>
  );
}

export default Cart_Campaign;
