import React, { useState } from "react";
import { withFormik, Field } from "formik";

import logoHome from "./img/avatarMit.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

import { auth } from "../../firebase-config";

const Login = (props) => {
  const {
    handleSubmit,
    isSubmitting,
    errors,
    isValid,
    touched,
    onRegisterActive,
    onForgotPasswortActive,
    status,
  } = props;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <img className="avatar" src={logoHome} alt="MITWORT"></img>
        <h2>WELCOME</h2>
        <div className="input-div one">
          <div className="i">
            <i className="fas fa-user">
              <FontAwesomeIcon icon={faUser} />
            </i>
          </div>
          <div>
            <Field
              className="input"
              name="email"
              type="email"
              placeholder="Email"
            ></Field>
            {errors.email && touched.email && (
              <div className="errorPass">{errors.email}</div>
            )}
          </div>
        </div>
        <div className="input-div two">
          <div className="i">
            <i className="fas fa-password">
              <FontAwesomeIcon icon={faLock} />
            </i>
          </div>
          <div>
            <Field
              className="input"
              name="password"
              type="password"
              placeholder="Password"
            ></Field>
            {errors.password && touched.password && (
              <div className="errorPass">{errors.password}</div>
            )}
          </div>
        </div>
        <button type="button" onClick={onForgotPasswortActive}>
          Forgort Password
        </button>
        <button type="button" onClick={onRegisterActive}>
          Sign Up
        </button>
        <button
          type="submit"
          className={`sign ${isSubmitting || !isValid ? "disabled" : "sign"}`}
          disabled={isSubmitting || !isValid}
          value="Login"
          // onClick={onIngreso}
        >
          Sign in
        </button>
      </form>
      {status && (
        <div className="alert alert-danger" role="alert">
          {status}
        </div>
      )}
    </div>
  );
};

/*Maneja el estado del Form*/
export default withFormik({
  /*Inicializa los valores al momento de cargar nuestro Form*/
  mapPropsToValues(/*Se pueden Utilizar los props de la linea 19*/) {
    return {
      email: "",
      password: "",
    };
  },
  /*------------------------------------------------------------*/

  /*-------- Valida los campos y muestra un error si es necesario----*/
  validate(values) {
    const errors = {};

    if (
      !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
        values.email
      )
    ) {
      errors.email = "Invalid email address";
    } else if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    return errors;
  },
  /*---------------------------------------------------------------*/

  /*-----Enviar controlador. Esto debe pasarse onSubmit={props.handleSubmit}. Para obtener más información sobre el proceso de envío*/
  handleSubmit(values, formikBag) {
    formikBag.setSubmitting(false);

    const { email, password } = values;

    auth.signInWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      // const errorCode = error.code;
      // const  = error.message;

      formikBag.setStatus(error.message);

      setTimeout(() => {
        formikBag.setStatus(false);
      }, 2000);

      // ...
    });
  },
  /*---------------------------------------------*/
})(Login);
