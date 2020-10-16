import React, {useState} from "react";
import logo from "./img/menuCommunityy.jpg"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchCommunity = () => {



  return (
    <>
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
                    <input className="inputSearch" type="text" placeholder="Buscar"></input>
                  </div>
                  <FontAwesomeIcon icon={faSearch}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCommunity;
