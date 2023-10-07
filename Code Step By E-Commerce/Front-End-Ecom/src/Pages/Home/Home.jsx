import axios from "axios";
import React, { useEffect, useState } from "react";
import * as style from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const [productsData, setProductsData] = useState([]);
  const navigate = useNavigate();

  const searchValue = useSelector((store) => store?.searchProduct.search);

  const fetchProductData = async () => {
    let products;
    let token = localStorage.getItem("token");
    if (token) {
      console.log(token, "askjflksadjflkasjdflkasjdflkjsa");
      /* JWT Authentication */

      // if (!searchValue) {
      //   token = `bearer ${JSON.parse(token)}`;
      //   products = await axios.get("http://localhost:3001/getData", {
      //     withCredentials: true,
      //     headers: { Authorization: token },
      //   });
      // } else {
      //   token = `bearer ${JSON.parse(token)}`;
      //   products = await axios.get(
      //     `http://localhost:3001/search/${searchValue}`,
      //     {
      //       withCredentials: true,
      //       headers: { Authorization: token },
      //     }
      //   );
      // }

      /* Session Authentication */

      if (!searchValue) {
        products = await axios.get("http://localhost:3001/getData", {
          withCredentials: true,
        });
        console.log(products, "kasdjflksajdflksajdlfkjas", searchValue);
        if (!products?.data?.error) {
          setProductsData(products?.data?.data);
        } else {
          localStorage.removeItem("userData");
          navigate("/login");
        }
      } else {
        products = await axios.get(
          `http://localhost:3001/search/${searchValue}`,
          {
            withCredentials: true,
          }
        );
        if (!products?.data?.error) {
          setProductsData(products?.data?.data);
        } else {
          navigate("/login");
        }
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [searchValue]);

  const handleDelete = async (_id) => {
    await axios.delete(`http://localhost:3001/${_id}`, {
      withCredentials: true,
    });
    fetchProductData();
  };

  return (
    <div>
      <div className={`${style.center} container`}>
        <div>
          <div>
            <h1 className={style.heading}>User Products</h1>
          </div>
          {productsData && productsData.length > 0 ? (
            <table className={style.table}>
              <thead>
                <tr className={style.row}>
                  <th className={style["row-head"]}>Name</th>
                  <th className={style["row-head"]}>Brand</th>
                  <th className={style["row-head"]}>Price</th>
                  <th className={style["row-head"]}>Category</th>
                  <th className={style["row-head"]}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productsData.map((product, index) => {
                  return (
                    <tr className={style.row} key={product._id}>
                      <td className={style["row-data"]}>{product?.name}</td>
                      <td className={style["row-data"]}>{product?.brand}</td>
                      <td className={style["row-data"]}>{product?.price}</td>
                      <td className={style["row-data"]}>{product?.category}</td>
                      <td className={style["row-data-action"]}>
                        <div className={style["btn-containery"]}>
                          <Link
                            to={`/update/${product._id}`}
                            className={style["action-btn"]}
                          >
                            {" "}
                            Update{" "}
                          </Link>
                          <Link
                            onClick={() => handleDelete(product?._id)}
                            className={style["action-btn"]}
                          >
                            {" "}
                            Delete{" "}
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              )
            </table>
          ) : (
            <h1 className="center">No Product Found</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
