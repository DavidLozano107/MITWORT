import React, { useState } from "react";
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
} from "reactstrap";

import { db } from "../../firebase-config";

const NavbarCommunity = () => {
  const initialStateValue = {
    photo: "",
    name: "",
    description: "",
  };
  const [values, setValues] = useState(initialStateValue);

  const [modal, setmodal] = useState(false);

  const opClModal = () => {
    setmodal(!modal);
  };
  const [modalExito, setmodalExito] = useState(false);

  const opClModalExito = () => {
    setmodalExito(!modalExito);
  };

  const handleChangeInput = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const createComunity = async () => {
    console.log(values);
    const { name } = values;

    // await db.collection("Comunity").doc(name).collection("info");

    let CommunityRef = db.collection("comunities").doc(name);

    await CommunityRef.set({
      createdAt: Date.now(),
      ...values,
    });

    opClModal();
    opClModalExito();
  };

  return (
    <>
      <div className="navbarCommunity d-flex flex-column ">
        <div className="row-titulo">
          <div className="col text">
            <h1>Mis Comunidades</h1>
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
              <button onClick={opClModal}>Agregar una comunidad</button>
            </div>
          </div>
          <div className="seacrhCommunity">
            <Link to="/comunity">Communities</Link>
          </div>
        </div>
      </div>

      <Modal isOpen={modal}>
        <ModalHeader>Crea una comunidad</ModalHeader>
        <ModalBody>
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
            <Label for="description">description</Label>
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
        </ModalBody>
        <ModalFooter>
          <Button onClick={createComunity} color="primary">
            crear
          </Button>
          <Button onClick={opClModal} color="danger">
            cancelar
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
              salir
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default NavbarCommunity;
