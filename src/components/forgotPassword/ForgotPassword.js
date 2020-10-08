import React, { Component } from "react";
import { withFormik, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import { auth } from "../../firebase-config";

class ForgotPassword extends Component {
  render() {
    const {
      handleSubmit,
      isSubmitting,
      isValid,
      errors,
      touched,
      status,
    } = this.props;

    return (
      <>
        <div className="register-container">
          <form onSubmit={handleSubmit}>
            <h2>Forgot Password</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-envelope">
                  <FontAwesomeIcon icon={faEnvelope} />
                </i>
              </div>
              <div>
                <Field
                  className="input"
                  type="email"
                  name="emailForgot"
                  placeholder="Email"
                ></Field>
                {errors.emailForgot && touched.emailForgot && (
                  <div className="errorPass">{errors.emailForgot}</div>
                )}
              </div>
            </div>
            <button
              type="submit"
              className={`sign ${isSubmitting || !isValid ? "disabled" : ""}`}
              disabled={isSubmitting || !isValid}
              value="Forgot"
            >
              Submit
            </button>

            <a className="sign" href="/">
              Back
            </a>
          </form>
          {status && !errors && (
            <div className="alert alert-success" role="alert">
              {status}
            </div>
          )}
          {status && errors && (
            <div className="alert alert-danger" role="alert">
              {status}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default withFormik({
  /*Inicializa los valores al momento de cargar el Form de lo contrario marcara un Error*/
  mapPropsToValues(/*Se pueden Utilizar los props de la linea 19*/) {
    return {
      emailForgot: "",
    };
  },

  validate(values) {
    const errors = {};

    if (
      !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
        values.emailForgot
      )
    ) {
      errors.emailForgot = "Invalid email address";
    }

    return errors;
  },

  handleSubmit(values, formikBag) {
    formikBag.setSubmitting(false);
    console.log(values);

    auth
      .sendPasswordResetEmail(values.emailForgot)
      .then(function () {
        formikBag.setStatus("mail sent successfully");
        formikBag.setErrors(false);
        setTimeout(() => {
          formikBag.setStatus(false);
          formikBag.setErrors(false);
        }, 5000);
      })
      .catch(function (error) {
        formikBag.setStatus(error.message);
        formikBag.setErrors(true);
        setTimeout(() => {
          formikBag.setErrors(false);
          formikBag.setStatus(false);
        }, 5000);
      });
  },
})(ForgotPassword);
