import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../../firebase-config";
import { Link } from "react-router-dom";
import axios from "axios";
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
import Article from "./article";

const TodoList = ({}) => {
  //regExp ELimina los espacion en blancos
  let re = /\s/g;

  const user = auth.currentUser;

  const projectDb = db
    .collection("usuarios")
    .doc(user.email)
    .collection("projects");

  //Estados
  const [projects, setProjects] = useState(null);

  const [abiertoModal, setabiertoModal] = useState(false);

  const [project, setProject] = useState({
    img: "",
    title: "",
    description: "",
    todoList: [],
    todoCompleteList: [],
  });

  const [error, setError] = useState(false);

  const [articles, setArticles] = useState(null);

  const [success, setSuccess] = useState(false);

  const [newProject, setNewprojects] = useState(false);

  const arrayProjectos = [];

  useEffect(() => {
    const readData = async () => {
      projectDb
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.data());

            arrayProjectos.push(doc.data());
            setProjects([...arrayProjectos]);
          });
        })
        .catch((err) => console.log(err));
    };
    const readNews = async () => {
      const API_KEY = "fadd7a8532bd45d2bc03a4377deeb2e4";
      const URL = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${API_KEY}`;
      const res = await axios.get(URL);

      setArticles(res.data.articles);
    };
    readData();
    readNews();

    return () => {};
  }, [newProject]);

  //Funciones

  const createdNewProject = () => {
    setNewprojects(!newProject);
  };

  const modal = () => {
    setabiertoModal(!abiertoModal);
  };
  const closeError = () => {
    setError(!error);
  };
  const closeSuccess = () => {
    setSuccess(!success);
  };

  const uploadState = (e) => {
    if (e.target.id === "img") {
      setProject({ ...project, [e.target.id]: e.target.files[0] });
      return;
    }
    setProject({ ...project, [e.target.id]: e.target.value });
  };

  const createNewProject = (e) => {
    e.preventDefault();
    const { title, description, img, todoList, todoCompleteList } = project;
    //Validar datos
    if (title.trim() === "" || description.trim() === "") {
      modal();
      setError(true);
      return;
    }

    //Crear un proyecto
    projectDb
      .doc(title.replace(re, ""))
      .set({
        title,
        description,
        todoList,
        todoCompleteList,
      })
      .then(() => {
        let urlDescarga = "";

        const atualizarImg = async () => {
          const refImagen = storage
            .ref()
            .child(title.replace(re, ""))
            .child("portaProject");
          await refImagen.put(img);
          urlDescarga = await refImagen.getDownloadURL();
          projectDb.doc(title.replace(re, "")).update({
            photoURL: urlDescarga,
          });
          modal();
          setSuccess(true);
        };

        atualizarImg();
        createdNewProject();
      });
  };

  return (
    <>
      <h2 className="text-center">Todo-List</h2>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <h3 className="text-center">Projects</h3>
            {projects !== null ? (
              <ul>
                {projects.map((pro) => (
                  <li key={pro.title}>
                    <Link
                      to={`/dashboard/todolist/${pro.title.replace(re, "")}`}
                    >
                      {pro.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <small className="text-center mx-auto">
                you don't have any projects, you can create one with the button
                "new project"
              </small>
            )}

            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={modal}
            >
              New proyect
            </button>
          </div>
          <div className="col-9">
            <h3 className="text-center mt-4"> Trending topics </h3>
            <div className="mt-5 article">
              {articles !== null ? (
                articles.map((art) => {
                  return <Article key={art.title} article={art} />;
                })
              ) : (
                <h1>Cargando...</h1>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={abiertoModal}>
        <ModalHeader cssModule={{ "modal-title": "w-100 text-center" }}>
          Create a new Project
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={createNewProject}>
            <FormGroup>
              <Label for="img">Photo</Label>
              <Input type="file" id="img" onChange={uploadState} />
            </FormGroup>
            <FormGroup>
              <Label for="title">Title: </Label>
              <Input
                onChange={uploadState}
                type="text"
                id="title"
                placeholder="Insert any title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description: </Label>
              <Input
                onChange={uploadState}
                type="textarea"
                id="description"
                placeholder="Insert any description"
              />
            </FormGroup>
            <Button type="submit" color="primary">
              Create
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={modal} color="danger">
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/*--------------------------------- MODAL EXITO ---------------------- */}
      <Modal isOpen={success}>
        <ModalHeader>created project</ModalHeader>
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
            <Button onClick={closeSuccess} color="success">
              salir
            </Button>
          </div>
        </ModalFooter>
      </Modal>
      {/*------------------------------------- ERROR ----------------------*/}
      <Modal isOpen={error}>
        <ModalHeader>Error</ModalHeader>
        <ModalBody>
          <div class="ui-error">
            <svg
              viewBox="0 0 87 87"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g id="Group-2" transform="translate(2.000000, 2.000000)">
                  <circle
                    id="Oval-2"
                    stroke="rgba(252, 191, 191, .5)"
                    stroke-width="4"
                    cx="41.5"
                    cy="41.5"
                    r="41.5"
                  ></circle>
                  <circle
                    class="ui-error-circle"
                    stroke="#F74444"
                    stroke-width="4"
                    cx="41.5"
                    cy="41.5"
                    r="41.5"
                  ></circle>
                  <path
                    class="ui-error-line1"
                    d="M22.244224,22 L60.4279902,60.1837662"
                    id="Line"
                    stroke="#F74444"
                    stroke-width="3"
                    stroke-linecap="square"
                  ></path>
                  <path
                    class="ui-error-line2"
                    d="M60.755776,21 L23.244224,59.8443492"
                    id="Line"
                    stroke="#F74444"
                    stroke-width="3"
                    stroke-linecap="square"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="mx-auto">
            <Button onClick={closeError} color="success">
              salir
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TodoList;
