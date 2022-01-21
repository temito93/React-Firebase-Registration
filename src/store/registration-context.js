import React, { createContext, useState } from "react";

export const RegistrationContext = createContext();

export const RegistrationProvider = (props) => {
  const [person, setPerson] = useState({
    firstName: { value: "", hasError: true, errorMessage: "" },
    lastName: { value: "", hasError: true, errorMessage: "" },
    email: { value: "", hasError: true, errorMessage: "" },
    password: { value: "", hasError: true, errorMessage: "" },
    confirmPassword: {
      value: "",
      hasError: true,
      errorMessage: "",
    },
    isFormValid: false,
  });

  return (
    <RegistrationContext.Provider value={{ person, setPerson }}>
      {props.children}
    </RegistrationContext.Provider>
  );
};
