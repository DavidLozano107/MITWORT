import React from "react";
import "./cardCommunity.css";
import { Link } from "react-router-dom";

const CardCommunitty = ({ comunidadInfo }) => {
  const { createdAt, name, description, photo, members } = comunidadInfo;

  return (
    <div className="bodyCardCommunity" key={createdAt}>
      <div className="cardCommunity">
        <div className="cardHeaderCommunity">
          <div className="cardImageBox">
            <img src={photo} alt={name} className="boxImageCard"></img>
          </div>
        </div>
        <div className="boxInfoCommunity">
          <div className="titleCardCommunity">
            <div className="titleCommunity">{name}</div>
          </div>
          <div className="biografyCardCommunity sizeBiografyCommunity">
            {description}
          </div>
          <div className="membersOfCommunity">
            <div className="circleMembersCommunity"></div>
            <div className="countMembersCommunitty">{members} Miembros</div>
            <div className="openCommunitty">
              <Link to={`/comunity/${createdAt}`}>
                <button type="button" className="btn btn-outline-success">
                  Ingresar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCommunitty;
