import React from "react";
import "./cardCommunity.css";
const CardCommunitty = ({ comunidadInfo}) => {
  const { createdAt, name, description, photo, members } = comunidadInfo;

  return (
    <div className="bodyCardCommunity" key={createdAt}>
      <div className="cardCommunity">
        <div className="cardHeaderCommunity">
          <div className="cardImageBox">
            <img
              src={photo}
              alt={name}
              className="boxImageCard"
            ></img>
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
              <button type="button" className="btn btn-outline-success">
                Ingresar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCommunitty;
