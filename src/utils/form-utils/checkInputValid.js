export const checkIsValid = (name, value, password, dbEmail) => {
  let hasError = false;
  let error = "";

  switch (name) {
    case "firstName":
    case "lastName": {
      if (value.trim() === "") {
        hasError = true;
        error = "Please enter correct name";
      } else if (!/^[a-zA-Z ]+$/.test(value)) {
        hasError = true;
        error = "Invalid name, Avoid special characters";
      } else {
        hasError = false;
        error = "";
      }
      break;
    }

    case "email": {
      if (value.trim() === "") {
        hasError = true;
        error = "Please enter email";
      } else if (
        !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
          value
        )
      ) {
        hasError = true;
        error = "Invalid email";
      } else if (dbEmail === value.trim()) {
        hasError = true;
        error = "Email already Exists";
      } else {
        hasError = false;
        error = "";
      }

      break;
    }
    case "password": {
      if (value.trim() === "") {
        hasError = true;
        error = "Please enter password";
      } else if (value.trim().length < 8) {
        hasError = true;
        error = "Password must have at least 8 characters";
      } else {
        hasError = false;
        error = "";
      }
      break;
    }
    case "confirmPassword": {
      if (value.trim() !== password) {
        hasError = true;
        error = "Password doesnt match";
      } else {
        hasError = false;
        error = "";
      }
      break;
    }

    default:
      break;
  }
  return { hasError, error };
};
