import { AuthProvider } from "@/context/AuthContext";
import App from "next/app";
import React from "react";
import LoginLayout from "./login/LoginLayout";

export default function Home() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <LoginLayout />
      </AuthProvider>
    </React.StrictMode>
  );
}
