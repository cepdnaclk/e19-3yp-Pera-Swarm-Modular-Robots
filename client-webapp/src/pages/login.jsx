import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from '../api/axios';
import { ErrorDialog } from '../components/dialogBox';

const LoginForm = () => {
  const [errMsg, setErrMsg] = useState(null);
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Please enter a valid Email address!").required("Required"),
      password: Yup.string().min(8, "At least 8 characters!").required("Required"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await axios.post('/login', values);

        if (response.status === 200) {
          const { accessToken, refreshToken, user } = response.data;

          // Save tokens and user info to local storage
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('user', JSON.stringify(user));

          dispatchEvent(new Event("user-change"));
        } else {
          showErrorDialog(response.data.message);
        }
      } catch (error) {
        console.log(error);
        // If the request failed, display the error message
        showErrorDialog(error.response ? error.response.data.message : error.message);
      }
    },
  });

  const getErrorForField = (fieldName) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return formik.errors[fieldName] === "Required" ? "* Required" : formik.errors[fieldName];
    }
    return null;
  };

  const showErrorDialog = (message) => {
    setErrMsg(message);
    setShowErrorMsg(true);
  };

  const closeErrorDialog = () => {
    setShowErrorMsg(false);
    setErrMsg(null);
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 mx-auto pt-14 ">
        <div className="w-full rounded-2xl drop-shadow-2xl border md:mt-0 sm:max-w-md xl:p-0 bg-secondary border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-mainText md:text-2xl ">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium  text-mainText">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="outline-none bg-ternary border border-gray-300 text-mainText sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
                <div className=" text-red-500 text-sm font-medium ">
                  {getErrorForField("email") && (
                    <span className="text-error ml-2"> {getErrorForField("email")} </span>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-mainText">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={'password'}
                    name="password"
                    id="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="outline-none bg-ternary border border-gray-300 text-mainText sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="xoxo"
                    required
                  />
                  <div className=" text-red-500 text-sm font-medium ">
                    {getErrorForField("password") && (
                      <span className="text-error ml-2">{getErrorForField("password")}</span>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-950 text-white hover:text-mainText  hover:bg-ternary focus:ring-2 focus:outline-none  focus:ring-primery font-medium rounded-lg text-sm px-1 py-2 text-center "
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
      <ErrorDialog
        showState={showErrorMsg}
        closefn={closeErrorDialog}
        buttonClickFunction={closeErrorDialog}
        title="Something is wrong !"
        errMsg={errMsg}
        btnText="okay"
      />
    </section>
  );
};

export default LoginForm;
