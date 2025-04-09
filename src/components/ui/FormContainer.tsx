import React, { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
  title: string;
}

const FormContainer: React.FC<FormContainerProps> = ({ children, title }) => (
  <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8 mt-14">
    <h2 className="text-xl font-bold text-secondary mb-8 text-center">
      {title}
    </h2>
    {children}
  </div>
);

export default FormContainer;
