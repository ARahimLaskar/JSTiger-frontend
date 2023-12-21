import React, { useState, useEffect } from "react";
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
  AbsoluteCenter,
  Box,
  Divider,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { SignUp } from "./SignUp";
import { loginUser } from "../Redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";

// import { successComp, failComp } from "./alertMsg";

export const Login = ({ isOpen, onClose }) => {
  const [show, setShow] = React.useState(false);
  const [redirectSignup, setRedicrectSignup] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const {
    isOpen: isSignupRedirectOpen,
    onOpen: onSignupRedirectOpen,
    onClose: onSignupRedirectClose,
  } = useDisclosure();

  const dispatch = useDispatch();
  const { user, status: loginStatus } = useSelector((state) => state);
  const toast = useToast();
  const navigate = useNavigate();
  const [previousToastId, setPreviousToastId] = useState(null);

  const handleShowPassword = () => setShow(!show);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (inputValues.email.trim() === "" || inputValues.password.trim() === "") {
      setError(true);
    } else {
      dispatch(loginUser(inputValues));
      setError(false);
      navigate("/vendor");
      onClose();
    }
  };

  useEffect(() => {
    console.log("toast user.status", user);
    console.log("Login toast", user);

    if (previousToastId) {
      toast.close(previousToastId);
    }

    let newToastId = null;

    if (loginStatus === "loading") {
      newToastId = toast({
        title: "Please wait login!",
        status: "info",
        isClosable: true,
      });
    } else if (loginStatus === "success") {
      if (user.message === "Login successful") {
        newToastId = toast({
          title: "Successfully Logged In",
          status: "success",
          isClosable: true,
        });
        // Redirect logic should be handled outside the toast creation
        navigate("/vendor");
      } else if (user.message === "Request failed with status code 400") {
        newToastId = toast({
          title: "Please provide all credentials",
          status: "error",
          isClosable: true,
        });
      } else if (user.message === "Request failed with status code 401") {
        newToastId = toast({
          title: "Invalid credentials",
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
  }, [loginStatus, user]);

  const handleRedirectSignup = () => {
    setRedicrectSignup(true);
    onClose();
    onSignupRedirectOpen();
  };
  const handleGoogleAuth = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };

  return (
    // onClose={onClose}
    <>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <Center>
            <ModalHeader>Login</ModalHeader>
          </Center>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <FormControl isRequired>
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
              Login
            </Button>
            <Center>
              <Text fontSize="xs">
                Don't have an account?{" "}
                <span onClick={handleRedirectSignup} style={{ color: "blue" }}>
                  Signup
                </span>
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
          </ModalFooter>
        </ModalContent>
      </Modal>
      {redirectSignup && (
        <SignUp isOpen={isSignupRedirectOpen} onClose={onSignupRedirectClose} />
      )}
    </>
  );
};
