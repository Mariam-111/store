import React from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import MainNavbar from "../components/MainNavbar";
import MainFooter from "../components/MainFooter";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div>
      <MainNavbar />
      <Card
        color="transparent"
        shadow={false}
        className="flex items-center mt-10"
      >
        <Typography variant="h4" color="blue-gray">
          SignUp
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Input label="Username" />
            <Input label="Email" />
            <Input label="Password" type="password" />
            <Select label="Gender">
              <Option>Female</Option>
              <Option>Male</Option>
            </Select>
          </div>
          <Button className="mt-6 bg-[#014026]" fullWidth>
            SignUp
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link
              to="/Login"
              className="font-bold text-red-500"
              onClick={()=>{
                navigate("/Login");
              }}
            >
              Login
            </Link>
          </Typography>
        </form>
      </Card>
      <MainFooter />
    </div>
  );
};

export default Signup;
