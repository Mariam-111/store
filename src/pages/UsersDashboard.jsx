import React, { useState } from "react";
import User from "../components/User";
import MainNavbar from "../components/MainNavbar";
import {
  Button,
  Card,
  Typography,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import ShowUser from "./showUser";
import Swal from "sweetalert2";
import axios from "axios";

const UsersDashboard = ({ users, getUsers }) => {
  const navigate = useNavigate();

  const patchRole = (id) => {
    const { role } = users.find((user) => user.id === id);
    axios({
      method: "patch",
      url: `${import.meta.env.VITE_API}/users/${id}`,
      data: {
        role: `${role === "admin" ? "user" : "admin"}`,
      },
    }).then(() => {
      getUsers();
    });
  };
  const makeAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Changing the role will affect the user permissions!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00d084",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make it!",
    }).then((result) => {
      if (result.isConfirmed) {
        patchRole(id);
        Swal.fire({
          title: "Done!",
          text: "The role has been updated.",
          icon: "success",
        });
      }
    });
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "DELETE",
          url: `${import.meta.env.VITE_API}/users/${id}`,
        }).then(() => getUsers());
        Swal.fire({
          title: "Deleted!",
          text: "This user has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <MainNavbar />
      <div>
        <div className="text-center mb-8">
          <h1 className="font-bold leading-snug tracking-tight text-slate-800 mx-auto my-6 w-full text-center text-2xl lg:max-w-3xl lg:text-5xl">
            Users
          </h1>

          <Link to="AddUser">
            <Button
              className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
              type="button"
            >
              add new user
            </Button>
          </Link>
        </div>
        <div>
          <table className="table table-auto text-center w-full min-w-max">
            <thead className="bg-[#607d8b] text-white font-bold text-base">
              <tr>
                <th className="w-1/4">Name</th>
                <th className="w-1/4">Role</th>
                <th className="w-1/2  text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((member, id) => (
                <User
                  key={id}
                  member={member}
                  makeAdmin={makeAdmin}
                  deleteUser={deleteUser}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersDashboard;
