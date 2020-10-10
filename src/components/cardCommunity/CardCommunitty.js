import React from "react";
import "./cardCommunity.css";
const CardCommunitty = () => {
  return (
    <div className="bodyCardCommunity">
      <div className="cardCommunity">
        <div className="cardHeaderCommunity">
          <div className="cardImageBox">
            <img
              src="https://cdn.discordapp.com/discovery-splashes/302094807046684672/579507dff86d89cd5decd8e016a54706.jpg?size=320"
              alt="Minecraft"
              className="boxImageCard"
            ></img>
          </div>
        </div>
        <div className="boxInfoCommunity">
          <div className="titleCardCommunity">
            <div className="titleCommunity">MINECRAFT</div>
          </div>
          <div className="biografyCardCommunity sizeBiografyCommunity">
            Unete a la comunidad de de MINECRAFT más grande
          </div>
          <div className="membersOfCommunity">
            <div className="circleMembersCommunity"></div>
            <div className="countMembersCommunitty">30 Miembros</div>
            <div className="openCommunitty">
              <button type="button" class="btn btn-outline-success">
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
