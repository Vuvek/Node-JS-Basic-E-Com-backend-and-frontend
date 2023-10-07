import React, { useEffect, useRef, useState } from "react";
import { LOGO_URL } from "../../utils/img_constants";
import * as HeaderStyle from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setSearchValue } from "../../appStore/slices/search.slice";
import { useDispatch } from "react-redux";
import axios from "axios";

const addActiveClass = ({ isActive, isPending }) =>
  isPending ? HeaderStyle.pending : isActive ? HeaderStyle.active : "";

function Header() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const intervalId = useRef(null);

  const dispatch = useDispatch();

  const userData = localStorage.getItem("userData");
  console.log(userData, "userDatalkaj");
  useEffect(() => {
    setUser(JSON.parse(userData));
  }, [userData]);

  const handleLogout = async () => {
    localStorage.removeItem("userData");
    const response = await axios.delete(
      `http://localhost:3001/logout-session`,
      {
        withCredentials: true,
      }
    );
    console.log(response, "truereieriri");
    if (!response.data.error) {
      setUser(null);
      navigate("/signup");
    } else {
      console.log("Something is wrong over here");
    }
  };

  const doActionAfterBounce = (event) => {
    dispatch(setSearchValue(event.target.value));
  };

  function debounceFun(fun, delay) {
    return function (event) {
      const context = this;
      const args = arguments;
      setSearch(event.target.value);
      // if (!intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = setTimeout(() => {
        // intervalId.current = null;
        fun.apply(context, args);
      }, delay);
      // }
    };
  }

  // const handleSearch = (event) => {
  //   setSearch(event.target.value);
  //   const upgraded = debounceFun(doActionAfterBounce, 3000);
  //   upgraded(event.target.value);
  //   dispatch(setSearchValue(event.target.value));
  // };

  return (
    <header className={`${HeaderStyle.header}`}>
      <nav>
        <div className={`${HeaderStyle["nav-container"]} container`}>
          <div>
            <img
              className={`${HeaderStyle.logo}`}
              src={LOGO_URL}
              alt="Company-Logo"
            />
          </div>
          <input
            type="text"
            className={HeaderStyle.search}
            placeholder="Search Products"
            value={search}
            onChange={debounceFun(doActionAfterBounce, 300)}
          />
          <div className={`${HeaderStyle["nav-list-container"]}`}>
            <ul className={`${HeaderStyle["nav-list"]}`}>
              {!user ? (
                <>
                  <li className={`${HeaderStyle["nav-item"]}`}>
                    <NavLink to={"/signup"} className={addActiveClass}>
                      Signup
                    </NavLink>
                  </li>
                  <li className={`${HeaderStyle["nav-item"]}`}>
                    <NavLink to={"/login"} className={addActiveClass}>
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className={`${HeaderStyle["nav-item"]}`}>
                    <NavLink className={addActiveClass} to={"/"}>
                      Home
                    </NavLink>
                  </li>
                  <li className={`${HeaderStyle["nav-item"]}`}>
                    <NavLink className={addActiveClass} to={"/add"}>
                      Add
                    </NavLink>
                  </li>
                  {/* <li className={`${HeaderStyle["nav-item"]}`}>
                    <NavLink className={addActiveClass} to={"/update/"}>
                      Update
                    </NavLink>
                  </li> */}
                  <li
                    className={`${HeaderStyle["nav-item"]}`}
                    onClick={handleLogout}
                  >
                    <NavLink to={"/signup"} className={addActiveClass}>
                      Logout ({user && user?.name?.split(" ")[0]})
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
