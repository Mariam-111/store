import { Button } from "@material-tailwind/react";
import React, { useState } from "react";

const User = ({ member: {id, username, email, role },makeAdmin }) => {
  
  return (
    <div className="bg-red-500 flex justify-evenly">
      <div>Name: {username}</div>
      <div>Email: {email}</div>
      <div>Role: {role}</div>
      <div><Button size="sm" disabled={role === "admin"} onClick={()=> {makeAdmin(id)}} >Make An Admin</Button></div>
    </div>
  );
};

export default User;
