import React, { Component } from "react";
import {withFormik, Field} from "formik";

import logoHome from "./img/avatarMit.svg";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";


class Login extends Component {
  render() {
    const {
      handleSubmit,
      isSubmitting,
      errors,
      isValid,
      touched,
    } = this.props;
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
               placeholder="Email" > 
              </Field>
              {errors.email && touched.email && 
                <div className="errorPass">{errors.email}</div>
              }
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
                placeholder="Password">
              </Field>
              {errors.password && touched.password && 
                <div className="errorPass">{errors.password}</div>
              }
            </div>
          </div>
          <button onClick={this.props.onForgotPasswortActive}>Forgort Password</button>
          <button onClick={this.props.onRegisterActive}>Sign Up</button>
          <button
            type="submit"
            className={`btn ${isSubmitting || !isValid ? 'disabled' : ''}`}
            disabled={isSubmitting || !isValid}
            value="Login"
            // onClick={onIngreso}
          >Submit</button>
        </form>
      </div>
    );
  }
}
              /*Maneja el estado del Form*/
export default withFormik({

  /*Inicializa los valores al momento de cargar nuestro Form*/
    mapPropsToValues(/*Se pueden Utilizar los props de la linea 19*/){
      return {
        email: '',
        password: '',
      }
    },
    /*------------------------------------------------------------*/

    /*-------- Valida los campos y muestra un error si es necesario----*/
    validate(values){
      const errors = {};

      if( !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(values.email)) {
        errors.email = "Invalid email address";
      }else if (!values.password) {
        errors.password = "Password is required"
      }else if(values.password.length < 8){
        errors.password = "Password must be at least 8 characters"
      }

      return errors;

    },
    /*---------------------------------------------------------------*/

  /*-----Enviar controlador. Esto debe pasarse onSubmit={props.handleSubmit}. Para obtener más información sobre el proceso de envío*/
  handleSubmit(values, formikBag){
    formikBag.setSubmitting(false);
    console.log(values)
    
  }
  /*---------------------------------------------*/
})(Login);