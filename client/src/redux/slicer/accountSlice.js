import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from "redux-persist";
const initialState= { 
  id: null,
  nickname: null,
  isLogin: false,
  accessToken:null,
  walletAddress:null,
};

const accountSlice = createSlice({
  name: 'accountSlice',
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
      state.isLogin = true;
      state.accessToken = action.payload.accessToken;
      state.walletAddress = action.payload.walletAddress;
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  }
});
export default accountSlice;
export const { login } = accountSlice.actions;
