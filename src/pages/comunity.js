import React from "react";
import "./styleCommunity.css";
import CardCommunitty from "../components/cardCommunity"

const Comunity = () => {
  return (
    <>
      <div className="containerPrincipalCommunity">
        <div className="scrollCommunity">
        <div>
          <section className="sectionCommunity">
            <h3 className="titleComunnity">Comunidades Destacadas</h3>
            <div className="gridCategoryCommunity">
              <CardCommunitty />
              <CardCommunitty />
              <CardCommunitty />
              <CardCommunitty />
              <CardCommunitty />
              <CardCommunitty />
              <CardCommunitty />
              <CardCommunitty />
              <CardCommunitty />
              <CardCommunitty />
              <CardCommunitty />
              <CardCommunitty />
              <CardCommunitty />
              <CardCommunitty />
            </div>
          </section>
        </div>
        </div>
      </div>
    </>
  );
};

export default Comunity;
