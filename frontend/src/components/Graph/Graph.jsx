import React, { useEffect, useState, useCallback } from "react";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import axios from "axios";
import {
  setConfigurations,
  setConfigurationByFlowName,
  setOpenConfigPage,
} from "../../redux/configReducer";
import { useDispatch, useSelector } from "react-redux";
import node_icon from "../../assets/node-icon.png";
import toast from "react-hot-toast";
import ConfigurationPage from "./Configuration";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function Graph() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const dispatch = useDispatch();
  const { configurations, openConfigPage } = useSelector(
    (store) => store.configureReducer
  );

  // Fetch configurations from API
  useEffect(() => {
    async function fetchConfigurations() {
      try {
        const res = await axios.get(`${apiUrl}/api/configurations`);
        if (res?.data?.configurations) {
          dispatch(setConfigurations(res.data.configurations));
        }
      } catch (error) {
        console.error("Error fetching configurations:", error);
      }
    }
    fetchConfigurations();
  }, [dispatch]);

  // Handle node click
  const onNodeClick = useCallback(
    async (event, node) => {
      const flowName = node.data.flow;
      if (!flowName) return;

      try {
        const res = await axios.post(`${apiUrl}/api/getConfiguration`, {
          flow: flowName,
        });

        if (res?.data?.success) {
          dispatch(setConfigurationByFlowName(res.data.configuration));
          dispatch(setOpenConfigPage(true));
        }
      } catch (err) {
        toast.error(
          err?.response?.data?.message || "Failed to load configuration"
        );
      }
    },
    [dispatch]
  );

  // Transform configurations into nodes & edges
  useEffect(() => {
    if (!configurations || configurations.length === 0) return;

    const newNodes = [];
    const newEdges = [];

    configurations.forEach((config, index) => {
      const dbConfig = config.db_config || {};
      const labelContent = (
        <div className="flex flex-col">
          <div className="pl-3 pr-3 pt-1 pb-1 flex flex-row justify-between items-start border-1 border-[#FFAD62]">
            <strong>{config.flow}</strong>
            <img src={node_icon} alt="Node Icon" />
          </div>
          <div className="pl-3 pr-3 pt-1 pb-1 flex flex-row justify-between items-start">
            <small>
              <span className="text-[#FFAD62]">is_db_mocked:</span>{" "}
              {config.is_db_mocked ? "True" : "False"}
            </small>
          </div>
          {dbConfig.username && (
            <div className="pl-3 pr-3 pt-1 pb-1 flex flex-row justify-between items-start">
              <small>
                <span className="text-[#FFAD62]">DB User:</span>{" "}
                {dbConfig.username}
              </small>
            </div>
          )}
          {dbConfig.hostname && (
            <div className="pl-3 pr-3 pt-1 pb-1 flex flex-row justify-between items-start">
              <small>
                <span className="text-[#FFAD62]">DB Host:</span>{" "}
                {dbConfig.hostname}
              </small>
            </div>
          )}
        </div>
      );

      newNodes.push({
        id: config._id,
        type: "default",
        position: { x: index * 300, y: 100 },
        data: { label: labelContent, flow: config.flow },
        style: {
          background: "transparent",
          border: "1px solid #FFAD62",
          cursor: "pointer",
          color: "white",
          padding: "0px",
        },
      });

      if (config.entities_to_mock?.length) {
        config.entities_to_mock.forEach((entity, idx) => {
          const entityNodeId = `${config._id}-entity-${idx}`;
          newNodes.push({
            id: entityNodeId,
            type: "default",
            position: { x: index * 300 + 100, y: 200 + idx * 100 },
            data: { label: entity.name },
            style: {
              background: "transparent",
              border: "1px solid #FFAD62",
              cursor: "pointer",
              color: "white",
            },
          });

          newEdges.push({
            id: `edge-${config._id}-${entityNodeId}`,
            source: config._id,
            target: entityNodeId,
          });
        });
      }
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [configurations]);

  return (
    <div className="flex-grow bg-[#1E1E1E] h-[90vh]">
      {!openConfigPage ? (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          fitView
        >
          <Background variant="dots" gap={20} size={0.5} color="#ccc" />
          <Controls />
        </ReactFlow>
      ) : (
        <ConfigurationPage />
      )}
    </div>
  );
}

export default Graph;
