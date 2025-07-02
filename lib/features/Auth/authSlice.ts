import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { checkUser, createUser, loginUser } from "./authAPI";


export interface AuthSliceState {
  user: { username: string; id: string } | null;
  status: "idle" | "loading" | "failed";
}

const initialState: AuthSliceState = {
  user: null,
  status: "idle",
};

export const authSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: (create) => ({
    createUserAsync: create.asyncThunk(
      async (userData: {phoneNumber:Number,username:string,password:string}) => {
        const response = await createUser(userData);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.user = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },

    ),
    loginUserAsync: create.asyncThunk(
      async (userData: {username:string,password:string}) => {
        const response = await loginUser(userData);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.user = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
    checkUserAsync: create.asyncThunk(
      async () => {
        const response = await checkUser();
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.user = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    )
}),
  selectors: {
    selectUser: (user) => user.user,
  },
});

export const {selectUser} = authSlice.selectors;
export const { createUserAsync, loginUserAsync, checkUserAsync } = authSlice.actions;