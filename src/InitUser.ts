"use client";
import { useSession } from "next-auth/react";
import React from "react";
import useGetMe from "./hooks/useGetMe";

const InitUser = () => {
  const { status } = useSession();
  if (status === "authenticated") {
    useGetMe(status === "authenticated");
  }
  return null;
};

export default InitUser;
