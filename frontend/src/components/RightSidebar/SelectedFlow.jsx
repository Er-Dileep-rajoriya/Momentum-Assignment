import React, { useEffect, useState } from "react";

function SelectedFlow({ config, setConfig }) {
  const [flow, setFlow] = useState("flow-1");

  useEffect(() => {
    setConfig({ ...config, flow: flow });
    // console.log(config);
  }, [flow, setConfig]);

  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium">Selected flow</p>
      <select
        name="flow"
        className="w-full h-10 pl-3 border-1 border-[#D9D9D9] bg-[#363636]"
        onChange={(e) => setFlow(e.target.value)}
      >
        <option value="flow-1">flow-1</option>
        <option value="flow-2">flow-2</option>
        <option value="flow-3">flow-3</option>
        <option value="flow-4">flow-4</option>
      </select>
    </div>
  );
}

export default SelectedFlow;
