// import { array } from "prop-types";
import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase-config";

import BarChart from "./barChart/barChart";

const Publication = () => {
  const [post, setPost] = useState(null);
  const [like] = useState(10);
  const [disLike] = useState(20);

  const [state, setState] = useState({
    labels: ["Like", "Dislike"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [like, disLike, 0],
      },
    ],
  });
  const postArray = [];

  useEffect(() => {
    var user = auth.currentUser;
    const readDataCompany = async () => {
      const CompanyPostRef = db
        .collection("postUser")
        .where("email", "==", user.email);

      const snapshotBd = await CompanyPostRef.get();
      if (snapshotBd.empty) {
        console.log("No matching documents.");
        return;
      }

      snapshotBd.forEach(async (doc) => {
        postArray.push(doc.data());
        console.log(doc.id);
      });
      setPost([...postArray]);
    };

    const leeDatos = async () => {
      await readDataCompany();
    };

    leeDatos();
  }, []);

  console.log(post);
  return (
    <>
      <h1>Estadisticas</h1>

      {post !== null &&
        post
          .reverse()
          .map((post) => (
            <BarChart
              likes={post.userLikes}
              disLikes={post.userDislikes}
              descripcion={post.descripcion}
            />
          ))}
    </>
  );
};

export default Publication;
