import React, { useEffect, useState } from "react";
import "./styleCommunity.css";
import CardCommunitty from "../components/cardCommunity";
import SearchCommunity from "../components/searchCommunity"
import { db } from "../firebase-config";

const Comunity = () => {
  // const [comunities, setComunities] = useState([]);
  const [comunityPrueba, setcomunityPrueba] = useState(null);
  const comunidadDbPrubea = [];

  useEffect(() => {
    const readData = async () => {
      const citiesRef = db.collection("comunities");

      const snapshotBd = await citiesRef.get();
      if (snapshotBd.empty) {
        console.log("No matching documents.");
        return;
      }

      await snapshotBd.forEach((doc) => {
        comunidadDbPrubea.push(doc.data());
      });
      setcomunityPrueba([...comunidadDbPrubea]);
    };

    const leeDatos = async () => {
      await readData();
    };

    leeDatos();
  }, []);

  //console.log(comunityPrueba)

  return (
    <>
      <div className="containerPrincipalCommunity">
        <div className="scrollCommunity">
          <SearchCommunity/>
          <div>
            <section className="sectionCommunity">
              <h3 className="titleComunnity">Comunidades Destacadas</h3>
              <div className="gridCategoryCommunity">
                {comunityPrueba !== null ? (
                  comunityPrueba.map((item) => (
                    console.log(item),
                    <CardCommunitty key={item.createdAt} comunidadInfo={item} />
                  ))
                ) : (
                  <h1>Cargando</h1>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comunity;
