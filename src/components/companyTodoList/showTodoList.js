import React from "react";

const ShowTodoList = ({ todo, deleteTodo, completeTodo, btnComplete }) => {
  //Estados
  const { todoName, description, id } = todo.todo;

  return (
    <>
      <div className="list-group">
        <div className="list-group-item list-group-item-action flex-column align-items-start mb-3 ">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{todoName}</h5>
            <small>
              <button onClick={() => deleteTodo(id)}>x</button>
            </small>
          </div>
          <p className="mb-1">{description}</p>
          {btnComplete && (
            <button
              onClick={() => completeTodo(id)}
              className="btn btn-success btn-block"
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ShowTodoList;
