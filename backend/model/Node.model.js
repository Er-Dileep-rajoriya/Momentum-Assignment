import mongoose from "mongoose";

const NodeSchema = new mongoose.Schema({
  //   nodeId: { type: String, required: true, unique: true },
  nodeName: { type: String, required: true },
});

export const NodeModel = mongoose.model("Node", NodeSchema);
