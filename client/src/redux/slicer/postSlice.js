import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from "redux-persist";
const initialState= { 
    posts: [],
    seletedPost:null,
};

const postSlice = createSlice({
  name: 'postSlice',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts=action.payload;
    },
    selectPost : (state, action) => {
        state.seletedPost=action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  }
});
export default postSlice;
export const { login } = postSlice.actions;
