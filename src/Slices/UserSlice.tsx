import { jwtDecode } from "jwt-decode";
import { createSlice } from "@reduxjs/toolkit";
import { setJwt } from "./JwtSlice";
const userSlice = createSlice({
  name: "user",
  initialState: localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token") || "")
    : {},
  reducers: {
    setUser: (state, action) => {
        // localStorage.setItem("token", action.payload);
        state = action.payload;
        return state;
    },
    removeUser: (state) => {
    //   localStorage.removeItem("token");
      state = {};
      return state;
    },
  },
});

export const { removeUser ,setUser } = userSlice.actions;
export default userSlice.reducer;
