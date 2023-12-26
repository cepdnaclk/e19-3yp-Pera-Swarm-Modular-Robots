import React, { useEffect, useState } from "react";
import "./login.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid Email address!")
        .required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 5 characters!")
        .required("Required"),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });

  // Move the body variable outside the toggleTheme function
  const body = document.body;
  const [isDarkTheme, setIsDarkTheme] = useState(body.getAttribute("data-theme") === "dark");

  useEffect(() => {
    // Check the initial theme when the component mounts
    setIsDarkTheme(body.getAttribute("data-theme") === "dark");
  }, []);

  function toggleTheme() {
    const currentTheme = body.getAttribute("data-theme");

    if (currentTheme === "light") {
      body.setAttribute("data-theme", "dark");
    } else {
      body.setAttribute("data-theme", "light");
    }
    
    setIsDarkTheme(!isDarkTheme);
  }

  const getErrorForField = (fieldName) => {
    // Check if the field has been touched and has an error
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      // If the field has a specific error message, show it; otherwise, show the default "*Required"
      return formik.errors[fieldName] === "Required" ? "*Required" : formik.errors[fieldName];
    }
    return null;
  };

  return (
    <div>
      <div className="login-card">
        <div className="login-header">
          <img className="login-logo" src="../src/assets/logo.svg" alt="Logo" />
          <h1>Pera Swarm Experimentation Hub</h1>
        </div>
        <hr className="divider" />

        <form autoComplete="on" onSubmit={formik.handleSubmit}>
          <div className="login-form-items">
            <label htmlFor="email" className="login-email">
              Email
              {getErrorForField("email") && (
                <span className="login-error">{getErrorForField("email")}</span>
              )}
            </label>
            <br />
            <input
              type="text"
              id="email"
              name="email"
              placeholder="username@email.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>

          <div className="login-form-items">
            <label htmlFor="password" className="login-password">
              Password
              {getErrorForField("password") && (
                <span className="login-error">{getErrorForField("password")}</span>
              )}
            </label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="At least 5 characters"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </div>

          <input className="login-button" type="submit" value="Login" />
        </form>
      </div>
      <button
        className={`toggle ${isDarkTheme ? "rotate" : ""}`}
        onClick={toggleTheme}
      >
        {isDarkTheme ? "☀️" : "🌙"} | {isDarkTheme ? "🌙" : "☀️"}
      </button>
    </div>
  );
};

export default LoginForm;
