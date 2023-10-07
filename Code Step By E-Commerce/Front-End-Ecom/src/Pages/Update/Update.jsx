import React, { useEffect, useReducer, useState } from "react";
import * as style from "./Update.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const navigate = useNavigate();
  const params = useParams();
  let token = localStorage.getItem("token");

  console.log(params, "params");
  const id = params?.id;
  const reducer = (state, action) => {
    switch (action.type) {
      case "name": {
        return {
          ...state,
          name: action.payload.name,
        };
      }
      case "brand": {
        return {
          ...state,
          brand: action.payload.brand,
        };
      }
      case "price": {
        return {
          ...state,
          price: action.payload.price,
        };
      }
      case "category": {
        return {
          ...state,
          category: action.payload.category,
        };
      }
      case "updateAll": {
        return {
          ...state,
          name: action.payload.name,
          brand: action.payload.brand,
          price: action.payload.price,
          category: action.payload.category,
        };
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    name: "",
    brand: "",
    price: "",
    category: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData"));
    // const userId = userData?.data.user._id;
    const userId = userData?._id;

    console.log("chlingklsadlkkljsdajflksadjflksad");

    // This code is for JWT
    // const data = await axios
    //   .put(
    //     `http://localhost:3001/updateProductById/${id}`,
    //     {
    //       ...state,
    //       userId,
    //     },
    //     { headers: { Authorization: `bearer ${JSON.parse(token)}` } }
    //   )
    //   .catch((err) => {
    //     throw Error(err);
    //   });

    // This code is for Session and Cookies
    const data = await axios
      .put(
        `http://localhost:3001/updateProductById/${id}`,
        {
          ...state,
          userId,
        },
        { withCredentials: true }
      )
      .catch((err) => {
        throw new Error(err);
      });

    console.log(data.data.error, "datadata");
    if (!data?.data?.error) {
      console.log(data, "Product Data saved");
      navigate("/");
    } else {
      alert("Product is not valid");
    }
  };

  const getProductById = async () => {
    // This code is for JWT
    // const productData = await axios.get(
    //   `http://localhost:3001/getProductById/${id}`,
    //   { headers: { Authorization: `bearer ${JSON.parse(token)}` } }
    // );

    // This code is for Session and Cookies authentication
    const productData = await axios.get(
      `http://localhost:3001/getProductById/${id}`,
      { withCredentials: true }
    );

    const { name, brand, price, category } = productData?.data?.data;

    dispatch({ type: "updateAll", payload: { name, brand, price, category } });
  };

  useEffect(() => {
    getProductById();
  }, []);

  return (
    <div>
      <div className="container">
        <div className={`${style["form-container"]}`}>
          <div className={style["shadow"]}>
            <div>
              <h1 className={style["heading"]}>Update Product</h1>
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
                name="brand"
                value={state.brand}
                onChange={(event) =>
                  dispatch({
                    type: "brand",
                    payload: { brand: event.target.value },
                  })
                }
                placeholder="Enter Brand"
                className={style["input"]}
                type="text"
                required
              />
              <input
                name="price"
                value={state.price}
                onChange={(event) =>
                  dispatch({
                    type: "price",
                    payload: { price: event.target.value },
                  })
                }
                placeholder="Enter Price"
                className={style["input"]}
                type="number"
                required
              />
              <input
                name="category"
                value={state.category}
                onChange={(event) =>
                  dispatch({
                    type: "category",
                    payload: { category: event.target.value },
                  })
                }
                placeholder="Enter Category"
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

export default Update;
