import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

enum GenderEnum {
  male = "male",
  female = "female",
  others = "others",
}
interface RegFormInput {
  username: string;
  email: string;
  gender: GenderEnum;
  age: number;
  password: string;
}
export default function Register() {
   const navigate = useNavigate ();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegFormInput>();

  const onSubmit = (data: RegFormInput) => {
    localStorage.setItem(
      'auth',
      JSON.stringify({
        username: data.username,
        email: data.email,
        gender: data.gender,
        age: data.age,
        password: data.password,
      })
    );
    reset();
    navigate('/login');
  };

  return (
    <div className="container mb-5" style={{ marginTop: "50px" }}>
      <div className="card col-6 mx-auto">
        <div className="card-header text-center text-primary h1">Register</div>
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
                <p className="text-danger">This Field is Required</p>
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
              <label className="form-label">Email address</label>
              <input
                className="form-control"
                {...register("email", {
                  required: true,
                  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                })}
              />
              {errors.email?.type === "required" && (
                <p className="text-danger">This Field is Required</p>
              )}
              {errors.email?.type === "pattern" && (
                <p className="text-danger"> Characters miss matched!</p>
              )}
            </div>
            <div className="form-group mb-3">
              <label className="form-label">Gender</label>
              <select className="form-select" {...register("gender")}>
                <option selected>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                {...register("age", { min: 18, max: 99 })}
              />
              {errors.age && (
                <p className="text-danger">
                  Age must be older then 18 and younger then 99 years old{" "}
                </p>
              )}
            </div>
            <div className="form-group mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <div className="mb-3">
            <p>
              Already user? go to <Link to="/login"> Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
function result(result: any) {
  throw new Error("Function not implemented.");
}
