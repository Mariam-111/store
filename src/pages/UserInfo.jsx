import React, { useState } from "react";

const UserInfo = () => {
 
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
  });

 
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 bg-[#eeeeee] dark:bg-[#0F172A] text-black dark:text-white">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 dark:bg-gray-700">
        <div className="flex justify-center mb-4">
          <img
            src={
              user.gender === "male"
                ? "https://icons.veryicon.com/png/o/internet--web/web-interface-flat/6606-male-user.png"
                : "https://icons.veryicon.com/png/o/emoticon/professional-portrait-shameless-10/female-post.png"
            }
            alt="User Avatar"
            className="rounded-full w-24 h-24"
          />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-600">{user.name}</h1>
          <p>Username: {user.name}</p>
          <p>
            My name is {user.name}, I'm a {user.gender} and I'm a member here.
          </p>
        </div>


        <form
          className="space-y-6 text-black dark:text-white"
          onSubmit={handleSubmit}
        >

          <div>
            <label className="block font-bold mb-2">Your User Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-3 border text-black border-gray-300 rounded-lg bg-gray-100"
            />
            <p className="text-xs mt-1">
              Better to have a unique username to give a good impression to
              others.
            </p>
          </div>

          <div>
            <label className="block font-bold mb-2">Your E-Mail</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-3 border rounded-lg bg-gray-100 text-black"
            />
            <p className="text-xs mt-1">
              Better to have a readable E-Mail to give a good impression to
              others.
            </p>
          </div>

          <div>
            <label className="block  font-bold mb-2">Your Gender</label>
            <input
              type="text"
              name="gender"
              value={user.gender}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-3 border rounded-lg bg-gray-100 text-black"
            />
            <p className="text-xs mt-1">
              Please be noted that we do not support homosexuality,{" "}
              <strong class="text-xl font-bold text-red-500">
                straight out bitch
              </strong>
              .
            </p>
          </div>

          <div>
            <label className="block font-bold mb-2">Your Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-black"
            />
            <p className="text-xs mt-1">
              Better to have a unique password to give a good impression to
              others.
            </p>
          </div>

         
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={handleEditToggle}
              className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            {isEditing && (
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg"
              >
                Confirm Editing
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
