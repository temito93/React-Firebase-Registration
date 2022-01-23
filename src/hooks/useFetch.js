import { useState } from "react";

export const useFetch = (url, requestConfig) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState({
    isFetching: false,
    isFetched: false,
    isFailed: false,
    errorMessage: null,
  });

  const fetchData = async () => {
    setError((prev) => {
      return {
        ...prev,
        isFetching: true,
        isFetched: false,
        isFailed: false,
        errorMessage: null,
      };
    });
    try {
      const response = await fetch(url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? requestConfig.body : null,
      });

      if (!response.ok) {
        throw new Error(`Something went wrong: ${response.status}`);
      }
      const data = await response.json();

      if (requestConfig.method === "GET") {
        setUsers((prev) => {
          return [...prev, data];
        });
      }
      setError((prev) => {
        return {
          ...prev,
          isFailed: false,
          isFetched: true,
          isFetching: false,
        };
      });
    } catch (error) {
      setError((prev) => {
        return {
          ...prev,
          isFetching: false,
          isFailed: true,
          errorMessage: error.message,
        };
      });
    }
  };
  return { users, error, fetchData };
};
