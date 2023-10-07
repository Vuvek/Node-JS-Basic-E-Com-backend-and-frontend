import React, { useEffect, useReducer } from "react";
import * as style from "./Signup.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const reducer = (state, action) => {
    switch (action.type) {
      case "name": {
        return {
          ...state,
          name: action.payload.name,
        };
      }
      case "email": {
        return {
          ...state,
          email: action.payload.email,
        };
      }
      case "password": {
        return {
          ...state,
          password: action.payload.password,
        };
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(state, "state");
    const data = await axios
      .post("http://localhost:3001/signup-session", state, {
        withCredentials: true,
      })
      .catch((err) => {
        throw Error(err);
      });
    console.log(document.cookie, "cookieeee", data);
    if (!data.error) {
      localStorage.setItem("userData", JSON.stringify(data?.data?.data));

      // Comment out For JWT authentication
      // localStorage.setItem("token", JSON.stringify(data?.data?.jwt));

      // For Session and Cookies authentication
      // localStorage.setItem("token", JSON.stringify(data?.data?.jwt));

      navigate("/");
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("userData");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <div className="container">
        <div className={`${style["form-container"]}`}>
          <div className={style["shadow"]}>
            <div>
              <h1 className={style["heading"]}>Sign Up</h1>
            </div>
            <form className={style["form"]} onSubmit={handleSubmit}>
              <input
                name="name"
                value={state.name}
                onChange={(event) =>
                  dispatch({
                    type: "name",
                    payload: { name: event.target.value },
                  })
                }
                placeholder="Enter Name"
                className={style["input"]}
                type="text"
                required
              />
              <input
                name="email"
                value={state.email}
                onChange={(event) =>
                  dispatch({
                    type: "email",
                    payload: { email: event.target.value },
                  })
                }
                placeholder="Enter Email"
                className={style["input"]}
                type="text"
                required
              />
              <input
                name="password"
                value={state.password}
                onChange={(event) =>
                  dispatch({
                    type: "password",
                    payload: { password: event.target.value },
                  })
                }
                placeholder="Enter Password"
                className={style["input"]}
                type="text"
                required
              />
              <button type="submit" className={style["appButton"]}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
