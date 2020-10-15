import React, { useEffect, useState } from "react";

import { storage, db } from "../../firebase-config";

import "./style.css";
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

const Profile = ({ user }) => {
  const { displayName, email, photoURL } = user;

  const [userDB, setUserDb] = useState({});

  useEffect(() => {
    const readData = async () => {
      const userDB = await db.collection("usuarios").doc(email).get();
      setUserDb(userDB.data());
    };

    readData();

    return () => {};
  }, [user, email]);

  const [abierto, setabierto] = useState(false);
  const [modalExito, setmodalExito] = useState(false);
  const [modalUpdateCompny, setmodalUpdateCompny] = useState(false);

  const opClModalExito = () => {
    setmodalExito(!modalExito);
  };

  const updateCompanyMode = async () => {
    await db.collection("usuarios").doc(user.email).update({
      company: true,
    });
    setmodalUpdateCompny(!modalUpdateCompny);
    opClModalExito();
  };

  const atualizarPerfil = async (e) => {
    e.preventDefault();

    const photo = e.target.children[0].children[1].files[0];
    const newName = e.target.children[1].children[1].value;
    const newEmail = e.target.children[2].children[1].value;
    const location = e.target.children[3].children[1].value;
    const bio = e.target.children[4].children[1].value;
    console.log(location, bio);

    if (newName.length > 0) {
      console.log("Has cambiando el nombre");
      user
        .updateProfile({
          displayName: newName,
        })
        .then(async () => {
          // Update successful.

          await db.collection("usuarios").doc(user.email).update({
            displayName: newName,
          });
          abrirModal();
          opClModalExito();
        })
        .catch(function (error) {
          // An error happened.
        });
    }
    if (newEmail.length > 0) {
      console.log("Has cambiando el email");

      user
        .updateEmail(newEmail)
        .then(function () {
          abrirModal();
          opClModalExito();
        })
        .catch(function (error) {
          // An error happened.
        });
    }
    if (photo) {
      console.log("Has cambiando el img");
      let urlDescarga = "";
      const atualizarImg = async () => {
        const refImagen = storage.ref().child(email).child("fotoPerfil");
        await refImagen.put(photo);
        urlDescarga = await refImagen.getDownloadURL();

        user
          .updateProfile({
            photoURL: urlDescarga,
          })
          .then(async function () {
            await db.collection("usuarios").doc(email).update({
              photoURL: urlDescarga,
            });
            abrirModal();
            opClModalExito();
          })
          .catch(function (error) {
            // An error happened.
          });
      };

      atualizarImg();
    }

    if (location.length > 0) {
      await db.collection("usuarios").doc(user.email).update({
        location: location,
      });
      abrirModal();
      opClModalExito();
    }
    if (bio.length > 0) {
      await db.collection("usuarios").doc(user.email).update({
        bio: bio,
      });
      abrirModal();
      opClModalExito();
    }
  };

  const abrirModal = () => {
    setabierto(!abierto);
  };
  const abrirModalEmpresa = async () => {
    setabierto(!abierto);
    setmodalUpdateCompny(!modalUpdateCompny);
  };

  const { banner } = userDB;
  //console.log(banner);
  const bannerProfile = {
    backgroundSize: "cover",
    backgroundImage: `url(${banner})`,
    backgroundRepeat: " no-repeat",
  };
  return (
    <>
      <div className="row py-2 px-4">
        <div className="col mx-auto">
          {/* <!-- Profile widget --> */}
          <div className="bg-white shadow rounded overflow-hidden">
            <div style={bannerProfile} className="px-4 pt-0 pb-4">
              <div className="media align-items-end profile-head">
                <div className="profile mr-3">
                  <img
                    src={photoURL}
                    alt="..."
                    width="130"
                    className="rounded mb-2 img-thumbnail"
                  />
                  <button
                    onClick={abrirModal}
                    className="btn btn-outline-dark btn-sm btn-block"
                  >
                    Edit profile
                  </button>
                </div>
                <div className="media-body mb-5 text-white">
                  <h4 className="mt-0 mb-0">{displayName}</h4>
                  <p className="small mb-4">{userDB.location}</p>
                </div>
              </div>
            </div>
            <div className="bg-light p-4 d-flex justify-content-end text-center">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block">
                    {userDB.photos}
                  </h5>
                  <small className="text-muted">
                    <i className="fas fa-image mr-1"></i>Photos
                  </small>
                </li>
                <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block">
                    {userDB.Followeres}
                  </h5>
                  <small className="text-muted">
                    <i className="fas fa-user mr-1"></i>Followers
                  </small>
                </li>
                <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block">
                    {userDB.Following}
                  </h5>
                  <small className="text-muted">
                    <i className="fas fa-user mr-1"></i>Following
                  </small>
                </li>
              </ul>
            </div>
            <div className="px-4 py-3">
              <h5 className="mb-0">About</h5>
              <div className="p-4 rounded shadow-sm bg-light">{userDB.bio}</div>
            </div>
            <div className="py-4 px-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="mb-0">Recent photos</h5>
                <button href="#" className="btn btn-link text-muted">
                  Show all
                </button>
              </div>
              <div className="row">
                <div className="col-lg-6 mb-2 pr-lg-1">
                  <img
                    src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                    alt=""
                    className="img-fluid rounded shadow-sm"
                  />
                </div>
                <div className="col-lg-6 mb-2 pl-lg-1">
                  <img
                    src="https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                    alt=""
                    className="img-fluid rounded shadow-sm"
                  />
                </div>
                <div className="col-lg-6 pr-lg-1 mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                    alt=""
                    className="img-fluid rounded shadow-sm"
                  />
                </div>
                <div className="col-lg-6 pl-lg-1">
                  <img
                    src="https://images.unsplash.com/photo-1475724017904-b712052c192a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                    alt=""
                    className="img-fluid rounded shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={abierto}>
        <ModalHeader>Edit profile</ModalHeader>
        <ModalBody>
          <Form onSubmit={atualizarPerfil}>
            <FormGroup>
              <Label for="img">Photo</Label>
              <Input type="file" id="img" />
            </FormGroup>
            <FormGroup>
              <Label for="usuario">Name: </Label>
              <Input type="text" id="usuario" placeholder={displayName} />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email: </Label>
              <Input type="email" id="email" placeholder={email} />
            </FormGroup>
            <FormGroup>
              <Label for="usuario">Location: </Label>
              <Input type="text" id="usuario" placeholder={userDB.location} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Bio: </Label>
              <Input
                type="textarea"
                name="text"
                id="exampleText"
                placeholder={userDB.bio}
              />
            </FormGroup>

            <Button type="submit" color="primary">
              Update
            </Button>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button onClick={abrirModal} color="danger">
            Cancel
          </Button>
          <Button onClick={abrirModalEmpresa} color="warning">
            Company mode
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalUpdateCompny}>
        <ModalHeader>
          <h2>Are you sure you want your profile as a company?</h2>
        </ModalHeader>
        <ModalBody>
          <p>
            The company mode gives you control over your publications and gives
            you some tools for your marketing projects
          </p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={updateCompanyMode} color="warning">
            Uptade to companyMode
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalExito}>
        <ModalHeader>Profile update</ModalHeader>
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

export default Profile;
