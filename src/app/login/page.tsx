import AuthForm from "@/components/forms/AuthForm";
import Button from "@/components/ui/Button";
import FormContainer from "@/components/ui/FormContainer";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description: "E-Commerce Site Login section",
};

const page = () => {
  return (
    <FormContainer title="Welcome Back">
      <AuthForm type="login" />
      <div className="mt-6 text-center">
        <Link
          href="/forgot-password"
          className="text-purple hover:text-purple-800"
        >
          <Button className="w-full mx-auto">Forgot Password</Button>
        </Link>
      </div>
      <div className="mt-10 text-center">
        <span className="text-accent">Don&apos;t have an account? </span>
        <Link href="/register" className="text-purple hover:text-purple-800">
          Register
        </Link>
      </div>
    </FormContainer>
  );
};

export default page;
