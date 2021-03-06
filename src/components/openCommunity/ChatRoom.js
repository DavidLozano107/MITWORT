import React, { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { auth, db, firebase } from "../../firebase-config";
import "./styleChat.css";
import ChatMessage from "../chatMessage";

const ChatRoom = ({ user }) => {
  console.log(user);

  // ------ Parametro Id con la cual se capturo el createdAt de la comunidad
  let { id } = useParams();
  //-------------------------------------------------------------------

  const messageRef = db.collection("comunities").doc(id).collection("messages");

  const query = messageRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const dummy = useRef();

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    setFormValue("");

    dummy.current.scrollIntoView({ behavisor: "smooth" });
  };

  // ----- Destructuración del objeto User (Usuarios)
  const { displayName, photoURL } = user;
  //-------------------------------------------------------

  // El estado de datos comenzara en false
  const [datos, setDatos] = useState(false);
  //---------------------------------------------

  // Carga de Datos---------------------
  useEffect(() => {
    //Petición a la base de datos comunidades
    var citiesRef = db.collection("comunities").doc(id).get();

    // Respuesta de la base de datos con "doc"
    citiesRef.then((doc) => {
      //Mostrar lo que devolvio la base de datos en especial los datos ("data")
      console.log(doc.data());
      //Actualización del estado de datos en la linea 53
      setDatos(doc.data());
    });

    return () => {};
  }, []);
  //----------------------------------------------

  //Destructurazión del estado de datos que ya tiene almacenado lo que hay en comunidades.
  const { name, photo, description } = datos;
  //----------------------------------------

  return (
    <>
      {datos !== false && (
        <>
          <div className="informationCommunityChat">
            <div className="boxChatRoomInformation">
              <h1 className="nameCommunityChat">{name}</h1>
            </div>
            <div className="boxDescriptionChat">
              <p className="desCommunityChat">{description}</p>
            </div>
            <div className="boxImageChat">
              <img className="imageCommunityChat" src={photo} alt={name}></img>
            </div>
          </div>
          <main>
            {messages &&
              messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  photoURL={photoURL}
                  displayName={displayName}
                />
              ))}
            <div ref={dummy}></div>
          </main>
          <form onSubmit={sendMessage} className="formChat">
            <input
              className="inputChat"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
            ></input>
            <button className="btnSubmitChat" type="submit">
              Enviar
            </button>
          </form>
        </>
      )}
      {datos === false && (
        <>
          <h1>Cargando...</h1>
        </>
      )}
    </>
  );
};

export default ChatRoom;
