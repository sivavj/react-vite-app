import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { UserDetails } from "./component/UserDetails";
import Todo from "./component/Todo";
import { ThemeProvider } from "./component/theme-context";
import Dashboard from "./component/Dashboard";
import PostApp from "./component/PostApp";
import Login from "./component/Login";
import Register from "./component/Register";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<App />}>
            {/* <Route index element={<Dashboard />} /> */}
            <Route index element={<Dashboard />} />
            <Route path="/post" element={<PostApp />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/users" element={<UserDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
