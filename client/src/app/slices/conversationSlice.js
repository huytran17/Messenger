import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ValidateError,
  STRING,
  Reducer,
  Auth,
  Field,
  Server,
} from "../../constants/index";
import axios from "axios";

const initialState = {
  isOpen: false,
  data: null,
};

export const getConversationAsync = createAsyncThunk(
  Reducer.NAME.CONVERSATION + "/fetchConversation",
  async (cid) => {
    const conversation = await axios
      .get(`${Server.URL}:${Server.PORT}/conversations/${cid}`)
      .catch((error) => {
        console.error(error);
      });

    return conversation.data.data || null;
  }
);

export const conversationSlice = createSlice({
  name: Reducer.NAME.CONVERSATION,
  initialState,
  reducers: {
    changeData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getConversationAsync.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { changeData } = conversationSlice.actions;

export const selectConversation = (state) => state.conversation.data;

export default conversationSlice.reducer;
