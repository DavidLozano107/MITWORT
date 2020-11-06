import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase-config";
const CreatedTask = ({ id, project, updateComponent, newTodo }) => {
  const user = auth.currentUser;

  const projectDb = db
    .collection("usuarios")
    .doc(user.email)
    .collection("projects");
  //Estados

  const [todo, setTodo] = useState({
    id: "",
    todoName: "",
    description: "",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);
  //Funciones

  const uploadState = (e) => {
    setTodo({ ...todo, [e.target.id]: e.target.value });
  };

  const createdToDo = (e) => {
    e.preventDefault();

    todo.id = Math.round(Date.now() + Math.random() * 10).toString(16);
    const { todoName, description } = todo;

    if (todoName.trim() === "" || description.trim() === "") {
      setError(true);
      return;
    }
    //create a new todo
    projectDb
      .doc(id)
      .update({
        todoList: [...project.todoList, { todo }],
      })
      .then(() => {
        updateComponent();
      });
    e.target.reset();
  };

  return (
    <>
      <form style={{ width: "280px" }} onSubmit={createdToDo}>
        <div className="form-group">
          <label htmlFor="todoName">To do Name</label>
          <input
            onChange={uploadState}
            type="text"
            className="form-control"
            id="todoName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            onChange={uploadState}
            type="input"
            className="form-control"
            id="description"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Create
        </button>
      </form>
    </>
  );
};

export default CreatedTask;
