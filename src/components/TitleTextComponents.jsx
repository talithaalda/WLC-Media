// import React from "react";

const TitleTextComponents = ({ textTitle }) => {
  return (
    <div className="d-flex flex-column text-center px-2">
      <h1 className="text-title">{textTitle}</h1>
      <div className="line-text"></div>
    </div>
  );
};

export default TitleTextComponents;
