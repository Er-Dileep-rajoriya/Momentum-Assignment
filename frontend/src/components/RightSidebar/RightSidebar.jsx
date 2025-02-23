import React, { useState } from "react";
import DependenciesPanel from "./DependenciesPanel";
import DatabaseConfig from "./DatabaseConfig";
import Cart_Campaign from "./Cart_Campaign";
import SelectedFlow from "./SelectedFlow";
import SaveButton from "./SaveButton";

function RightSidebar() {
  const [config, setConfig] = useState({
    flow: "",
    entities_to_mock: [],
    is_db_mocked: false,
    db_config: {
      username: "",
      password: "",
      hostname: "",
    },
  });

  return (
    <div className="w-[25vw] h-[93vh] bg-[#363636] text-[#FFFFFF] pl-2 pr-4 flex flex-col gap-4 overflow-auto custom-scrollbar">
      <Cart_Campaign />
      <SelectedFlow config={config} setConfig={setConfig} />
      <DependenciesPanel config={config} setConfig={setConfig} />
      <DatabaseConfig config={config} setConfig={setConfig} />
      <SaveButton config={config} setConfig={setConfig} />
    </div>
  );
}

export default RightSidebar;
