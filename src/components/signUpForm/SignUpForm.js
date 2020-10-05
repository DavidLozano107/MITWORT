import React from "react";
import { withFormik, Field } from "formik";
import { auth } from "../../firebase-config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEnvelope,
  faBirthdayCake,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";

const SignUpForm = (props) => {
  const { handleSubmit, isSubmitting, errors, isValid, touched } = props;

  return (
    <>
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="input-div one">
            <div className="i">
              <i className="fas fa-user">
                <FontAwesomeIcon icon={faUser} />
              </i>
            </div>
            <div>
              <Field
                className="input"
                name="firstName"
                type="text"
                placeholder="First Name"
              ></Field>
              {errors.firstName && touched.firstName && (
                <div className="errorPass">{errors.firstName}</div>
              )}
            </div>
          </div>
          <div className="input-div two">
            <div className="i">
              <i className="fas fa-user">
                <FontAwesomeIcon icon={faUser} />
              </i>
            </div>
            <div>
              <Field
                className="input"
                name="lastName"
                type="text"
                placeholder="Last Name"
              ></Field>
              {errors.lastName && touched.lastName && (
                <div className="errorPass">{errors.lastName}</div>
              )}
            </div>
          </div>
          <div className="input-div three">
            <div className="i">
              <i className="fas fa-envelope">
                <FontAwesomeIcon icon={faEnvelope} />
              </i>
            </div>
            <div>
              <Field
                className="input"
                name="emailUser"
                type="email"
                placeholder="Email"
              ></Field>
              {errors.emailUser && touched.emailUser && (
                <div className="errorPass">{errors.emailUser}</div>
              )}
            </div>
          </div>
          <div className="input-div four">
            <div className="i">
              <i className="fas fa-lock">
                <FontAwesomeIcon icon={faLock} />
              </i>
            </div>
            <div>
              <Field
                className="input"
                name="passUser"
                type="text"
                placeholder="Password"
              ></Field>
              {errors.passUser && touched.passUser && (
                <div className="errorPass">{errors.passUser}</div>
              )}
            </div>
          </div>
          <div className="input-div five">
            <div className="i">
              <i className="fas fa-birthday-cake">
                <FontAwesomeIcon icon={faBirthdayCake} />
              </i>
            </div>
            <div>
              <Field
                className="input"
                name="dateUser"
                type="date"
                placeholder="Birthday"
              ></Field>
            </div>
          </div>
          <div className="input-div six">
            <div className="i">
              <i className="fas fa-venus-mars">
                <FontAwesomeIcon icon={faVenusMars} />
              </i>
            </div>
            <div>
              <Field
                className="input"
                name="genderUser"
                type="text"
                placeholder="Gender"
              ></Field>
              {errors.genderUser && touched.genderUser && (
                <div className="errorPass">{errors.genderUser}</div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className={`btn ${isSubmitting || !isValid ? "disabled" : ""}`}
            disabled={isSubmitting || !isValid}
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default withFormik({
  /*Inicializa los valores al momento de cargar nuestro Form*/
  mapPropsToValues(/*Se pueden Utilizar los props de la linea 19*/) {
    return {
      firstName: "",
      lastName: "",
      emailUser: "",
      passUser: "",
      dateUser: "",
      genderUser: "",
    };
  },
  /*Inicializa los valores al momento de cargar nuestro Form*/

  validate(values) {
    const errors = {};

    if (values.firstName.length < 5) {
      errors.firstName = "Error in the Name";
    } else if (values.lastName.length < 5) {
      errors.lastName = "Error in the last name";
    } else if (
      !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
        values.emailUser
      )
    ) {
      errors.emailUser = "Invalid email address";
    } else if (!values.passUser) {
      errors.passUser = "Password is required";
    } else if (values.passUser.length < 8) {
      errors.passUser = "Password must be at least 8 characters";
    } else if (values.genderUser.length <= 4) {
      errors.genderUser = "Gender must be at least 5 or 6 characters";
    }
    return errors;
  },

  handleSubmit(values, formikBag) {
    formikBag.setSubmitting(false);
    console.log(values);
    const { emailUser, passUser } = values;

    auth
      .createUserWithEmailAndPassword(emailUser, passUser)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  },
})(SignUpForm);
