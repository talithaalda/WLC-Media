// TalentContext.js
import axios from "axios";
import { useRouter } from "next/router";
import React, { createContext, useContext, useState, useEffect } from "react";
import currencyFormatter from "currency-formatter";
const TalentContext = createContext();

export const useTalent = () => useContext(TalentContext);

export const TalentProvider = ({ children }) => {
  const router = useRouter();
  const { id } = router.query;
  const [talents, setTalents] = useState([]);
  const [talent, setTalent] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  let [createSuccess, setCreateSuccess] = useState(false);
  const [startfromTikTok, setStartfromTikTok] = useState("");
  const [startfromIG, setStartfromIG] = useState("");
  const [startfromTikTokRaw, setStartfromTikTokRaw] = useState("");
  const [startfromIGRaw, setStartfromIGRaw] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  // const [categoryId, setCategoryId] = useState("");
  const [userIG, setUserIG] = useState("");
  const [userTikTok, setUserTikTok] = useState("");
  const [follIG, setFollIG] = useState("");
  const [follTikTok, setFollTikTok] = useState("");
  const [ERIG, setERIG] = useState("");
  const [ERTikTok, setERTikTok] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/talent");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setTalents(data);
    } catch (error) {
      console.error("Error fetching talents data:", error);
    }
  };
  const fetchDataById = async () => {
    try {
      if (!id) {
        return;
      }
      const rute = `/api/talent/${id}`;
      const response = await fetch(rute);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setName(data.name);
      setCategory(data.category);
      setUserIG(data.userIG);
      setUserTikTok(data.userTikTok);
      setFollIG(data.follIG);
      setFollTikTok(data.follTikTok);
      setERIG(data.ERIG);
      setERTikTok(data.ERTikTok);
      setStartfromIG(
        currencyFormatter.format(data.startfromIG, { code: "IDR" })
      );
      setStartfromTikTok(
        currencyFormatter.format(data.startfromTikTok, { code: "IDR" })
      );
      setStartfromIGRaw(data.startfromIG);
      setStartfromTikTokRaw(data.startfromTikTok);

      setTalent(data);
    } catch (error) {
      console.error("Error fetching talent data:", error);
    }
  };
  const fetchDataByIdShow = async () => {
    try {
      if (!id) {
        return;
      }
      const rute = `/api/talent/${id}`;
      const response = await fetch(rute);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setTalent(data);
    } catch (error) {
      console.error("Error fetching talent data:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const deleteImageResponse = await fetch(`/api/talent/image/edit/${id}`, {
        method: "DELETE",
      });
      if (!deleteImageResponse.ok) {
        throw new Error("Failed to delete image");
      }
      const response = await fetch(`/api/talent/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete data");
      } else {
        setDeleteSuccess(true);
      }

      // Update the state to reflect the changes
      setTalents((prevTalent) => prevTalent.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting talent data:", error);
    }
  };
  const handleDeleteShow = async (id) => {
    try {
      const imageInfoResponse = await fetch(
        `/api/talent/image/${talent.filename}`
      );
      if (imageInfoResponse.ok) {
        const deleteImageResponse = await fetch(
          `/api/talent/image/edit/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!deleteImageResponse.ok) {
          throw new Error("Failed to delete image");
        }
      }
      const deletetalentResponse = await fetch(`/api/talent/${id}`, {
        method: "DELETE",
      });
      if (!deletetalentResponse.ok) {
        throw new Error("Failed to delete talent data");
      }
      setDeleteSuccess(true);

      router.push({
        pathname: "/dashboard/talents",
        query: { deleteSuccess: true },
      });
      // Update the state to reflect the changes
    } catch (error) {
      console.error("Error deleting talent data:", error);
    }
  };
  const handleFormat = (event) => {
    // General function for formatting fields
    const { name, value } = event.target;
    let numericValue, formattedValue;
    switch (name) {
      case "startfromIG":
        numericValue = value.replace(/\D/g, "");
        formattedValue = currencyFormatter.format(numericValue, {
          code: "IDR",
        });
        setStartfromIG(formattedValue);
        setStartfromIGRaw(numericValue);
        break;
      case "startfromTikTok":
        numericValue = value.replace(/\D/g, "");
        formattedValue = currencyFormatter.format(numericValue, {
          code: "IDR",
        });
        setStartfromTikTok(formattedValue);
        setStartfromTikTokRaw(numericValue);
        break;
      case "name":
        setName(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "userIG":
        setUserIG(value);
        break;
      case "userTikTok":
        setUserTikTok(value);
        break;
      case "follIG":
        setFollIG(value);
        break;
      case "follTikTok":
        setFollTikTok(value);
        break;
      case "ERIG":
        setERIG(value);
        break;
      case "ERTikTok":
        setERTikTok(value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      // formData.append("categoryId", values.categoryId);
      formData.append("category", values.category);
      formData.append("userIG", values.userIG);
      formData.append("userTikTok", values.userTikTok);
      formData.append("startfromIG", startfromIGRaw);
      formData.append("startfromTikTok", startfromTikTokRaw);
      formData.append("follIG", values.follIG);
      formData.append("follTikTok", values.follTikTok);
      formData.append("ERIG", values.ERIG);
      formData.append("ERTikTok", values.ERTikTok);
      formData.append("file", values.file);
      try {
        const responseUpload = await axios.post(
          "/api/talent/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Dapatkan path dan filename dari respons upload
        const { path, filename } = responseUpload.data;
        const response = await axios.post("/api/talent/create", {
          name: formData.get("name"),
          category: formData.get("category"),
          // categoryId: Number(formData.get("categoryId")),
          userIG: formData.get("userIG"),
          userTikTok: formData.get("userTikTok"),
          startfromIG: Number(formData.get("startfromIG")),
          startfromTikTok: Number(formData.get("startfromTikTok")),
          follIG: formData.get("follIG"),
          follTikTok: formData.get("follTikTok"),
          ERIG: Number(formData.get("ERIG")),
          ERTikTok: Number(formData.get("ERTikTok")),
          path,
          filename,
        });
        if (response) {
          setPreviewImage(null);
          router.push({
            pathname: "/dashboard/talents",
            query: { createSuccess: true },
          });
        }
      } catch (error) {
        console.error("Axios error:", error);
      }
    } catch (error) {
      console.error("Gagal menambahkan data:", error);
    } finally {
      setSubmitting(false);
    }
  };
  const handleUpdate = async (values, { setSubmitting, resetForm }) => {
    let responseCreate = "";

    try {
      if (values.file) {
        const formData = new FormData();
        formData.append("file", values.file);
        const responseUpload = await axios.post(
          `/api/talent/image/edit/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Dapatkan path dan filename dari respons upload
        const { path, filename } = responseUpload.data;
        responseCreate = await axios.put(`/api/talent/${id}`, {
          name: values.name,
          category: values.category,
          // categoryId: Number(values.categoryId),
          userIG: values.userIG,
          userTikTok: values.userTikTok,
          startfromIG: Number(startfromIGRaw),
          startfromTikTok: Number(startfromTikTokRaw),
          follIG: values.follIG,
          follTikTok: values.follTikTok,
          ERIG: Number(values.ERIG),
          ERTikTok: Number(values.ERTikTok),
          path: path,
          filename: filename,
        });
      } else {
        responseCreate = await axios.put(`/api/talent/${id}`, {
          name: values.name,
          category: values.category,
          // categoryId: Number(values.categoryId),
          userIG: values.userIG,
          userTikTok: values.userTikTok,
          startfromIG: Number(startfromIGRaw),
          startfromTikTok: Number(startfromTikTokRaw),
          follIG: values.follIG,
          follTikTok: values.follTikTok,
          ERIG: Number(values.ERIG),
          ERTikTok: Number(values.ERTikTok),
        });
      }
      if (responseCreate.status === 200) {
        setUpdateSuccess(true);
        setTalent(responseCreate.data);
      } else {
        throw new Error("Failed to update data");
      }
      setPreviewImage(null);
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <TalentContext.Provider
      value={{
        talents,
        setTalents,
        deleteSuccess,
        setDeleteSuccess,
        createSuccess,
        setCreateSuccess,
        fetchData,
        handleDelete,
        handleFormat,
        handleSubmit,
        name,
        category,
        category,
        userIG,
        userTikTok,
        startfromIG,
        startfromTikTok,
        follIG,
        follTikTok,
        ERIG,
        ERTikTok,
        fetchDataById,
        updateSuccess,
        setUpdateSuccess,
        talent,
        handleUpdate,
        fetchDataByIdShow,
        handleDeleteShow,
      }}
    >
      {children}
    </TalentContext.Provider>
  );
};
