"use client";
import { useRouter } from "next/navigation";
import React from "react";

export const useRouterPush = () => {
  const router = useRouter();
  return (url: string) => {
    router.push(url);
  };
};
