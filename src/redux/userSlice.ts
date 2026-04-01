import { IUser } from "@/models/userModel";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface IUserState {
  userData: IUser | null;
}

// Define the initial state using that type
const initialState: IUserState = {
  userData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUser>) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;