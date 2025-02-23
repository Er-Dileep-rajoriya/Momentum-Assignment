import mongoose from "mongoose";

const EntitySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
});

const ConfigurationSchema = new mongoose.Schema({
  flow: { type: String, required: true },
  entities_to_mock: [EntitySchema], // Use the defined schema
  is_db_mocked: { type: Boolean, default: false },
  db_config: {
    username: { type: String },
    password: { type: String },
    hostname: { type: String },
  },
  nodeInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Node", // reference of node model
  },
});

export const configurationModel = mongoose.model(
  "Configuration",
  ConfigurationSchema
);
