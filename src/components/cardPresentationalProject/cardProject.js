import React from "react";
const CardProject = ({ project }) => {
  const { photoURL, title, description } = project;
  return (
    <>
      <div className="card mb-3">
        <img
          className="card-img-top"
          style={{ width: "100%", height: "250px" }}
          src={photoURL}
          alt={description}
        />
        <div className="card-body">
          <h5 className="card-title">{title} </h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </>
  );
};

export default CardProject;
