import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConfiguration } from "../../redux/configReducer";
import axios from "axios";
import toast from "react-hot-toast";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function SaveButton({ config, setConfig }) {
  const { configuration } = useSelector((store) => store.configureReducer);
  const dispatch = useDispatch();

  async function handleSaveConfig() {
    console.log(config);
    if (config?.entities_to_mock?.length <= 0) {
      toast.error("Pls Select Any Dependency");
      return;
    }

    if (!config?.flow) {
      toast.error("Pls Select Flow.");
      return;
    }

    // api calling
    try {
      const res = await axios.post(`${apiUrl}/api/configuration`, config);

      if (res?.data?.success) {
        dispatch(setConfiguration(config));
        toast.success(res?.data?.message);
        window.location.reload();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  }

  return (
    <div className="w-[25vw] h-14 fixed bottom-0 right-0 bg-[#363636] flex justify-end items-center border-1 border-gray-400">
      <button
        className="bg-[#009FF9] pt-2 pb-2 pr-4 pl-4 rounded mr-7"
        onClick={handleSaveConfig}
      >
        Save
      </button>
    </div>
  );
}

export default SaveButton;
