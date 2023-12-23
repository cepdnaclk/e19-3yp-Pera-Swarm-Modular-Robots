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

    //yup to validate in client side
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid Email address")
        .required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 5 characters")
        .required("Required"),
    }),

    onSubmit: (values) => {
      console.log(values); //debug
    },
  });

  return (
    <>
      <div className="login-card">
        <div className="login-header">
          <img className="login-logo" src="../src/assets/logo.svg" alt="Logo" />
          <h1>Login </h1>
        </div>

        <form autoComplete="on" onSubmit={formik.handleSubmit}>
          <div className="login-form-items">
            <label htmlFor="email" className="login-email">
              Email
            </label>
            <br></br>
            <input
              type="text"
              id="email"
              name="email"
              onChange={formik.handleChange} //used for realtime updates
              onBlur={formik.handleBlur} //notify the end of editing/typing in a field.(clicked outside)
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? ( //display error messages
              <div className="login-error">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="login-form-items">
            <label htmlFor="password" className="login-password">
              Password
            </label>
            <br></br>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="login-error">{formik.errors.password}</div>
            ) : null}
          </div>

          <input className="login-button" type="submit" value="Login" />
        </form>
      </div>
    </>
  );
};
export default LoginForm;
