import React from "react";
import "./login-light.css";
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
        .email("Please enter a valid Email address")
        .required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 5 characters")
        .required("Required"),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
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
            {formik.touched.email && formik.errors.email ? (
              <span className="login-error"> *Required</span>
            ) : null}
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
            {formik.touched.password && formik.errors.password ? (
              <span className="login-error"> *Required</span>
            ) : null}
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
  );
};

export default LoginForm;
