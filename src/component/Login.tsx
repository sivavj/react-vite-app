import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

interface LogFromInput {
  username: string;
  password: string;
  check: boolean;
}

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogFromInput>();

  const onSubmit = (data: LogFromInput) => {
    // alert(JSON.stringify(data));
    const getData = JSON.parse(localStorage.getItem('auth')!);
    if (
      getData.username === data.username &&
      getData.password === data.password
    ) {
      alert("Loggin Success");
      navigate("/");
    }
    else {
     alert ('username or password miss match');
    }
  };

  return (
    <div className="container mb-5" style={{ marginTop: "50px" }}>
      <div className="card col-6 mx-auto">
        <div className="card-header text-center text-primary h1">Log In</div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-3">
              <label className="form-label">User Name</label>
              <input
                className="form-control"
                {...register("username", {
                  required: true,
                  maxLength: 20,
                  pattern: /^[A-Za-z]+$/i,
                })}
              />
              {errors.username?.type === "required" && (
                <p className="text-danger">This field is required</p>
              )}
              {errors.username?.type === "maxLength" && (
                <p className="text-danger">
                  User name cannot exceed 20 characters
                </p>
              )}
              {errors.username?.type === "pattern" && (
                <p className="text-danger">Alphabetical characters only</p>
              )}
            </div>
            <div className="form-group mb-3">
              <label className="form-label">Password</label>
              <input
                type='password'
                className="form-control"
                {...register("password", {
                  required: true,
                  pattern:
                    /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                })}
              />
              {errors.password?.type === "required" && (
                <p className="text-danger">This field is required</p>
              )}
              {errors.password?.type === "pattern" && (
                <ul className="text-danger">
                  <li>
                    The password must contain one or more uppercase characters
                  </li>
                  <li>
                    The password length must be greater than or equal to 8
                  </li>
                  <li>
                    The password must contain one or more lowercase characters
                  </li>
                  <li>
                    The password must contain one or more numeric values The
                    password must contain one or more special characters
                  </li>
                </ul>
              )}
            </div>
            <div className="from-group mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                {...register("check", { required: true })}
              />
              <label className="form-check-label">Check me out</label>
              {errors.check?.type === "required" && (
                <p className="text-danger">This field is required</p>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <div className="mb-3">
            <p>
              Are you new user? go to <Link to="/register"> Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
