import React, { useEffect, useReducer } from "react";
import * as style from "./AddData.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddData() {
  const navigate = useNavigate();
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
    const data = await axios
      .post(
        "http://localhost:3001/addProduct",
        { ...state, userId },
        // {
        //   headers: { Authorization: `bearer ${JSON.parse(token)}` },
        // }
        { withCredentials: true }
      )
      .catch((err) => {
        throw Error(err);
      });
    console.log(data.data.error, "datadata");
    if (!data?.data?.error) {
      console.log(data, "Product Data saved");
      navigate("/");
    } else {
      alert("Product is not valid");
    }
  };

  return (
    <div>
      <div className="container">
        <div className={`${style["form-container"]}`}>
          <div className={style["shadow"]}>
            <div>
              <h1 className={style["heading"]}>Add Product</h1>
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

export default AddData;
