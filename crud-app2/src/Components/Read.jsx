import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Read = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (!confirmDelete) {
      return;
    }

    axios
      .delete(
        `https://6a4f84daf45d5352b6118b41.mockapi.io/crud-youtube/${id}`
      )
      .then(() => {
        toast.success("Record Deleted Successfully");
        getData();
      });
  }

  const setToLocalStorage = (id, name, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  };

  function getData() {
    setLoading(true);

    axios
      .get("https://6a4f84daf45d5352b6118b41.mockapi.io/crud-youtube")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
  const filteredData = data.filter((eachData) => {
  return (
    eachData.name.toLowerCase().includes(search.toLowerCase()) ||
    eachData.email.toLowerCase().includes(search.toLowerCase())
  );
});

  return (
    <>
      <h2>Read Operation</h2>
      <div className="mb-3">
  <input
    type="text"
    className="form-control"
    placeholder="Search by Name or Email"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
  {filteredData.length === 0 ? (
    <tr>
      <td colSpan="5" className="text-center text-danger">
        No Records Found 😞
      </td>
    </tr>
  ) : (
    filteredData.map((eachData) => (
      <tr key={eachData.id}>
        <th>{eachData.id}</th>
        <td>{eachData.name}</td>
        <td>{eachData.email}</td>

        <td>
          <button
            className="btn btn-success"
            onClick={() => {
              setToLocalStorage(
                eachData.id,
                eachData.name,
                eachData.email
              );
              navigate("/update");
            }}
          >
            Edit
          </button>
        </td>

        <td>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(eachData.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>
      </table>
    </>
  );
};

export default Read;