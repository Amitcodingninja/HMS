import { jwtDecode } from "jwt-decode";
import { createSlice } from "@reduxjs/toolkit";
import { setJwt } from "./JwtSlice";
const userSlice = createSlice({
  name: "user",
  initialState: localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token") || "")
    : {},
  reducers: {
    setUser: (_state, action) => {
      return action.payload;
    },
    removeUser: () => {
      return {};
    },
  },
});

export const { removeUser, setUser } = userSlice.actions;
export default userSlice.reducer;
