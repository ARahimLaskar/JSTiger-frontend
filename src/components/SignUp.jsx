import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Center,
  Text,
  useToast,
  AbsoluteCenter,
  Box,
  Divider,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { getGoogleUser, signUpUser } from "../Redux/rootReducer";
import axios from "axios";
// import { GoogleButton } from "./GoogleButton";
// import { GButton } from "./GButton";
// import { successComp, failComp } from "./alertMsg";

export const SignUp = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [redirectLogin, setRedicrectLogin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status: signupStatus, user } = useSelector((state) => state);
  const toast = useToast();
  const [previousToastId, setPreviousToastId] = useState(null);

  const {
    isOpen: isLoginRedirectOpen,
    onOpen: onLoginRedirectOpen,
    onClose: onLoginRedirectClose,
  } = useDisclosure();

  const handleShowPassword = () => setShow(!show);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    console.log("SignupToast");
    e.preventDefault();
    if (
      inputValues.name.trim() === "" ||
      inputValues.email.trim() === "" ||
      inputValues.password.trim() === ""
    ) {
      setError(true);
    } else {
      dispatch(signUpUser(inputValues));
      setInputValues({
        name: "",
        email: "",
        password: "",
      });
      setError(false);
    }
  };
  useEffect(() => {
    console.log("SignupToast user.status", user);

    if (previousToastId) {
      toast.close(previousToastId);
    }

    let newToastId = null;

    if (signupStatus === "loading") {
      newToastId = toast({
        title: "Please wait! signup!",
        status: "info",
        isClosable: true,
      });
    } else if (signupStatus === "success") {
      if (user.message === "User registered successfully") {
        newToastId = toast({
          title: "Registered successfully",
          status: "success",
          isClosable: true,
        });
      } else if (user.message === "Request failed with status code 400") {
        newToastId = toast({
          title: "Please provide all credentials",
          status: "error",
          isClosable: true,
        });
      } else if (user.message === "Request failed with status code 409") {
        newToastId = toast({
          title: "User already exists",
          status: "error",
          isClosable: true,
        });
      }
    }

    setPreviousToastId(newToastId);

    return () => {
      if (newToastId) {
        toast.close(newToastId);
      }
    };
  }, [signupStatus, user]);

  const handleRedirectLogin = () => {
    setRedicrectLogin(true);
    onClose();
    onLoginRedirectOpen();
  };

  const handleGoogleAuth = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };

  return (
    <>
      {/* onClose={onClose} */}
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <Center>
            <ModalHeader>Register</ModalHeader>
          </Center>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel fontSize="sm">Name</FormLabel>
              <Input
                mb="3"
                size="sm"
                name="name"
                value={inputValues.name}
                placeholder="Name"
                onChange={handleInputChange}
              />

              <FormLabel fontSize="sm">Email</FormLabel>
              <Input
                size="sm"
                mb="3"
                name="email"
                placeholder="Email"
                value={inputValues.email}
                onChange={handleInputChange}
              />

              <FormLabel fontSize="sm">Password</FormLabel>
              <InputGroup size="sm">
                <Input
                  size="sm"
                  name="password"
                  value={inputValues.password}
                  onChange={handleInputChange}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                />
                <InputRightElement onClick={handleShowPassword} width="4.5rem">
                  {show ? (
                    <span
                      style={{ fontSize: "1.5em" }}
                      class="material-symbols-outlined"
                    >
                      visibility
                    </span>
                  ) : (
                    <span
                      style={{ fontSize: "1.5em" }}
                      class="material-symbols-outlined"
                    >
                      visibility_off
                    </span>
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {error ? (
              <Text mt="2" color="red.500" fontSize="xs">
                All Fields Required
              </Text>
            ) : (
              ""
            )}
            <Button
              mt="6"
              mb="2"
              w="100%"
              onClick={handleSubmit}
              colorScheme="blue"
            >
              Sign Up
            </Button>
            <Center>
              <Text fontSize="xs">
                Already have an account?{" "}
                <Link to="/login">
                  <span
                    onClick={handleRedirectLogin}
                    style={{ color: "blue", purser: "pointer" }}
                  >
                    {" "}
                    Login
                  </span>
                </Link>
              </Text>
            </Center>
          </ModalBody>
          <Box position="relative" p="4">
            <Divider />
            <AbsoluteCenter bg="white" px="4">
              Or
            </AbsoluteCenter>
          </Box>
          <ModalFooter mb="4">
            <Button
              width="100%"
              variant="outline"
              colorScheme="blue"
              leftIcon={<FcGoogle />}
              onClick={handleGoogleAuth}
            >
              Continue with Google
            </Button>
            {/* <GoogleButton /> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
      {redirectLogin && (
        <Login isOpen={isLoginRedirectOpen} onClose={onLoginRedirectClose} />
      )}
    </>
  );
};
