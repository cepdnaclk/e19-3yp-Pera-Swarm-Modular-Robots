import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: ""},
    validationSchema: Yup.object({
      email: Yup.string().email("Please enter a valid Email address!").required("Required"),
      password: Yup.string().min(8, "At least 8 characters!").required("Required"),
    }),

    onSubmit: async (values) => {

      try {
        const response = await axios.post('/login', values);
        const { accessToken, refreshToken, user } = response.data;
        
        // Save tokens and user info to local storage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));


        // Redirect to the dashboard

        if(user.role == 'admin'){
          navigate('/adminDashboard');
        }else {
          navigate('/userDashboard');
        }

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
    // <div className={`bg-bgd ${isDarkTheme ? 'dark:bg-dark-bgd' : ''}`}>
    //   <div className={`bg-container text-f p-8 pb-10 mb-5 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isDarkTheme ? 'dark:bg-dark-container dark:text-dark-f' : ''}`}>
    //     <div className="flex items-center mb-5">
    //       <img className="mr-5" src="../src/assets/logo.svg" alt="Logo" />
    //       <h1 className="text-2xl font-bold ">
    //         Pera Swarm <br /> Experimentation Hub
    //       </h1>
    //     </div>
    //     <hr className={`bg-container-accent h-1 mb-8 ${isDarkTheme ? 'dark:bg-dark-container-accent' : ''}`} />

    //     <form autoComplete="on" onSubmit={formik.handleSubmit}>
    //       <div className="mb-5">
    //         <label htmlFor="email" className={`text-f block mb-1 ${isDarkTheme ? 'dark:text-dark-f' : ''}`}>
    //           Email
    //           {getErrorForField("email") && (
    //             <span className="text-error ml-2">{getErrorForField("email")}</span>
    //           )}
    //         </label>
    //         <input
    //           type="text"
    //           id="email"
    //           name="email"
    //           placeholder="username@email.com"
    //           onChange={formik.handleChange}
    //           onBlur={formik.handleBlur}
    //           value={formik.values.email}
    //           className={`w-full px-4 py-2 box-border bg-transparent border border-container-accent rounded-md mb-5 ${isDarkTheme ? 'dark:border-dark-container-accent dark:text-dark-f' : ''}`}
    //         />
    //       </div>

    //       <div className="mb-5">
    //       <label htmlFor="password" className={`text-f block mb-1 ${isDarkTheme ? 'dark:text-dark-f' : ''}`}>
    //           Password
    //           {getErrorForField("password") && (
    //             <span className="text-error ml-2">{getErrorForField("password")}</span>
    //           )}
    //         </label>
    //         <input
    //           type="password"
    //           id="password"
    //           name="password"
    //           placeholder="xxxxxxxx"
    //           onChange={formik.handleChange}
    //           onBlur={formik.handleBlur}
    //           value={formik.values.password}
    //           className={`w-full px-4 py-2 box-border bg-transparent text-f border border-container-accent rounded-md mb-5 ${isDarkTheme ? 'dark:border-dark-container-accent dark:text-dark-f' : ''}`}
    //         />
    //       </div>

    //       <div className="flex justify-between">
    //         <input
    //           className={`w-1/2 p-2 rounded-md bg-container-accent hover:bg-primary text-f-accent font-semibold cursor-pointer ${isDarkTheme ? 'dark:bg-dark-container-accent dark:text-dark-f-accent dark:hover:bg-dark-primary' : ''}`}
    //           type="submit"
    //           value="Login"
    //         />
    //         <button
    //           className={`toggle flex items-center justify-center p-2 bg-container-accent hover:bg-primary text-f-accent font-semibold rounded-xl cursor-pointer transform transition-transform ${isDarkTheme ? 'rotate-180 dark:bg-dark-container-accent dark:text-dark-f-accent dark:hover:bg-dark-primary' : ''}`}
    //           type="button"
    //           onClick={toggleTheme}
    //         >
    //           {isDarkTheme ? "☀️ | 🌙" : "☀️ | 🌙"}
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>













<section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          PeraSwarm Experimentation
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
