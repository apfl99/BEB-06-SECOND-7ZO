import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from "redux-persist";
const initialState= { 
  login_id: null,
  nickname: null,
  isLogin: false,
  accessToken:null,
  address:null,
  eth_amount:null,
  token_amount:null,
  created_at:null,
};

const accountSlice = createSlice({
  name: 'accountSlice',
  initialState,
  reducers: {
    login: (state, action) => {
      state.login_id = action.payload.login_id;
      state.nickname = action.payload.nickname;
      state.isLogin = true;
      state.accessToken = action.payload.accessToken;
      state.address = action.payload.address;
      state.created_at = action.payload.created_at;
      state.eth_amount = action.payload.eth_amount;
      state.token_amount = action.payload.token_amount;
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  }
});
export default accountSlice;
export const { login } = accountSlice.actions;
