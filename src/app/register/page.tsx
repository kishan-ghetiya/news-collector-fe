import { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "E-Commerce Site Sign Up section",
};

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center py-5">
      <RegisterForm />
    </div>
  );
};

export default page;
