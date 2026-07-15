import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


const Create = ({ setName, setEmail, handleSubmit, error }) => {
  const navigate = useNavigate();
   const submit = async (e) => {
  const success = await handleSubmit(e);
   if (success) {
    toast.success("Record Added Successfully");
    setTimeout(()=>{
     navigate("/read");
    },1000)
  }
};
  return (
   <>
   <h2>Create</h2>
   <form onSubmit={submit}>
    <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input
     type="text"
     className="form-control"
     id='name'
     onChange={(e)=>setName(e.target.value)}
     />
     </div>
     {error && <p className="text-danger">{error}</p>}

  <div className="mb-3">
    <label  htmlFor="email" className="form-label">Email address</label>
    <input type="email" 
    className="form-control" 
    id="email"
    onChange={(e)=>setEmail(e.target.value)}
    />
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
 </form>
   </>
);
}

export default Create;