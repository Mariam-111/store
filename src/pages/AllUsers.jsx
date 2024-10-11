import React from "react";
import User from "../components/User";

const AllUsers = ({ users,makeAdmin}) => {
  return (
    <div className="bg-blue-300">
      hello from dashboard
      {users.map((member, id) => (
        <User
          key={id}
          member={member}
          makeAdmin={makeAdmin}
        />
      ))}
    </div>
  );
};

export default AllUsers;
