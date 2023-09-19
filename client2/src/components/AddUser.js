import React, { useState } from "react";

export default function AddUser() {
  const [user, setUser] = useState({});

  const handleAdduser = (event) => {
    event.preventDefault();
    //console.log(user);

    //Cliend to Server setup
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("Entey your informeson");
          //form reset
          event.target.reset();
        }
        console.log(data);
      });
  };

  //HeandleINputBlur
  const handlInputBlur = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    //console.log(value, field);

    const newUser = { ...user };
    newUser[field] = value;
    setUser(newUser);

    //console.log(newUser);
  };

  return (
    <div>
      <h2>AddUser</h2>
      <form onSubmit={handleAdduser}>
        <input
          onChange={handlInputBlur}
          type="text"
          name="name"
          placeholder="Enter your Name :"
          required
        ></input>
        <input
          onChange={handlInputBlur}
          type="email"
          name="email"
          placeholder="Enter your Email :"
          required
        ></input>
        <button type="submit">Add to database</button>
      </form>
    </div>
  );
}
