import React, { useState } from "react";

function DeleteUserForm({ onUserDeleted }) {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/users/${id}`, {
        // Replace with your API endpoint
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setMessage("User deleted successfully!");
      setId("");
      onUserDeleted(); // Notify parent component to refresh the user list
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to delete user.");
    }
  };

  return (
    <div className="DeleteUserForm">
      <h2>Delete User</h2>
      <form onSubmit={handleDelete}>
        <label>
          User ID:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Delete User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DeleteUserForm;
