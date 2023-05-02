import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
  });
  const { name, email, phone, password, password2 } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password) {
      toast.error("passwords do not match");
    } else {
      const userData = {
        name,
        email,
        phone,
        password,
      };
      dispatch(register(userData));
    }
  };
  if (isLoading) {
    return <Spinner />;
  }
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
              name="name"
              value={name}
              placeholder="enter your name"
              onChange={onChange}
            />
            <input
              type="number"
              className="form-control"
              name="phone"
              value={phone}
              placeholder="enter your phone number"
              onChange={onChange}
            />
            <input
              type="text"
              className="form-control"
              name="email"
              value={email}
              placeholder="enter your email"
              onChange={onChange}
            />
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              placeholder="password"
              onChange={onChange}
            />
            <input
              type="password"
              className="form-control"
              name="password2"
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
