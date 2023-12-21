import React, { useEffect, useState } from "react";
import logo from "../assets/jst-logo-blue.webp";
import {
  Button,
  Popover,
  PopoverTrigger,
  Text,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  ButtonGroup,
  useDisclosure,
  Avatar,
  Center,
  Heading,
} from "@chakra-ui/react";
import { googleLogout } from "@react-oauth/google";
import { SignUp } from "./SignUp";
import { Login } from "./Login";
// import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export const NavBar = () => {
  const {
    isOpen: isSignupOpen,
    onOpen: onSignupOpen,
    onClose: onSignupClose,
  } = useDisclosure();

  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isUserOpen,
    onOpen: onUserOpen,
    onClose: onUserClose,
    onToggle: onUserToggle,
  } = useDisclosure();

  const { user, gUser } = useSelector((state) => state);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav>
      <div className="nav-container">
        <Link to="/">
          {" "}
          <img style={{ maxWidth: "100px" }} src={logo} />
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {token ? (
            <>
              <Avatar></Avatar>
              <Button onClick={handleLogout} size="sm" colorScheme="green">
                Logout
              </Button>
            </>
          ) : (
            <Button
              color="#3182ce"
              size="sm"
              variant="outline"
              onClick={onSignupOpen}
            >
              Signup
            </Button>
          )}
        </div>
      </div>

      <SignUp isOpen={isSignupOpen} onClose={onSignupClose} />
      <Login isOpen={isLoginOpen} onClose={onLoginClose} />
    </nav>
  );
};
