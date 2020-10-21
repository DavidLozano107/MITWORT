import React, { useState } from 'react';
import { auth } from "../../firebase-config";

const ChatMessage = (props) =>{

  const {text, uid, photoURL, displayName} = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
      <div className={`message ${messageClass}`}>
        <img className="imageChat" src={photoURL} alt={displayName}></img>
        <p className="textChat">{text}</p>
      </div>
    );
}

export default ChatMessage;