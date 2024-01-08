import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from '../api/axios';

const LoginForm = () => {
  const formik = useFormik({
    initialValues: { email: "", password: ""},
    validationSchema: Yup.object({
      email: Yup.string().email("Please enter a valid Email address!").required("Required"),
      password: Yup.string().min(2, "At least 8 characters!").required("Required"),
    }),
    onSubmit: async (values) => {

      try {
        const response = await axios.post('/login', values);
        const { accessToken, refreshToken, user } = response.data;
        
        // Save tokens and user info to local storage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));

      } catch (error) {
        // If the request failed, display the error message
        
      }


    },
  });











  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme(document.body.getAttribute("data-theme") === "dark");
  }, []);

  const toggleTheme = () => {
    const currentTheme = document.body.getAttribute("data-theme");
    document.body.setAttribute("data-theme", currentTheme === "light" ? "dark" : "light");
    setIsDarkTheme(!isDarkTheme);
  };

  const getErrorForField = (fieldName) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return formik.errors[fieldName] === "Required" ? "* Required" : formik.errors[fieldName];
    }
    return null;
  };










  return (
    <div className={`bg-bgd ${isDarkTheme ? 'dark:bg-dark-bgd' : ''}`}>
      <div className={`bg-container text-f p-8 pb-10 mb-5 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isDarkTheme ? 'dark:bg-dark-container dark:text-dark-f' : ''}`}>
        <div className="flex items-center mb-5">
          <img className="mr-5" src="../src/assets/logo.svg" alt="Logo" />
          <h1 className="text-2xl font-bold ">
            Pera Swarm <br /> Experimentation Hub
          </h1>
        </div>
        <hr className={`bg-container-accent h-1 mb-8 ${isDarkTheme ? 'dark:bg-dark-container-accent' : ''}`} />

        <form autoComplete="on" onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="text-f block mb-1">
              Email
              {getErrorForField("email") && (
                <span className="text-error ml-2">{getErrorForField("email")}</span>
              )}
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="username@email.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`w-full px-4 py-2 box-border bg-transparent border border-container-accent rounded-md mb-5 ${isDarkTheme ? 'dark:border-dark-container-accent dark:text-dark-f-accent' : ''}`}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="text-f block mb-1">
              Password
              {getErrorForField("password") && (
                <span className="text-error ml-2">{getErrorForField("password")}</span>
              )}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="xxxxxxxx"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`w-full px-4 py-2 box-border bg-transparent border border-container-accent rounded-md mb-5 ${isDarkTheme ? 'dark:border-dark-container-accent dark:text-dark-f-accent' : ''}`}
            />
          </div>

          <div className="flex justify-between">
            <input
              className={`w-1/2 p-2 rounded-md bg-container-accent text-f-accent font-semibold cursor-pointer ${isDarkTheme ? 'dark:bg-dark-container-accent dark:text-dark-f-accent' : ''}`}
              type="submit"
              value="Login"
            />
            <button
              className={`toggle flex items-center justify-center p-2 bg-container-accent text-f-accent font-semibold rounded-xl cursor-pointer transform transition-transform ${isDarkTheme ? 'rotate-180 dark:bg-dark-container-accent dark:text-dark-f-accent' : ''}`}
              onClick={toggleTheme}
            >
              {isDarkTheme ? "☀️ | 🌙" : "☀️ | 🌙"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
