import React, { useEffect, useState } from "react";
import PhotoUserProfile from "../photoUserProfile/PhotoUserProfile";

import { storage, db, firebase } from "../../firebase-config";

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
  const { displayName, email, photoURL, uid } = user;
  const [userDB, setUserDb] = useState({});
  const [gallery, setGallery] = useState([]);

  const userGallery = [];

  useEffect(() => {
    const readData = async () => {
      const userDB = await db.collection("usuarios").doc(email).get();
      setUserDb(userDB.data());
    };

    readData();

    /*--------- ---  Leer datos de Gallery ------------------------------------------*/

    const readDataGallery = async () => {
      const citiesRef = db.collection("uploadPhoto").where("email", "==", email);

      const snapshotBd = await citiesRef.get();
      if (snapshotBd.empty) {
        console.log("No matching documents.");
        return;
      }

      await snapshotBd.forEach((doc) => {
        userGallery.push(doc.data());
      });
      setGallery([...userGallery]);
    };

    const leeDatosGallery = async () => {
      await readDataGallery();
    };

    leeDatosGallery();
    /**------------------------------------------------------------------------------ */
    return () => {};
  }, [user, email]);


  const [abierto, setabierto] = useState(false);
  const [modalExito, setmodalExito] = useState(false);
  const [modalUpdateCompny, setmodalUpdateCompny] = useState(false);

  /* ------- Estados de modal para las fotos del Usuario   ---------------*/

  const [uploadPhoto, setUpLoadPhoto] = useState(false);
  const [uploadPhotoExito, setUpLoadExito] = useState(false);

  /** ------------------------------------------------------------------- */

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

  /* ----  Fotos del Usuario para Gallery ---------------- */
  const abrirModalUploadUser = () => {
    setUpLoadPhoto(!uploadPhoto);
  };

  const abrirModalUploadUserExito = () => {
    setUpLoadExito(!uploadPhotoExito);
  };

  const uploadPhotoUser = (e) => {
    e.preventDefault();

    const upload = e.target.children[0].children[1].files[0];

    const idUploadPhoto = Date.now().toString(16);

    let UploadRefStorage = db
      .collection("uploadPhoto")
      .doc(email)
      .collection("uploadPhotoUser");
      
    let UploadRef = db.collection("uploadPhoto").doc(idUploadPhoto);

    let urlDescargaUploadPhoto = "";

    const uploadImageUser = async () => {
      const refImagenPhotoUpload = storage
        .ref()
        .child(email)
        .child("Gallery")
        .child(new Date().toString());
      await refImagenPhotoUpload.put(upload);
      urlDescargaUploadPhoto = await refImagenPhotoUpload.getDownloadURL();
      console.log(urlDescargaUploadPhoto);
    };
    uploadImageUser();

    setTimeout(async () => {
      await UploadRef.set({
        createdAt: idUploadPhoto,
        email: email,
        upload: urlDescargaUploadPhoto,
      });
      await UploadRefStorage.add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        upload: urlDescargaUploadPhoto,
      });

      abrirModalUploadUser();
      abrirModalUploadUserExito();
    }, 12000);
  };
  /*--------------------------------------------------------*/

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
                    {gallery.length}
                  </h5>
                  <small className="text-muted">
                    <i className="fas fa-image mr-1"></i>Photos
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
                <button
                  onClick={abrirModalUploadUser}
                  className="btn btn-outline-danger btn-sm"
                >
                  Upload Photo
                </button>
              </div>
              {/* TRAER LA GRID DE COMUNIDAD --------------------------------- */}
            </div>
          </div>
        </div>
      </div>
      <section className="sectionProfile">
        <div className="gridProfile">
          {gallery !== null ? (
            gallery.map(
              (item) => (
                console.log(item),
                (<PhotoUserProfile key={item.createdAt} galleryInfo={item} />)
              )
            )
          ) : (
            <h1>Cargando...</h1>
          )}
        </div>
      </section>

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
              <Label for="exampleText">Biography: </Label>
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

      {/** ------------------- Upload Photo User -------------------------*/}
      <Modal isOpen={uploadPhoto}>
        <ModalHeader>Upload Photo</ModalHeader>
        <ModalBody>
          <Form onSubmit={uploadPhotoUser}>
            <FormGroup>
              <Label for="img">Photo</Label>
              <Input type="file" id="img" name="uploadImg" />
            </FormGroup>
            <Button type="submit" color="primary">
              Upload
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={abrirModalUploadUser} color="danger">
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={uploadPhotoExito}>
        <ModalHeader>Success</ModalHeader>
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
            <Button onClick={abrirModalUploadUserExito} color="success">
              Salir
            </Button>
          </div>
        </ModalFooter>
      </Modal>
      {/** ------------------- Upload Photo User -------------------------*/}
    </>
  );
};

export default Profile;
