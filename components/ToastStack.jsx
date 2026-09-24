"use client";

import { ToastContainer } from "react-toastify";

export default function ToastStack() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2600}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="dark"
    />
  );
}
