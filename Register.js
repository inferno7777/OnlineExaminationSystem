import axios from "axios";
import { useState } from "react";

export default function Register({ setPage }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {

    try {

      await axios.post(
        "http://localhost:5000/register",
        {
          email,
          password
        }
      );

      alert("Registered Successfully");

      setPage("login");

    } catch {

      alert("User already exists");

    }

  };

  return (
    <div className="container">

      <div className="card">

        <h1 className="title">
          Register
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
          onClick={register}
        >
          Register
        </button>

        <p
          className="link"
          onClick={() =>
            setPage("login")
          }
        >
          Back To Login
        </p>

      </div>

    </div>
  );
}
