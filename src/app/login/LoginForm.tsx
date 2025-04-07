"use client";
import React from "react";
import Link from "next/link";
import Container from "@/components/Container";
import Input from "@/components/Input";
import Button from "@/components/Button";
const LoginForm = () => {
  return (
    <Container>
      <div className="text-4xl text-slate-700 font-semibold md:w-[400px] min-w-72 text-center">
        Sign in
      </div>
      <hr className="w-full mt-3 mb-3" />
      <div className="flex flex-col gap-4">
        <div>
          <Input
            name="email"
            labelName="Email"
            inputType="email"
            onChange={() => {}}
            placeholder="Enter Email"
            id="email-input"
          />
        </div>
        <div>
          <Input
            name="name"
            labelName="Password"
            inputType="password"
            onChange={() => {}}
            placeholder="Enter Password"
            id="password-input"
          />
        </div>
        <div className="my-1">
          <Button name="Login" onClick={() => {}} />
        </div>
        <div className="text-sm text-center">
          Do not have an account?{" "}
          <span className="underline">
            <Link href={"/register"}>Sign Up</Link>
          </span>
        </div>
      </div>
    </Container>
  );
};

export default LoginForm;
