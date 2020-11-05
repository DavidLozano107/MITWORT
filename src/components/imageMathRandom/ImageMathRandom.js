import React, { useState, useEffect } from "react";
import {db} from "../../firebase-config"

const ImageMathRandom = () => {

  const [randomPhoto, setRandomPhoto] = useState("");

  const imgRandom = [];

  useEffect(() => {
    const readData = async () => {
      const citiesRef = db.collection("comunities");

      const snapshotBd = await citiesRef.get();
      if (snapshotBd.empty) {
        console.log("No matching documents.");
        return;
      }

      await snapshotBd.forEach((doc) => {
        imgRandom.push(doc.data());
        var i = Math.floor(Math.random() * imgRandom.length)
        setRandomPhoto(imgRandom[i].photo);
      });

    };

    const leeDatos = async () => {
      await readData();
    };

    leeDatos();
  }, []);
  
  return (
    <>
      <div className="imageMathRandom">
        <div className="imageMathRandomContainer">
          <div className="imageMathRandonCommunity">
            <div id="imageSizeMathRandom" className="imageSizeMathRandom">
               <img className="imageRandom" src={randomPhoto} alt="Imagen"></img> 
            </div>
            <div className="stopImageRandom"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageMathRandom;
