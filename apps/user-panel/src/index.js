import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginScreen from "./components/loginScreen";
import OneTimePassword from "./components/otp";
import ForgetPasswordEmail from "./components/forgetPasswordEmail";
import SignUp from "./components/signUp/signup";
import Register from "./components/register/register";
import "./styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ConfirmSignUp from "./components/confirm";
import ForgetScreen from "./components/forgetScreen";
import UsersScreen from "./components/usersScreen";
import SetPassword from "./components/setPassword";
import PasswordScreen from "./components/passwordScreen";
import * as Sentry from "@sentry/react";

const DSN = "https://48ed957d34d342cbbbfe55ed9c4da998@o4505214857838592.ingest.sentry.io/4505584043884544";

Sentry.init({
  dsn: DSN,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
})

const path = (p) => "/user" + p;
const homePath = (h) => "/home" + h;
const router = createBrowserRouter([
  {
    path: path("/login"),
    element: <LoginScreen />,
  },
  {
    path: path("/otp"),
    element: <OneTimePassword />,
  },
  {
    path: path("/signup"),
    element: <SignUp />,
  },
  {
    path: path("/register"),
    element: <Register />,
  },
  {
    path: path("/confirm"),
    element: <ConfirmSignUp />,
  },
  {
    path: path("/setpassword"),
    element: <SetPassword />,
  },
  {
    path: path("/forget"),
    element: <ForgetPasswordEmail />,
  },
  {
    path: path("/forgetScreen"),
    element: <ForgetScreen />,
  },
  {
    path: path("/passwordscreen"),
    element: <PasswordScreen />,
  },
  {
    path: path(""),
    element: <SignUp />,
  },
  {
    path: homePath("/users"),
    element: <UsersScreen />,
  },
  {
    path: path("*"),
    element: <LoginScreen />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
