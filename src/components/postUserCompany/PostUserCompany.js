import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

import { db } from "../../firebase-config";

const PostUserCompany = (props) => {
  const { poster, showBtn } = props;

  const [countInfoPost, setInfoPost] = useState({});
  const [countDisLike, setDisLike] = useState({});

  const [countLike, setCountLike] = useState(countInfoPost.userLikes);
  const [userLike, setUserLike] = useState(false);
  const [userDontLike, setUserDontLike] = useState(false);
  const [countDontLike, setCountDontLike] = useState(countDisLike.userDislikes);

  useEffect(() => {
    const readData = async () => {
      const citiesRef = db
        .collection("postUser")
        .where("createdAt", "==", poster.createdAt);

      const snapshotBd = await citiesRef.get();
      if (snapshotBd.empty) {
        console.log("No matching documents.");
        return;
      }

      await snapshotBd.forEach((doc) => {
        // comunidadDbPrubea.push(doc.data());
        console.log(doc.data());
        setInfoPost(doc.data());
        setDisLike(doc.data());
        console.log(doc.id);
      });
    };

    const leeDatos = async () => {
      await readData();
    };

    leeDatos();
  }, [countLike, userLike, countDontLike, userDontLike]);

  const postClass = countInfoPost.userLikes >= 1 ? "full" : "empty";

  const postClassDontLike =
    countDisLike.userDislikes >= 1 ? "fullDontLike" : "emptyDontLike";

  const actualizarLikes = () => {
    if (!userLike) {
      db.collection("postUser")
        .doc(poster.createdAt)
        .update({ userLikes: (poster.userLikes += 1) });
      setUserLike(true);
    } else {
      db.collection("postUser")
        .doc(poster.createdAt)
        .update({ userLikes: (poster.userLikes -= 1) });
      setUserLike(false);
    }
  };

  const actualizarDontLikes = () => {
    if (!userDontLike) {
      db.collection("postUser")
        .doc(poster.createdAt)
        .update({ userDislikes: (poster.userDislikes += 1) });
      setUserDontLike(true);
    } else {
      db.collection("postUser")
        .doc(poster.createdAt)
        .update({ userDislikes: (poster.userDislikes -= 1) });
      setUserDontLike(false);
    }
  };

  return (
    <>
      <div className="articleSizePost">
        <header className="userPostNewFeed">
          <div className="photoUserPostNewFeed photoUserPostNewFeed2">
            <div className="photoUser">
              <div className="vewPhotoUser">
                <img
                  className="photo"
                  src={poster.photoUser}
                  alt="Imagen"
                ></img>
              </div>
            </div>
          </div>
          <div className="nameUserPostNewFeedContainer nameUserPostNewFeedContainer2">
            <div className="nameUserPost">
              <div className="name">
                <span className="nameUser">{poster.userName}</span>
              </div>
            </div>
          </div>
        </header>
        <div className="imagePostUserNewFeed">
          <div className="imagePostContainer">
            <div className="imagePostUser">
              <div className="imageSizeUser">
                <img
                  className="imagePost"
                  src={poster.photoCompany}
                  alt="Imagen"
                ></img>
              </div>
              <div className="stopImage"></div>
            </div>
          </div>
        </div>
        <footer className="footerNewFeed">
          <div className="descriptionNewFeed">
            <div className="description">
              <span className="descriptionUser">{poster.descripcion}</span>
            </div>
          </div>
          {showBtn && (
            <>
              <span>{countInfoPost.userLikes}</span>
              <button
                className={`likePost ${postClass}`}
                onClick={() => actualizarLikes()}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
              <span>{countDisLike.userDislikes}</span>
              <button
                className={`dontLikePost ${postClassDontLike}`}
                onClick={() => actualizarDontLikes()}
              >
                <FontAwesomeIcon icon={faThumbsDown} />
              </button>
            </>
          )}
        </footer>
      </div>
    </>
  );
};

export default PostUserCompany;
