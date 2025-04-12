import AuthForm from "@/components/forms/AuthForm";
import FormContainer from "@/components/ui/FormContainer";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "E-Commerce Site Sign Up section",
};

const page = () => {
  return (
    <FormContainer title="Create Account">
      <AuthForm type="register" />
      <div className="mt-6 text-center">
        <span className="text-accent">Already have an account? </span>
        <Link href="/login" className="text-purple hover:text-purple-800">
          Sign In
        </Link>
      </div>
    </FormContainer>
  );
};

export default page;
