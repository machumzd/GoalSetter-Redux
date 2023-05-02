import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
   
  });
  const { email,password } = formData;
  const onChange = (e ) => {
    setFormData((prevState)=>({
        ...prevState,
        [e.target.email]:e.target.value,
        [e.target.password]:e.target.value
    }))
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and access your account</p>
      </section>

      <selection className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              placeholder="enter your email"
              onChange={onChange}
            />
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              placeholder="password"
              onChange={onChange}
            />
           
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </selection>
    </>
  );
}

export default Login;
