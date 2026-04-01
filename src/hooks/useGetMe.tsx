"use client";
import { setUserData } from "@/redux/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetMe = (enabledProp: boolean) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (enabledProp === false) {
      return;
    }

    const getMe = async () => {
      try {
        const response = await axios.get("/api/user/me");
        dispatch(setUserData(response.data.user));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getMe();
  }, [enabledProp, dispatch]);

  return null;
};

export default useGetMe;