import React from "react";
import { withFormik, Field } from "formik";
import { auth, db, firebase, provider, storage } from "../../firebase-config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEnvelope,
  faBirthdayCake,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";

const SignUpForm = (props) => {
  const {
    handleSubmit,
    isSubmitting,
    errors,
    isValid,
    touched,
    errorMessage,
  } = props;

  const SignUpGoogle = async () => {
    await auth.signInWithPopup(provider);

    var userGoogle = await firebase.auth().currentUser;

    db.collection("usuarios").doc(userGoogle.email).set({
      createdAt: Date.now(),
      displayName: userGoogle.displayName,
      photoURL: userGoogle.photoURL,
      email: userGoogle.email,
      banner:
        "https://www.acemetrix.com/wp-content/themes/acemetrix/images/default/default-black-banner.png",
      uid: userGoogle.uid,
      location: "write any location",
      bio: "write about you",
      photos: 0,
      Followeres: 0,
      Following: 0,
      company: false,
    });
  };

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
          {console.log(errorMessage)}
          <button
            type="submit"
            className={`sign ${isSubmitting || !isValid ? "disabled" : ""}`}
            disabled={isSubmitting || !isValid}
          >
            Sign Up
          </button>
          <button onClick={SignUpGoogle}>Google</button>
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

    if (/^([0-9])*$/.test(values.firstName)) {
      errors.firstName = "Error. Only letters are allowed";
    } else if (/^([0-9])*$/.test(values.lastName)) {
      errors.lastName = "Error. Only letters are allowed";
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
    if (/^([0-9])*$/.test(values.genderUser)) {
      errors.genderUser = "Error. Only letters are allowed";
    }
    return errors;
  },

  async handleSubmit(values, formikBag) {
    formikBag.setSubmitting(false);
    console.log(values);

    const { emailUser, passUser, lastName, firstName } = values;

    const crearUsuario = async () => {
      await auth
        .createUserWithEmailAndPassword(emailUser, passUser)
        .then((user) => {
          user = firebase.auth().currentUser;

          db.collection("usuarios")
            .doc(emailUser)
            .set({
              createdAt: Date.now(),
              displayName: firstName + " " + lastName,
              photoURL:
                "https://s.gravatar.com/avatar/3e197a4860c827259fa152f1df317bf4?s=80",
              email: emailUser,
              banner:
                "https://wikitravel.org/upload/shared/6/6a/Default_Banner.jpg",
              uid: user.uid,
              location: "write any location",
              bio: "write about you",
              photos: 0,
              Followeres: 0,
              Following: 0,
              company: false,
            });

          user
            .updateProfile({
              displayName: firstName + " " + lastName,
              photoURL:
                "https://s.gravatar.com/avatar/3e197a4860c827259fa152f1df317bf4?s=80",
              email: emailUser,
              uid: user.uid,
            })
            .then(function () {
              // Update successful.
            })
            .catch(function (error) {
              // An error happened.
            });

          console.log(user);
          user
            .sendEmailVerification()
            .then(function () {
              // Email sent.
            })
            .catch(function (error) {
              var errorMessage = error.message;
              return errorMessage;
            });
        })
        .catch(function (error) {
          // Handle Errors here.
          //var errorCode = error.code;        <---- REVISAR
          var errorMessage = error.message;
          console.log(errorMessage);
          // ...
        });
    };
    crearUsuario();
  },
})(SignUpForm);
