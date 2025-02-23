import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  configuration: null,
  configurations: [],
  configurationByFlowName: null,
  openConfigPage: false,
};

const configureSlice = createSlice({
  name: "Configure",
  initialState,
  reducers: {
    // actions
    setConfiguration: (state, action) => {
      state.configuration = action.payload;
    },
    setConfigurations: (state, action) => {
      state.configurations = action.payload;
    },
    setConfigurationByFlowName: (state, action) => {
      state.configurationByFlowName = action.payload;
    },
    setOpenConfigPage: (state, action) => {
      state.openConfigPage = action.payload;
    },
  },
});

export const {
  setConfiguration,
  setConfigurations,
  setConfigurationByFlowName,
  setOpenConfigPage,
} = configureSlice.actions;
export const configureReducer = configureSlice.reducer;
