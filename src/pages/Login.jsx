import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  NavLink,
  useNavigate,
  Route,
  Routes,
} from "react-router-dom";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import MainNavbar from "../components/MainNavbar";
import MainFooter from "../components/MainFooter";
import Signup from "./Signup";

const Login = ({ users, setLoggedFlag, loggedFlag, role }) => {
  const [loggedUser, setLoggedUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [currentName, setName] = useState("");
  const [flag, setFlag] = useState(true);
  const checkLogin = (e) => {
    e.preventDefault();

    const checkUser = users.find(
      ({ email, password }) =>
        email === loggedUser.email && password === loggedUser.password
    );

    if (checkUser) {
      localStorage.gi = checkUser.id;
      setName(checkUser.username);
      setLoggedFlag(true);
      console.log(checkUser.role);
      navigate("/");
    } else {
      setFlag(false);
    }
  };

  return (
    <div>
      <MainNavbar
        loggedFlag={loggedFlag}
        setLoggedFlag={setLoggedFlag}
        currentName={currentName}
        role={role}
      />
      <Card
        color="transparent"
        shadow={false}
        className="flex items-center mt-10"
      >
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={checkLogin}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Input
              label="Email"
              onChange={(e) =>
                setLoggedUser({ ...loggedUser, email: e.target.value })
              }
            />
            <Input
              label="Password"
              type="password"
              onChange={(e) =>
                setLoggedUser({ ...loggedUser, password: e.target.value })
              }
            />
          </div>
          <Button className="mt-6 bg-[#014026]" fullWidth type="submit">
            Login
          </Button>
          <Typography
            color="gray"
            className={`${
              flag
                ? "hidden"
                : "block text-red-500 text-xl mt-4 text-center font-normal"
            }`}
          >
            Please enter a correct email and Password
          </Typography>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <Link
              to="/Signup"
              className="font-bold text-red-500"
              onClick={() => {
                navigate("/Signup");
              }}
            >
              SignUp
            </Link>
          </Typography>
        </form>
      </Card>
      <MainFooter />
    </div>
  );
};

export default Login;
