import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
  });
  const { name, email, phone, password, password2 } = formData;
  const onChange = (e ) => {
    setFormData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value,
        [e.target.email]:e.target.value,
        [e.target.phone]:e.target.value,
        [e.target.password]:e.target.value,
        [e.target.password2]:e.target.value
    }))
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <selection className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              placeholder="enter your name"
              onChange={onChange}
            />
            <input
              type="number"
              className="form-control"
              id="phone"
              value={phone}
              placeholder="enter your phone number"
              onChange={onChange}
            />
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
            <input
              type="password"
              className="form-control"
              id="password2"
              value={password2}
              placeholder="Confirm password"
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

export default Register;
