// UserContext.js
import axios from "axios";
import { useRouter } from "next/router";
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  let [deleteSuccess, setDeleteSuccess] = useState(false);
  let [createSuccess, setCreateSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  const [user1, setUser1] = useState([]);
  const { id } = router.query;
  const fetchData = async () => {
    try {
      const response = await fetch("/api/user");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchDataById = async () => {
    try {
      if (!id) {
        return;
      }
      const rute = `/api/user/${id}`;
      const response = await fetch(rute);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setName(data.name);
      setEmail(data.email);
      setRole(data.role);
      setUser1(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Registration successful
        router.push({
          pathname: "/dashboard/user",
          query: { createSuccess: true },
        });
        // Handle success, e.g., redirect to login page
      } else {
        const errorData = await response.json();
        if (
          response.status === 400 &&
          errorData.message === "Email already in use"
        ) {
          // Handle email already in use error
          setError("Email is already in use");
        } else {
          // Handle other errors
          setError("Registration failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      // Handle other errors
    } finally {
      setSubmitting(false);
    }
  };
  const handleUpdate = async (values, { setSubmitting }) => {
    let response = "";
    try {
      response = await axios.put(`/api/user/${id}`, {
        name: values.name,
        email: values.email,
        role: values.role,
      });

      // Simpan informasi file ke dalam API route create
      setUser1(response.data);
      setUpdateSuccess(true);
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setSubmitting(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/user/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete data");
      } else {
        setDeleteSuccess(true);
      }

      // Update the state to reflect the changes
      setUser((prevuser) => prevuser.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting user data:", error);
    }
  };
  const handleError = (event) => {
    // General function for formatting fields
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "retypePassword":
        setRetypePassword(value);
        break;
      case "role":
        setRole(value);
        break;
      default:
        break;
    }
  };
  return (
    <UserContext.Provider
      value={{
        fetchData,
        user,
        deleteSuccess,
        createSuccess,
        setCreateSuccess,
        setDeleteSuccess,
        handleDelete,
        name,
        email,
        password,
        retypePassword,
        role,
        handleSubmit,
        handleError,
        error,
        fetchDataById,
        handleUpdate,
        updateSuccess,
        setUpdateSuccess,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
