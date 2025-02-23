import React, { useEffect, useState } from "react";
import navigate_icon from "../../assets/navigate.png";

const dependencyArr = [
  { id: 1, name: "httpx" },
  { id: 2, name: "product_client" },
  { id: 3, name: "sqlalchemy.orm" },
  { id: 4, name: "cart_crud" },
  { id: 5, name: "cartModel" },
];

function DependenciesPanel({ config, setConfig }) {
  const [dependencies, setDependencies] = useState([]);

  useEffect(() => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      entities_to_mock: dependencies,
    }));
    // console.log(config);
  }, [dependencies, setConfig]);

  function handleCheckedDependency(item, evt) {
    const checked = evt.target.checked;

    if (checked) {
      setDependencies((prev) => [...prev, item]);
    } else {
      setDependencies((prev) => prev.filter((ele) => ele.id !== item.id));
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p>Dependencies</p>
        <p className="text-[14px] text-[#B7B7B7]">
          Select the ones you want to mock
        </p>
      </div>
      {dependencyArr.map((item) => (
        <div
          key={item.id}
          className="w-[100%] flex flex-row justify-between items-center"
        >
          <div className="flex gap-3 pl-1">
            <input
              type="checkbox"
              className="scale-140 accent-blue-500"
              onChange={(e) => handleCheckedDependency(item, e)}
            />
            <span>{item.name}</span>
          </div>
          <div>
            <img src={navigate_icon} alt="Navigate Icon" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default DependenciesPanel;
