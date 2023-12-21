// import React from "react";
// import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import { Button, Center, useToast } from "@chakra-ui/react";

// import { useDispatch } from "react-redux";
// import { getGoogleUser } from "../Redux/rootReducer";
// import { useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// export const GButton = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const toast = useToast();
//   const onSuccessDecodeResponse = (res) => {
//     const decoded = jwtDecode(res.credential);
//     const userData = {
//       name: `${decoded.given_name} ${decoded.family_name}`,
//       email: decoded.email,
//       picture: decoded.picture,
//     };
//     dispatch(getGoogleUser(userData));
//     navigate("/");
//   };

//   return (
//     <GoogleLogin
//       onSuccess={(res) => {
//         onSuccessDecodeResponse(res);
//         toast({
//           title: "Successful",
//           description: "We've created your account for you.",
//           status: "success",
//           duration: 5000,
//           isClosable: true,
//         });
//       }}
//       onError={console.log("dfds")}
//     />
//   );
// };
