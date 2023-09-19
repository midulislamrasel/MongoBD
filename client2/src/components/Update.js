import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

export default function Update() {
  const storedUser = useLoaderData();

  const [user, setUser] = useState(storedUser);

  const handleUpdateuser = (event) => {
    event.preventDefault();
    //console.log(user);
    fetch(`http://localhost:5000/users/${storedUser._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Update data");
        }
        console.log(data);
      });
  };

  const handlInputChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    //console.log(value, field);
    const newUser = { ...storedUser };
    newUser[field] = value;
    setUser(newUser);
  };
  return (
    <div>
      <h2>Update Users: {storedUser.name}</h2>
      <form onSubmit={handleUpdateuser}>
        <input
          onChange={handlInputChange}
          type="text"
          name="name"
          defaultValue={storedUser.name}
          placeholder="Enter your Name :"
          required
        ></input>
        <input
          onChange={handlInputChange}
          type="email"
          name="email"
          placeholder="Enter your Email :"
          defaultValue={storedUser.email}
          required
        ></input>
        <button type="submit">Update User </button>
      </form>
    </div>
  );
}
