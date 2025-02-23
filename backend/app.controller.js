import { NodeModel } from "./model/Node.model.js";
import { configurationModel } from "./model/configuration.model.js";

// function to add graph nodes
export const addGraphNode = async (req, res) => {
  try {
    const { nodeName, dependencies } = req.body;

    if (!nodeName || !dependencies) {
      return res.status(400).json({
        success: false,
        message: "Node name or dependency is Missing.",
      });
    }

    const newNode = await NodeModel.create({ nodeName, dependencies });

    return res.status(201).json({
      success: true,
      message: "new Node is Created.",
      node: newNode,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

// function to get the node by id
export const getGraphNode = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "nodeId is Missing!.",
      });
    }

    const node = await NodeModel.findOne({ _id: id });

    if (!node) {
      return res.status(404).json({
        success: false,
        message: "node not found!",
      });
    }

    return res.status(201).json({
      success: true,
      message: "new Node is Created.",
      node: node,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

// set configuration of node
export const postConfiguration = async (req, res) => {
  try {
    const { flow, entities_to_mock, is_db_mocked, db_config } = req.body;

    console.log(req.body);

    if (!flow || !entities_to_mock || !db_config) {
      return res.status(400).json({
        success: false,
        message: "Something is Missing.",
      });
    }

    if (
      !is_db_mocked &&
      (!db_config.username || !db_config.password || !db_config.hostname)
    ) {
      return res.status(400).json({
        success: false,
        message: "Database Configuration Required.",
      });
    }

    // seting node
    const newNode = await NodeModel.create({ nodeName: flow });

    const newConfig = await configurationModel.create({
      flow,
      entities_to_mock,
      is_db_mocked,
      db_config,
      nodeInfo: newNode._id,
    });

    return res.status(201).json({
      success: true,
      message: "Configuration is Created.",
      configuration: newConfig,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

// 5) The existing configuration should be fetched from GET /configuration?flow=flow_name
// find the config using flow name
export const getConfigurationUsingFlowName = async (req, res) => {
  const { flow } = req.body;

  try {
    // find the config using flow name
    const config = await configurationModel.findOne({ flow });

    if (!config) {
      return res.status(404).json({
        success: false,
        message: "No Configuration Found.",
      });
    }

    return res.status(200).json({
      success: true,
      configuration: config,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const getAllConfigurations = async (req, res) => {
  try {
    const configurations = await configurationModel.find();

    return res.status(200).json({
      success: true,
      configurations,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};
