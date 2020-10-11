import React, { useEffect, useState } from "react";
import "./styleCommunity.css";
import CardCommunitty from "../components/cardCommunity";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";

const Comunity = () => {
  // const [comunities, setComunities] = useState([]);
  const [comunityPrueba, setcomunityPrueba] = useState({});

  useEffect(() => {
    const readData = async () => {
      const citiesRef = db.collection("comunities");

      const snapshotBd = await citiesRef.get();
      if (snapshotBd.empty) {
        console.log("No matching documents.");
        return;
      }

      snapshotBd.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
      });
    };

    readData();
  }, []);
  return (
    <>
      <div className="containerPrincipalCommunity">
        <div className="scrollCommunity">
          <div>
            <section className="sectionCommunity">
              <h3 className="titleComunnity">Comunidades Destacadas</h3>
              <div className="gridCategoryCommunity"></div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comunity;
