// PortfolioContext.js
import axios from "axios";
import { useRouter } from "next/router";
import React, { createContext, useContext, useState, useEffect } from "react";

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const router = useRouter();
  const { id } = router.query;
  const [portfolio, setPortfolio] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [sow, setSow] = useState("");
  const [talent, setTalent] = useState("");
  const [porto, setPorto] = useState({});
  const [title, setTitle] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [itemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/portfolio");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setPortfolio(data);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    }
  };
  const fetchDataById = async () => {
    try {
      if (!id) {
        return;
      }
      const rute = `/api/portfolio/${id}`;
      const response = await fetch(rute);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setTitle(data.title);
      // setCategoryId(data.categoryId);
      setPorto(data);
      setSow(data.sow);
      setTalent(data.talent);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    }
  };
  const fetchDataUser = async () => {
    try {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      const response = await fetch("/api/portfolio");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTotalPages(Math.ceil(data.length / itemsPerPage));

      const updatedPorto = await Promise.all(
        data.slice(startIndex, endIndex).map(async (item) => {
          if (isImage(item.filename)) {
            try {
              const response = await fetch(
                `/api/portfolio/image/${item.filename}`
              );
              if (!response.ok) {
                throw new Error("Failed to fetch image");
              }
              const img = new Image();
              img.src = URL.createObjectURL(await response.blob());
              await img.decode();
              return {
                ...item,
                width: img.width,
                height: img.height,
              };
            } catch (error) {
              console.error("Error fetching image dimensions:", error);
              return item;
            }
          } else {
            return item;
          }
        })
      );

      setPortfolio(updatedPorto);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const deleteImageResponse = await fetch(
        `/api/portfolio/image/edit/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!deleteImageResponse.ok) {
        throw new Error("Failed to delete image");
      }
      const response = await fetch(`/api/portfolio/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete data");
      } else {
        setDeleteSuccess(true);
      }

      // Update the state to reflect the changes
      setPortfolio((prevPorto) => prevPorto.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting portfolio data:", error);
    }
  };
  const handleDeleteShow = async (id) => {
    try {
      const imageInfoResponse = await fetch(
        `/api/portfolio/image/${portfolio.filename}`
      );
      if (imageInfoResponse.ok) {
        const deleteImageResponse = await fetch(
          `/api/portfolio/image/edit/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!deleteImageResponse.ok) {
          throw new Error("Failed to delete image");
        }
      }

      const deletePortfolioResponse = await fetch(`/api/portfolio/${id}`, {
        method: "DELETE",
      });

      if (!deletePortfolioResponse.ok) {
        throw new Error("Failed to delete portfolio data");
      }
      setDeleteSuccess(true);

      // Redirect ke /dashboard/portfolio dengan parameter query deleteSuccess=true
      router.push({
        pathname: "/dashboard/portfolio",
        query: { deleteSuccess: true },
      });
    } catch (error) {
      console.error("Error deleting portfolio data:", error);
    }
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      // formData.append("categoryId", values.categoryId);
      formData.append("file", values.file);
      formData.append("sow", values.sow);
      formData.append("talent", values.talent);

      // Menggunakan API route upload yang telah Anda buat

      const responseUpload = await axios.post(
        "/api/portfolio/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Dapatkan path dan filename dari respons upload
      const { path, filename } = responseUpload.data;

      // Simpan informasi file ke dalam API route create
      const responseCreate = await axios.post("/api/portfolio/create", {
        title: formData.get("title"),
        sow: formData.get("sow"),
        talent: formData.get("talent"),
        // categoryId: Number(formData.get("categoryId")),
        path,
        filename,
      });
      console.log(path, filename);
      if (responseCreate) {
        router.push({
          pathname: "/dashboard/portfolio",
          query: { createSuccess: true },
        });
        setPreviewImage(null);
      }
      // console.log("Data berhasil ditambahkan:", responseCreate.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };
  const handleUpdate = async (values, { setSubmitting }) => {
    let responseCreate = "";
    try {
      if (values.file) {
        const formData = new FormData();
        formData.append("file", values.file);
        const responseUpload = await axios.post(
          `/api/portfolio/image/edit/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Dapatkan path dan filename dari respons upload
        const { path, filename } = responseUpload.data;
        responseCreate = await axios.put(`/api/portfolio/${id}`, {
          title: values.title,
          // categoryId: Number(values.categoryId),
          path: path,
          filename: filename,
          sow: sow,
          talent: talent,
        });
        setPreviewImage(null);
      } else {
        responseCreate = await axios.put(`/api/portfolio/${id}`, {
          title: values.title,
          sow: values.sow,
          talent: values.talent,
          // categoryId: Number(values.categoryId),
        });
      }
      // Simpan informasi file ke dalam API route create
      setPorto(responseCreate.data);
      setUpdateSuccess(true);
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setSubmitting(false);
    }
  };
  const handleError = (event) => {
    // General function for formatting fields
    const { name, value } = event.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "categoryId":
        setCategoryId(value);
        break;
      case "sow":
        setSow(value);
        break;
      case "talent":
        setTalent(value);
        break;
      default:
        break;
    }
  };
  function isImage(filename) {
    const extension = filename.split(".").pop().toLowerCase();
    return (
      extension === "jpg" ||
      extension === "jpeg" ||
      extension === "png" ||
      extension === "gif"
    );
  }

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        fetchData,
        handleDelete,
        deleteSuccess,
        setDeleteSuccess,
        setCreateSuccess,
        createSuccess,
        handleSubmit,
        isImage,
        handleUpdate,
        updateSuccess,
        setUpdateSuccess,
        title,
        sow,
        talent,
        handleError,
        porto,
        fetchDataById,
        handleDeleteShow,
        fetchDataUser,
        currentPage,
        setCurrentPage,
        totalPages,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
