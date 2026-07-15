import axios from "axios";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useState } from 'react';
import Create from './Components/Create';
import Read from "./Components/Read";
import Update from "./Components/Update";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateForm } from './Utils/validation';




function App() {
  const [name, setName]= useState("");
    const [email, setEmail]= useState("");
    const [error, setError]= useState("");
    //const header= {"Access-Control-Allow-Origin": "*" };
    const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = validateForm(name, email);

    if (errorMessage) {
    setError(errorMessage);
    return false;
  }

  setError("");
  await axios.post(
    "https://6a4f84daf45d5352b6118b41.mockapi.io/crud-youtube",
    {
      name,
      email,
    }
  );

  return true;
};

  return (
    <BrowserRouter>
    <div className="container">
  <Routes>
    <Route
      path="/"
      element={
          <Create
            setName={setName}
            setEmail={setEmail}
            handleSubmit={handleSubmit}
            error={error}
          />   
      }
    />
    <Route
            path="/read"
            element={<Read />}
          />
    <Route
           path="/update" 
           element={<Update />} 
           />
           
  </Routes>
  <ToastContainer />
  </div>
</BrowserRouter>
  )};

export default App
