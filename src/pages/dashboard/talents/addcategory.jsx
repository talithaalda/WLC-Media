import AddcategoryComponent from "@/components/dashboard/talents/addcategory";
import Sidebar from "@/components/dashboardLayouts/SideBar";
import React from "react";

const addcategory = () => {
  return (
    <Sidebar>
      <AddcategoryComponent></AddcategoryComponent>
    </Sidebar>
  );
};

export default addcategory;
