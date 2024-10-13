import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const User = ({
  member: { id, username, role },
  makeAdmin,
  makeUser,
  deleteUser,
}) => {
  const navigate = useNavigate();
  const [isCurrentUserAdmin, setCureentUSerAdmin] = useState(false);
  useEffect(() => {
    setCureentUSerAdmin(role === "admin" && id == window.localStorage.gi);
  }, [id]);
  return (
    <tr className="bg-blue-900 text-white">
      <td>{username}</td>
      <td>{role}</td>
      <td className="flex justify-evenly">
        <Button
          type="button"
          size="sm"
          onClick={() => navigate("/admin/AllUsers/ShowUser")}
        >
          View
        </Button>
        <Button type="button" size="sm">
          Edit
        </Button>
        <Button
          className="bg-red-500"
          type="button"
          size="sm"
          disabled={isCurrentUserAdmin}
          onClick={() => deleteUser(id)}
        >
          Delete
        </Button>
        <Button
          size="sm"
          disabled={isCurrentUserAdmin}
          onClick={() => {
            role === "admin" ? makeUser(id) : makeAdmin(id);
          }}
          color={`${
            role === "admin" && !isCurrentUserAdmin ? "green" : "black"
          }`}
        >
          {`${
            role === "admin" && !isCurrentUserAdmin ? "Make User" : "Make Admin"
          }`}
        </Button>
      </td>
    </tr>
  );
};

export default User;
