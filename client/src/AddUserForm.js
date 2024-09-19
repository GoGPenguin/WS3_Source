import React, { useState } from "react";

function AddUserForm({ onUserAdded }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(false); // false = Male, true = Female
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = { id, name, age, gender };
    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      const response = await fetch(`${apiUrl}/users`, {
        // Replace with your API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setMessage("User added successfully!");
      setName("");
      setAge("");
      setGender(false);
      onUserAdded(); // Notify parent component to refresh the user list
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to add user.");
    }
  };

  return (
    <div className="AddUserForm">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Gender:
          <select
            value={gender ? "Female" : "Male"}
            onChange={(e) => setGender(e.target.value === "Female")}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <br />
        <button type="submit">Add User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddUserForm;
