import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../components/companyNavbar";
import CardProject from "../components/cardPresentationalProject/";
import { db, auth } from "../firebase-config";
import FormCreatedTask from "../components/companyTodoList/createdTask";
import ShowTodoList from "../components/companyTodoList/showTodoList";

const TodoListProject = ({}) => {
  const user = auth.currentUser;

  const projectDb = db
    .collection("usuarios")
    .doc(user.email)
    .collection("projects");

  let { id } = useParams();
  //Estados
  const [project, setProject] = useState(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const readData = () => {
      projectDb
        .doc(id)
        .get()
        .then((doc) => {
          console.log(doc.data());
          setProject(doc.data());
        })
        .catch((err) => console.log(err));
    };
    readData();
    return () => {};
  }, [update]);

  const updateComponent = () => {
    setUpdate(!update);
  };

  const deleteTodoDB = (idTodo) => {
    const newTodoList = project.todoList.filter(
      (todo) => todo.todo.id !== idTodo
    );

    console.log("quedam...", newTodoList);
    console.log("elimino...", idTodo);
    //update a new todo
    projectDb
      .doc(id)
      .update({
        todoList: newTodoList,
      })
      .then(() => {
        updateComponent();
      });
  };
  const deleteTodoCompleteDB = (idTodo) => {
    const newTodoList = project.todoCompleteList.filter(
      (todo) => todo.todo.id !== idTodo
    );

    console.log("quedam...", newTodoList);
    console.log("elimino...", idTodo);
    //update a new todo
    projectDb
      .doc(id)
      .update({
        todoCompleteList: newTodoList,
      })
      .then(() => {
        updateComponent();
      });
  };

  const completeTodoDB = (idTodo) => {
    console.log("elimando...", idTodo);

    //Elimina el todo
    const newTodoList = project.todoList.filter(
      (todo) => todo.todo.id !== idTodo
    );
    const todoComplete = project.todoList.filter(
      (todo) => todo.todo.id === idTodo
    );

    //Actualiza el la lista de todo completados
    projectDb.doc(id).update({
      todoCompleteList: [...project.todoCompleteList, ...todoComplete],
    });

    //Actualiza el la lista de todos
    projectDb
      .doc(id)
      .update({
        todoList: newTodoList,
      })
      .then(() => updateComponent());
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 position-fixed">
            <SideBar />
          </div>
          <div className="col-9 offset-md-3 trello">
            {project !== null ? (
              <>
                <h2 className="text-center">{project.title}</h2>
                <CardProject project={project} />
              </>
            ) : (
              <h1>Cargando...</h1>
            )}
            <div className="container-fluid">
              <div className="row">
                <div className="col">
                  <div className="">
                    <h3 className="text-center">create a new task</h3>
                    <FormCreatedTask
                      id={id}
                      project={project}
                      updateComponent={updateComponent}
                    />
                  </div>
                </div>
                <div className="col">
                  <h3 className="text-center">To do</h3>

                  {project !== null && project.todoList.length > 0 ? (
                    project.todoList.map((todo) => (
                      <ShowTodoList
                        key={todo.todo.id}
                        deleteTodo={deleteTodoDB}
                        completeTodo={completeTodoDB}
                        todo={todo}
                        btnComplete={true}
                      />
                    ))
                  ) : (
                    <div className="text-center">
                      <small className="">You don't have task</small>
                    </div>
                  )}
                </div>
                <div className="col">
                  <h3 className="text-center">Complete</h3>
                  {project !== null && project.todoCompleteList.length > 0 ? (
                    project.todoCompleteList.map((todo) => (
                      <ShowTodoList
                        key={todo.todo.id}
                        deleteTodo={deleteTodoCompleteDB}
                        todo={todo}
                      />
                    ))
                  ) : (
                    <div className="text-center">
                      <small className="">You don't have task complete</small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoListProject;
