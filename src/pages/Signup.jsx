import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ users, postUser }) => {
  const navigate = useNavigate();
  const [newUser, setnewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    role: "user",
  });
  const { username, email, password, role } = newUser;
  const userData = { username, email, password, role };

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!newUser.username) {
      newErrors.username = "Username is required.";
    }
    if (!newUser.email) {
      newErrors.email = "Email is required.";
    }
    if (!newUser.password) {
      newErrors.password = "Password is required.";
    }
    if (!newUser.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    }
    if (!newUser.gender) {
      newErrors.gender = "Gender is required.";
    }

    const checkUser = users.find(({ email }) => email === newUser.email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (checkUser) {
      newErrors.email = "Email is already exist";
    }
    if (newUser.email && !emailRegex.test(newUser.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (newUser.password && newUser.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    if (
      newUser.password &&
      newUser.confirmPassword &&
      newUser.password !== newUser.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      postUser(userData);
    }
  };
  return (
    <div>
      <Card
        color="transparent"
        shadow={false}
        className="flex items-center mt-10"
      >
        <Typography variant="h4" color="blue-gray">
          SignUp
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Input
              label="Username"
              name="username"
              value={newUser.username}
              onChange={(e) =>
                setnewUser({ ...newUser, username: e.target.value })
              }
              error={!!errors.username}
            />
            {errors.username && (
              <p className="text-red-500">{errors.username}</p>
            )}
            <Input
              label="Email"
              name="email"
              value={newUser.email}
              onChange={(e) =>
                setnewUser({ ...newUser, email: e.target.value })
              }
              error={!!errors.email}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            <Input
              label="Password"
              type="password"
              name="password"
              value={newUser.password}
              onChange={(e) =>
                setnewUser({ ...newUser, password: e.target.value })
              }
              error={!!errors.password}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={newUser.confirmPassword}
              onChange={(e) =>
                setnewUser({ ...newUser, confirmPassword: e.target.value })
              }
              error={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
            <Select
              label="Gender"
              name="gender"
              value={newUser.gender}
              onChange={(value) => setnewUser({ ...newUser, gender: value })}
              error={!!errors.gender}
            >
              <Option value="">Select Gender</Option>
              <Option value="Female">Female</Option>
              <Option value="Male">Male</Option>
            </Select>
            {errors.gender && <p className="text-red-500">{errors.gender}</p>}
          </div>
          <Button type="submit" className="mt-6 bg-[#014026]" fullWidth>
            SignUp
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link
              to="/Login"
              className="font-bold text-red-500"
              onClick={() => {
                navigate("/Login");
              }}
            >
              Login
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
