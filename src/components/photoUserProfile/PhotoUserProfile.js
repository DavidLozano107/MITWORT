import React from "react";

const PhotoUserProfile = ({ galleryInfo }) => {
  console.log(galleryInfo);

  const { createdAt, upload } = galleryInfo;

  return (
    <>
      <div className="imageGalleryProfile">
        <div className="imageContainerContainerProfile">
          <div className="imageGalleryUserProfile" key={createdAt}>
            <div className="imageSizeUserPorfileGallery">
              <img className="imageGalleryProfileImage" src={upload} alt="imagen"></img>
            </div>
            <div className="stopImageProfile"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoUserProfile;
