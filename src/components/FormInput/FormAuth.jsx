import Input from "./Elements/input";
import Button from "../Button";
import { Link } from "react-router-dom";
import { register, login } from "../../services/auth.services";
import { useState } from "react";

const FormAuth = ({ isLoginPage }) => {
  const [registered, setRegistered] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [notRegistered, setNotRegistered] = useState("");
  const [tokenAuth, setTokenAuth] = useState(null);

  const handleRegister = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    if (data.name !== "") {
      setErrorName("");
    }
    if (data.password !== "") {
      setErrorPassword("");
    }
    register(data, (success, response) => {
      if (success) {
        setErrorEmail("");
        setErrorName("");
        setErrorPassword("");
        setRegistered("success");
        window.location = "/login";
      } else {
        setRegistered("failed");
        const email = response.response.data.errors.email[0];
        if (email == "The email field must be a valid email address.") {
          setErrorEmail("");
          setErrorEmail("The email field must be a valid email address.");
        } else if (email == "The email has already been taken.") {
          setErrorEmail("");
          setErrorEmail("The email has already been taken.");
        } else if (email == "The email field is required.") {
          setErrorEmail("");
          setErrorEmail("The email field is required.");
        }
        const name = response.response.data.errors.name[0];
        if (name == "The name field is required.") {
          setErrorName("The name field is required.");
        }
        const password = response.response.data.errors.password[0];
        if (password == "The password field is required.") {
          setErrorPassword("The password field is required.");
        }
      }
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    login(data, (success, response) => {
      if (success) {
        setLoginSuccess("success");
        const token = response.data;
        setTokenAuth(token);
        localStorage.setItem("token", JSON.stringify(token));
        window.location = "/";
      } else {
        const err = response.response.data.errors.message;
        if (err) {
          setErrorEmail("");
          setNotRegistered("username or passsword is wrong");
        }
        const email = response.response.data.errors.email[0];
        if (email == "The email field must be a valid email address.") {
          setErrorEmail("");
          setErrorEmail("The email field must be a valid email address.");
        }
      }
    });
  };

  return (
    <form onSubmit={isLoginPage == false ? handleRegister : handleLogin}>
      <div className="bg-zinc-800 h-screen">
        <h1 className="font-bold text-3xl text-center text-white pt-36">
          {isLoginPage == false
            ? "Create New Account"
            : "Login to your Account"}
        </h1>
        {loginSuccess == "success" && (
          <div className="flex">
            <div className="basis-1/3"></div>
            <div className="basis-1/3">
              <p className="mt-5 bg-green-500 px-3 py-1 rounded-sm">
                Login successfully
              </p>
            </div>
            <div className="basis-1/3"></div>
          </div>
        )}
        {registered == "success" && (
          <div className="flex">
            <div className="basis-1/3"></div>
            <div className="basis-1/3">
              <p className="mt-5 bg-green-500 px-3 py-1 rounded-sm">
                Register successfully
              </p>
            </div>
            <div className="basis-1/3"></div>
          </div>
        )}
        {registered == "failed" && (
          <div className="flex">
            <div className="basis-1/3"></div>
            <div className="basis-1/3">
              <p className="mt-5 bg-red-500 px-3 py-1 rounded-sm">
                Register failed
              </p>
            </div>
            <div className="basis-1/3"></div>
          </div>
        )}
        {notRegistered && (
          <div className="flex">
            <div className="basis-1/3"></div>
            <div className="basis-1/3">
              <p className="mt-5 bg-red-500 px-3 py-1 rounded-sm">
                {notRegistered}
              </p>
            </div>
            <div className="basis-1/3"></div>
          </div>
        )}
        <div className="flex mt-5">
          <div className="basis-1/3"></div>
          <div className="basis-1/3">
            {isLoginPage === false && (
              <div>
                <Input type="text" placeholder="Fullname" name="name" />
                {errorName && <p className="text-red-500 py-3">*{errorName}</p>}
              </div>
            )}
            <div className="mt-1">
              <Input type="text" placeholder="Email Address" name="email" />
            </div>
            {errorEmail && <p className="text-red-500 py-3">*{errorEmail}</p>}
            <div className="mt-1">
              <Input type="password" placeholder="Password" name="password" />
            </div>
            {errorPassword && (
              <p className="text-red-500 py-3">*{errorPassword}</p>
            )}
            <div className="flex justify-between mt-3">
              <Button type="submit" weight="px-7">
                {isLoginPage == false ? "Register" : "Login"}
              </Button>
              <p className="text-white">
                <Link to={isLoginPage == true ? "/register" : "/login"}>
                  {isLoginPage == true
                    ? "No account yet? Register"
                    : "Have an account? Login"}
                </Link>
              </p>
            </div>
          </div>
          <div className="basis-1/3"></div>
        </div>
      </div>
    </form>
  );
};

export default FormAuth;
