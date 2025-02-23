import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenConfigPage } from "../../redux/configReducer";
import { motion, AnimatePresence } from "framer-motion";
import { X, Database, Cpu, Server, User, Check, XCircle } from "react-feather";

function Configuration() {
  const dispatch = useDispatch();
  const { configurationByFlowName, openConfigPage } = useSelector(
    (store) => store.configureReducer
  );

  // Animation variants for the modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  if (!openConfigPage) return null;

  if (!configurationByFlowName) {
    return (
      <div className="text-white text-center mt-10">
        No Configuration Selected
      </div>
    );
  }

  const { flow, entities_to_mock, is_db_mocked, db_config } =
    configurationByFlowName;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative p-6 max-w-2xl w-full max-h-[90vh] bg-gray-800 rounded-lg shadow-2xl text-white overflow-y-auto custom-scrollbar "
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors duration-200"
            onClick={() => dispatch(setOpenConfigPage(false))}
          >
            <X size={24} />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-orange-400 flex items-center justify-center gap-2">
              <Cpu size={28} /> Configuration Details
            </h2>
          </div>

          {/* Flow Name */}
          <div className="mb-6 p-4 bg-gray-700 rounded-lg shadow-md">
            <p className="text-lg font-semibold flex items-center gap-2">
              <Server size={20} /> Flow Name:
            </p>
            <p className="text-gray-300 mt-2">{flow}</p>
          </div>

          {/* Entities to Mock */}
          <div className="mb-6 p-4 bg-gray-700 rounded-lg shadow-md">
            <p className="text-lg font-semibold flex items-center gap-2">
              <Cpu size={20} /> Entities to Mock:
            </p>
            {entities_to_mock?.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {entities_to_mock.map((entity, index) => (
                  <li
                    key={index}
                    className="text-gray-300 bg-gray-600 p-2 rounded-md hover:bg-gray-500 transition-colors duration-200"
                  >
                    {entity.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-300 mt-2">No entities to mock</p>
            )}
          </div>

          {/* Is DB Mocked */}
          <div className="mb-6 p-4 bg-gray-700 rounded-lg shadow-md">
            <p className="text-lg font-semibold flex items-center gap-2">
              <Database size={20} /> Is DB Mocked:
            </p>
            <p
              className={`mt-2 font-bold flex items-center gap-2 ${
                is_db_mocked ? "text-green-400" : "text-red-400"
              }`}
            >
              {is_db_mocked ? <Check size={18} /> : <XCircle size={18} />}
              {is_db_mocked ? "Yes" : "No"}
            </p>
          </div>

          {/* Database Configuration */}
          {db_config && (
            <div className="p-4 bg-gray-700 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-orange-400 flex items-center gap-2">
                <Database size={24} /> Database Configuration
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-lg font-semibold flex items-center gap-2">
                    <User size={18} /> Username:
                  </p>
                  <p className="text-gray-300 mt-2">
                    {db_config.username || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-semibold flex items-center gap-2">
                    <Server size={18} /> Hostname:
                  </p>
                  <p className="text-gray-300 mt-2">
                    {db_config.hostname || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Configuration;
