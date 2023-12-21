import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGoogleUser } from "../Redux/rootReducer";
import axios from "axios";
import { Button, Heading } from "@chakra-ui/react";

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { gUser } = useSelector((state) => state);
  // useEffect(() => {
  //   dispatch(getGoogleUser());
  // }, []);
  const [user, setUser] = useState(null);

  return (
    <div style={{ lineHeight: "10" }}>
      <Heading>Welcome....... </Heading>
      <Heading>Explore Us..... </Heading>
      <Button
        colorScheme="blue"
        variant="outline"
        onClick={() => {
          navigate("/vendor");
        }}
      >
        Lets Start
      </Button>
    </div>
  );
};
