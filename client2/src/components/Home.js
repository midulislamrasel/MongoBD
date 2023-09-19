import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

export default function Home() {
  const users = useLoaderData();
  const [displayUsers, setDisplayUsers] = useState(users);

  //Deleting infomeson
  const handleDelete = (user) => {
    const agree = window.confirm(
      `Are you sure your want to Delete : ${user.name}`
    );

    if (agree) {
      //console.log(user._id);
      fetch(`http://localhost:5000/users/${user._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("user Deleted successfully");
            const remeiningUsers = displayUsers.filter(
              (usr) => usr._id !== user._id
            );
            setDisplayUsers(remeiningUsers);
          }
          console.log(data);
        });
    }
    //console.log("Deleting Item", user._id);
  };

  return (
    <div>
      <h2>users: {displayUsers.length}</h2>
      <div>
        {displayUsers.map((user) => (
          <div style={{ border: "2px solid yellow" }} key={user._id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <Link to={`/update/${user._id}`}>
              <button>update</button>
            </Link>
            <button onClick={() => handleDelete(user)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
}
