import React, { ReactNode } from "react";
import clsx from "clsx";

interface FormContainerProps {
  children: ReactNode;
  title: string;
  variant?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
};

const FormContainer: React.FC<FormContainerProps> = ({
  children,
  title,
  variant = "md",
}) => {
  return (
    <div className="mx-5">
      <div
        className={clsx(
          "mx-auto bg-white rounded-xl shadow-md p-8 mt-14 mb-14",
          sizeClasses[variant]
        )}
      >
        <h2 className="text-xl font-bold text-secondary mb-8 text-center">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
