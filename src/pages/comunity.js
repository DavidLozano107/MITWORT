import React, { useEffect, useState } from "react";
import "./styleCommunity.css";
import CardCommunitty from "../components/cardCommunity";
import logo from "./img/menuCommunityy.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SearchCommunity from "../components/searchCommunity"
import { db } from "../firebase-config";

const Comunity = () => {
  // const [comunities, setComunities] = useState([]);
  const [comunityPrueba, setcomunityPrueba] = useState(null);
  const [com, setCom] = useState("")

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

  function searchCom(com){
    return function(x){
      return x.name.toLowerCase().includes(com)
    }
  }


  //console.log(comunityPrueba)

  return (
    <>
      <div className="containerPrincipalCommunity">
        <div className="scrollCommunity">
        <div className="menuCommunity">
        <img src={logo} alt="fondo" className="headerImageCommunity"></img>
        <div className="menuCommunityInterior">
          <div className="contentMenuCommunity">
            <h3 className="titleMenuCommunity">
              Encuentra la comunidad que más te guste
            </h3>
            <div className="biografyMenuCommunity">
              Con las comunidades que te ofrece MITWORT, encontraras desde
              juegos, deportes, aventura etc...
            </div>
            <div className="containerSearchCommunity">
              <div className="searchCommunity">
                <div className="searchBoxCommunity">
                  <div className="inputSearchCommunity">
                    <SearchCommunity className="inputSearch" placeholder="Buscar" name="com" onChange={(e) => setCom(e.target.value)}/>
                  </div>
                  <FontAwesomeIcon icon={faSearch}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
          <div>
            <section className="sectionCommunity">
              <h3 className="titleComunnity">Comunidades Destacadas</h3>
              <div className="gridCategoryCommunity">
                {comunityPrueba !== null ? (
                  comunityPrueba.filter(searchCom(com)).map((item) => (
                    console.log(item),
                    <CardCommunitty key={item.createdAt} comunidadInfo={item} />
                  ))
                ) : (
                  <h1>Cargando...</h1>
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
