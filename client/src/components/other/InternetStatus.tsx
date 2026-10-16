"use client";

import { useToast } from "@/hook/ToastContext";
import React, { useEffect } from "react";

const InternetStatus = () => {
  const { addToast } = useToast();

  useEffect(() => {
    const handleOffline = () => {
      addToast("You are offline. Check your internet connection.", "red");
    };

    const handleOnline = () => {
      addToast("You are back online!", "green");
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [addToast]);
  return null;
};

export default InternetStatus;
