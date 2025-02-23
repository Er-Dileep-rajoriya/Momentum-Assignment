import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import {
  getAllConfigurations,
  getConfigurationUsingFlowName,
  postConfiguration,
} from "./app.controller.js";
import { connectToDB } from "./mongoose.config.js";
dotenv.config();
const port = process.env.PORT || 3500;
const app = express();

app.use(bodyParser());
app.use(cors());

app.post("/api/configuration", postConfiguration);
app.post("/api/getConfiguration", getConfigurationUsingFlowName);
app.get("/api/configurations", getAllConfigurations);

app.listen(port, () => {
  console.log(`Server is Listening on Port : ${port}`);
  connectToDB();
});
