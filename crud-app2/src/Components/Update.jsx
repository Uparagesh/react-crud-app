import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateForm } from "../Utils/validation";

const Update = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const errorMessage = validateForm(name, email);

    if (errorMessage) {
    setError(errorMessage);
    return;
  }

    setError("");

    await axios.put(
      `https://6a4f84daf45d5352b6118b41.mockapi.io/crud-youtube/${id}`,
      {
        name: name,
        email: email,
      }
    );

    toast.success("Record Updated Successfully");

    setTimeout(() => {
      navigate("/read");
    }, 1000);
  };

  return (
    <>
      <h2>Update Operation</h2>

      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>

          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>

          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {error && <p className="text-danger">{error}</p>}

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </>
  );
};

export default Update;