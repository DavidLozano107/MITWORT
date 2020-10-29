import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  Form
} from "reactstrap";

import { db, storage } from "../../firebase-config";

const NavbarCommunity = ({ user }) => {

  console.log(user);
  const { email } = user; 
  

  const [userDB, setUserDb] = useState({});

  useEffect(() => {
    const readData = async () => {
      const userDB = await db.collection("usuarios").doc(email).get();
      setUserDb(userDB.data());
    };

    readData();

    return () => {};
  }, [user]);


  const initialStateValue = {
    name: "",
    description: "",
  };
  const [values, setValues] = useState(initialStateValue);

  const [modal, setModal] = useState(false);

  const opClModal = () => {
    setModal(!modal);
  };
  const [modalExito, setModalExito] = useState(false);

  const opClModalExito = () => {
    setModalExito(!modalExito);
  };

  const handleChangeInput = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const createComunity = async (e) => {
    e.preventDefault()
    console.log(values);
    const { name } = values;
    const photo = e.target.children[2].children[1].files[0]
    // await db.collection("Comunity").doc(name).collection("info");
    
    const p = Date.now().toString(16)

    const id = p

    let CommunityRef = db.collection("comunities").doc(id);

      
    //console.log("Has cambiando el img");
    let urlDescarga = "";
    const atualizarImg = async () => {
    const refImagen = storage.ref().child(name).child("photoCommunity");
    await refImagen.put(photo);
    urlDescarga = await refImagen.getDownloadURL();
    console.log(urlDescarga)
    };
    atualizarImg();

    setTimeout( async () => {
      await CommunityRef.set({
        createdAt: id,
        ...values,
        members: 0,
        photo: urlDescarga
      });
  
      opClModal();
      opClModalExito();
    }, 3000);
    
  };

  return (
    <>
      <div className="navbarCommunity d-flex flex-column ">
        <div className="row-titulo">
          <div className="col text">
            <h1>Comunidades</h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="navbarCommunity-cardCommunity"></div>
            </div>
            <div className="col">
              <div className="navbarCommunity-cardCommunity"></div>
            </div>
            <div className="col">
              
            </div>
          </div>
          <div className="seacrhCommunity">
            <button className="createCommunity" onClick={opClModal}>Create Community</button>
            { userDB.company === true &&
            <button className="createCompany">To Post</button>  
            }      
          </div>
        </div>
      </div>

      <Modal isOpen={modal}>
        <ModalHeader>Crea una comunidad</ModalHeader>
        <ModalBody>
          <Form onSubmit={createComunity}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              onChange={handleChangeInput}
              type="text"
              id="name"
              name="name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              onChange={handleChangeInput}
              type="text"
              id="description"
              name="description"
            />
          </FormGroup>
          <FormGroup>
            <Label for="img">Photo Community</Label>
            <Input
              onChange={handleChangeInput}
              type="file"
              id="img"
              name="photo"
            />
          </FormGroup>
          <Button type="submit" color="primary">
            Crear
          </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={opClModal} color="danger">
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalExito}>
        <ModalHeader>Comunidad Creada con Exito</ModalHeader>
        <ModalBody>
          <div className="svg-container ModalSuccess">
            <svg
              className="ft-green-tick"
              xmlns="http://www.w3.org/2000/svg"
              height="100"
              width="100"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <circle
                className="circle"
                fill="#5bb543"
                cx="24"
                cy="24"
                r="22"
              />
              <path
                className="tick"
                fill="none"
                stroke="#FFF"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                d="M14 27l5.917 4.917L34 17"
              />
            </svg>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="mx-auto">
            <Button onClick={opClModalExito} color="success">
              Salir
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default NavbarCommunity;
