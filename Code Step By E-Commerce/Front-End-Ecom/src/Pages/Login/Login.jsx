import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import * as style from "./Login.module.css";
import axios from "axios";

function Login() {
  const initialState = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const reducer = (state, action) => {
    switch (action.type) {
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
      case "reset": {
        return initialState;
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await axios
      .post("http://localhost:3001/login-session", state, {
        withCredentials: true,
      })
      .catch((err) => {
        throw Error(err);
      });
    console.log(data, state, "alkjsdflksjdaflkjsalkdf", document.cookie);
    if (!data?.data.error) {
      localStorage.setItem("userData", JSON.stringify(data?.data.user));
      localStorage.setItem("token", JSON.stringify(data?.data?.jwt));
      navigate("/");
    } else {
      dispatch({ type: "reset" });
      alert("Please Enter Valid Credentials");
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

export default Login;
