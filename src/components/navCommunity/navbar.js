import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  Form,
} from "reactstrap";

import { db, storage, firebase } from "../../firebase-config";

const NavbarCommunity = ({ user }) => {
  console.log(user);
  const { email, displayName, photoURL, uid } = user;

  const [userDB, setUserDb] = useState({});

  useEffect(() => {
    const readData = async () => {
      const userDB = await db.collection("usuarios").doc(email).get();
      setUserDb(userDB.data());
    };

    readData();

    return () => {};
  }, [user]);

  const initialStateValueCompany = {
    descripcion: "",
  };

  const [valuesCompany, setValuesCompany] = useState(initialStateValueCompany);

  /* ---------------------- Modal Company ---------------------- */
  const [modalCompany, setModalCompany] = useState(false);

  const opCLModalCompany = () => {
    setModalCompany(!modalCompany);
  };

  const [modalExitoCompany, setModalExitoCompany] = useState(false);

  const opClModalExitoCompany = () => {
    setModalExitoCompany(!modalExitoCompany);
  };

  const handleChangeInputCompany = (e) => {
    // const {descripcion, value} = e.target;
    setValuesCompany({ ...valuesCompany, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  /*---------- Crear Post para el que tiene el rol de Company -------------------*/
  const createCompany = async (e) => {
    e.preventDefault();
    console.log(valuesCompany);
    const photoCompany = e.target.children[1].children[1].files[0];

    console.log(photoCompany);

    const idCompany =  Date.now().toString(16)

    let CompanyRef2 = db.collection("post").doc(idCompany).collection("postUser");
    let CompanyRef = db.collection("post").doc(idCompany);


    let urlDescargaCompany = "";
    const actualizarImagenCompany = async () => {
      const refImagenCompany = storage
        .ref()
        .child(email)
        .child("Post")
        .child(new Date().toString());
      await refImagenCompany.put(photoCompany);
      urlDescargaCompany = await refImagenCompany.getDownloadURL();
      console.log(urlDescargaCompany);
    };
    actualizarImagenCompany();

    setTimeout(async () => {
      await CompanyRef.set({
        createdAt: idCompany,
        ...valuesCompany,
        photoCompany: urlDescargaCompany,
        photoUser: photoURL,
        userName: displayName,
        userId: uid,
        userLikes: 0,
        userDislikes: 0
      });
    }, 8000)


    setTimeout(async () => {
      await CompanyRef2.add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        ...valuesCompany,
        photoCompany: urlDescargaCompany,
      });

      opCLModalCompany();
      opClModalExitoCompany();
    }, 8000);
  };

  /*-------------------------------------------------------------------------*/

  /* ------------------------------------------------------------- */
  const initialStateValue = {
    name: "",
    description: "",
  };

  const [values, setValues] = useState(initialStateValue);

  const [modal, setModal] = useState(false);
  const [modalExito, setModalExito] = useState(false);

  const opClModal = () => {
    setModal(!modal);
  };

  const opClModalExito = () => {
    setModalExito(!modalExito);
  };

  const handleChangeInput = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const createComunity = async (e) => {
    e.preventDefault();
    console.log(values);
    const { name } = values;
    const photo = e.target.children[2].children[1].files[0];
    // await db.collection("Comunity").doc(name).collection("info");

    const p = Date.now().toString(16);

    const id = p;

    let CommunityRef = db.collection("comunities").doc(id);

    //console.log("Has cambiando el img");
    let urlDescarga = "";
    const atualizarImg = async () => {
      const refImagen = storage.ref().child(name).child("photoCommunity");
      await refImagen.put(photo);
      urlDescarga = await refImagen.getDownloadURL();
      console.log(urlDescarga);
    };
    atualizarImg();

    setTimeout(async () => {
      await CommunityRef.set({
        createdAt: id,
        ...values,
        members: 0,
        photo: urlDescarga,
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
            <div className="col"></div>
          </div>
          <div className="seacrhCommunity">
            <button className="createCommunity" onClick={opClModal}>
              <FontAwesomeIcon icon={faPlusCircle} />
              <br></br>
              <span>Create Community</span>
            </button>
            {userDB.company === true && (
              <button className="createCompany" onClick={opCLModalCompany}>
                <FontAwesomeIcon icon={faPaperPlane} />
                <br></br>
                <span>To Post </span>
              </button>
            )}
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

      {/*-------------- Modal Company ---------------------------*/}
      <Modal isOpen={modalCompany}>
        <ModalHeader>Crea una Post para las New Feeds</ModalHeader>
        <ModalBody>
          <Form onSubmit={createCompany}>
            <FormGroup>
              <Label for="descripcion">Description</Label>
              <Input
                onChange={handleChangeInputCompany}
                type="text"
                id="descripcion"
                name="descripcion"
              />
            </FormGroup>
            <FormGroup>
              <Label for="img">Photo</Label>
              <Input
                onChange={handleChangeInputCompany}
                type="file"
                id="img"
                name="photoCompany"
              />
            </FormGroup>
            <Button type="submit" color="primary">
              Crear
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={opCLModalCompany} color="danger">
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalExitoCompany}>
        <ModalHeader>Post Creado con Exito</ModalHeader>
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
            <Button onClick={opClModalExitoCompany} color="success">
              Salir
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default NavbarCommunity;
