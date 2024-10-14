import React, { useState } from "react";
import User from "../components/User";
import {
  Button,
  Card,
  Typography,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";

const AllUsers = ({
  users,
  makeAdmin,
  makeUser,
  deleteUser,
  addUser,
  showForm,
  setShowForm,
  postUser,
  newUser,
  setnewUser,
  userData,
  errors,
  setErrors,
  validate,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      postUser(userData);
      setShowForm(false);
    }
  };

  return (
    <div className="bg-[#eeeeee] dark:bg-[#0F172A] text-black dark:text-white">
      {showForm ? (
        <Card
          color="transparent"
          shadow={false}
          className="flex items-center mt-10  "
        >
          <Typography variant="h4 " color="blue-gray">
            Add New User
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 "
            onSubmit={handleSubmit}
          >
            <div className="mb-1 flex flex-col gap-6 ">
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
              Add
            </Button>
          </form>
        </Card>
      ) : (
        <div>
          <div className="text-center mb-8">
            <h1 className="p-10 font-bold leading-snug tracking-tight text-slate-800 mx-auto w-full text-center text-2xl lg:max-w-3xl lg:text-5xl">
              Users
            </h1>
            <Button
              className="rounded-md bg-[#014026] py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
              type="button"
              onClick={() => addUser()}
            >
              add new user
            </Button>
          </div>
          <div>
            <table className="table dark:bg-gray-700 ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((member, id) => (
                  <User
                    key={id}
                    member={member}
                    makeAdmin={makeAdmin}
                    makeUser={makeUser}
                    deleteUser={deleteUser}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
