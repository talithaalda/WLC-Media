// ProfileContext.js
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [linkMaps, setLinkMaps] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [phone, setPhone] = useState("");
  const fetchData = async () => {
    try {
      const response = await fetch("/api/profile/1");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setCompanyName(data.companyName);
      setLocation(data.location);
      setLinkMaps(data.linkMaps);
      setEmail(data.email);
      setInstagram(data.instagram);
      setProfile(data);
      setPhone(data.phone);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  const handleError = (event) => {
    // General function for formatting fields
    const { name, value } = event.target;
    switch (name) {
      case "company":
        setCompanyName(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "linkMaps":
        setLinkMaps(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "instagram":
        setInstagram(value);
        break;
      case "phone":
        setPhone(value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // console.log(profile);
      if (profile.length !== 0) {
        // Jika data sudah ada, lakukan update
        const response = await axios.put(`/api/profile/1`, {
          // Ganti dengan properti id yang sesuai
          companyName: values.company,
          location: values.location,
          linkMaps: values.linkMaps,
          email: values.email,
          instagram: values.instagram,
          phone: values.phone,
        });
      } else {
        // Jika data belum ada, lakukan create
        const response = await axios.post("/api/profile/create", {
          companyName: values.company,
          location: values.location,
          linkMaps: values.linkMaps,
          email: values.email,
          instagram: values.instagram,
          phone: values.phone,
        });
      }

      setUpdateSuccess(true);
    } catch (error) {
      console.error("Gagal mengelola data:", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <ProfileContext.Provider
      value={{
        companyName,
        location,
        linkMaps,
        email,
        instagram,
        phone,
        updateSuccess,
        fetchData,
        handleError,
        handleSubmit,
        setUpdateSuccess,
        profile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
