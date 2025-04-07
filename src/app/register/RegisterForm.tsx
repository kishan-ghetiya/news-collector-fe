"use client";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRegister } from "../hooks/useAuth";
import { RegisterPayload } from "../types/auth";
const RegisterForm = () => {
  const [form, setForm] = useState<RegisterPayload>({
    fullName: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: registerUser } = useRegister();

  const handleSubmit = () => {
    // const { error } = validateSchema(registerSchema, form);

    // if (error) {
    //   error.details.forEach((err) => toast.error(err.message));
    //   return;
    // }

    registerUser(form, {
      onSuccess: () => {
        toast.success("Registration successful!");
      },
      onError: (err) => {
        toast.error(err.message || "Registration failed");
      },
    });
  };

  return (
    <Container>
      <div className="text-4xl text-slate-700 font-semibold md:w-[400px] min-w-72 text-center">
        Sign Up
      </div>
      <hr className="w-full mt-3 mb-3" />
      <div className="flex flex-col gap-4">
        <div>
          <Input
            name="fullName"
            labelName="Name"
            inputType="text"
            onChange={handleChange}
            placeholder="Enter Name"
            id="name-input"
          />
        </div>
        <div>
          <Input
            name="email"
            labelName="Email"
            inputType="email"
            onChange={handleChange}
            placeholder="Enter Email"
            id="email-input"
          />
        </div>
        <div>
          <Input
            name="password"
            labelName="Password"
            inputType="password"
            onChange={handleChange}
            placeholder="Enter Password"
            id="password-input"
          />
          <div className="my-5">
            <Button name="Sign Up" onClick={handleSubmit} />
          </div>
        </div>
        <div className="text-sm text-center">
          Do not have an account?{" "}
          <span className="underline">
            <Link href={"/login"}>Log In</Link>
          </span>
        </div>
      </div>
    </Container>
  );
};

export default RegisterForm;
