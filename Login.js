import axios from "axios";
import { useState } from "react";

export default function Login({ setPage }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      setPage("dashboard");

    } catch {

      alert("Invalid Login");

    }

  };

  return (
    <div className="container">

      <div className="card">

        <h1 className="title">
          Login
        </h1>

        <input
          className="input"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="btn"
          onClick={login}
        >
          Login
        </button>

        <p
          className="link"
          onClick={() =>
            setPage("register")
          }
        >
          Create Account
        </p>

      </div>

    </div>
  );
}
