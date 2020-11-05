import React from "react";

const Articule = ({ article }) => {
  const { title, description, url, urlToImage } = article;
  return (
    <>
      <div className="card" style={{ width: "17rem", marginBottom: "0.5em" }}>
        <img className="card-img-top" src={urlToImage} alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <div className="text-center align-text-bottom">
            <a href={url} target="_blank" className=" btn btn-primary ">
              see more
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Articule;
