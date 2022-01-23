import { useContext, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { RegistrationContext } from "../../store/registration-context";
import { checkIsValid } from "../../utils/form-utils/checkInputValid";
import Button from "../UI/Button";
import Input from "../UI/Input";

import classes from "./Registration.module.css";

const Regisration = () => {
  const { person, setPerson } = useContext(RegistrationContext);

  const { fetchData: registerUser } = useFetch(
    "https://react-7f42f-default-rtdb.firebaseio.com/users.json",
    {
      method: "POST",
      body: JSON.stringify({
        id: new Date().getTime().toString(),
        name: person.firstName.value,
        lastname: person.lastName.value,
        email: person.email.value,
        password: person.password.value,
      }),
    }
  );

  useEffect(() => {
    console.log(person);
  });

  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const name in person) {
      const item = person[name];
      const { value } = item;
      const { hasError, error } = checkIsValid(name, value);

      if (hasError) {
        setPerson((prev) => {
          return { ...prev, isFormValid: false };
        });
      }
      if (!name) {
        setPerson((prev) => {
          return { ...prev, isFormValid: true };
        });
      }
    }

    if (!person.isFormValid) {
      console.log("Failed to register");
      setShowError(true);
      return;
    }
    setShowError(false);
    registerUser();
    console.log("Registered succesfully");
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let isFormValid = true;

    const { hasError, error } = checkIsValid(
      name,
      value,
      person.password.value
    );

    for (const key in person) {
      const item = person[key];
      if (key === name && hasError) {
        isFormValid = false;
        break;
      } else if (key !== name && item.hasError) {
        isFormValid = false;
        break;
      }
    }

    setPerson((prev) => {
      return {
        ...prev,
        [name]: {
          value: value,
          hasError: hasError,
          errorMessage: error,
        },
        isFormValid: isFormValid,
      };
    });
  };

  return (
    <div className={classes.container}>
      <h2>Regisration</h2>
      <form onSubmit={handleSubmit}>
        <Input
          className={classes["container-div"]}
          htmlFor="firstName"
          labelName="Firstname"
          type="text"
          value={person.firstName.value}
          onChange={handleChange}
          name="firstName"
        />

        {person.firstName.hasError && person.firstName.errorMessage && (
          <p className={classes.error}>{person.firstName.errorMessage}</p>
        )}

        <Input
          className={classes["container-div"]}
          htmlFor="lastName"
          labelName="Lastname"
          type="text"
          value={person.lastName.value}
          onChange={handleChange}
          name="lastName"
        />

        {person.lastName.hasError && person.lastName.errorMessage && (
          <p className={classes.error}>{person.lastName.errorMessage}</p>
        )}

        <Input
          className={classes["container-div"]}
          htmlFor="email"
          labelName="Email"
          type="email"
          value={person.email.value}
          onChange={handleChange}
          name="email"
        />

        {person.email.hasError && person.email.errorMessage && (
          <p className={classes.error}>{person.email.errorMessage}</p>
        )}

        <Input
          className={classes["container-div"]}
          htmlFor="password"
          labelName="Password"
          type="password"
          value={person.password.value}
          onChange={handleChange}
          name="password"
        />

        {person.password.hasError && person.password.errorMessage && (
          <p className={classes.error}>{person.password.errorMessage}</p>
        )}

        <Input
          className={classes["container-div"]}
          htmlFor="confirmPassword"
          labelName="Confirm password"
          type="password"
          value={person.confirmPassword.value}
          onChange={handleChange}
          name="confirmPassword"
        />

        {person.confirmPassword.hasError &&
          person.confirmPassword.errorMessage && (
            <p className={classes.error}>
              {person.confirmPassword.errorMessage}
            </p>
          )}

        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Regisration;
