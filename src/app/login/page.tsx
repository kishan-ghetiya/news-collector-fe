import React from "react";
import { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "E-Commerce Site Login section",
};

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center py-5">
      <LoginForm />
    </div>
  );
};

export default page;
