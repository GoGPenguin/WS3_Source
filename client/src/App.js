import React, { useState } from "react";
import "./App.css";
import AddUserForm from "./AddUserForm";
import DeleteUserForm from "./DeleteUserForm";

function App() {
  const [users, setUsers] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchUsers = async () => {
    try {
      if (users.length > 0) {
        setUsers([]); // Clear the list if already fetched
      } else {
        const response = await fetch(`${apiUrl}/users`); // Fetch from API
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data); // Update state with the fetched data
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Service</h1>
        <button onClick={fetchUsers}>Fetch Users</button>

        {/* Table to display user data */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.gender ? "Female" : "Male"}</td> {/* Adjusted gender display */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users fetched</td>
              </tr>
            )}
          </tbody>
        </table>
      </header>
      <AddUserForm onUserAdded={fetchUsers} />
      <DeleteUserForm onUserDeleted={fetchUsers} />
    </div>
  );
}

export default App;
