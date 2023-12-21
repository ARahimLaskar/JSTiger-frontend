import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGoogleUser } from "../Redux/rootReducer";
import axios from "axios";

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { gUser } = useSelector((state) => state);
  // useEffect(() => {
  //   dispatch(getGoogleUser());
  // }, []);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/login/success")
      .then((res) => {
        if (res.status === 200) {
          console.log("res.data", res.data);
          localStorage.setItem("userdata", res.data);
          return res.data;
        } else {
          throw new Error("authentication fail");
        }
      })
      .then((resObj) => {
        setUser(resObj.user);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <p>HomePage</p>
      <button
        onClick={() => {
          navigate("/vendor");
        }}
      >
        Lets Start
      </button>
    </div>
  );
};
