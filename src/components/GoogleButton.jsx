// import React from "react";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { GoogleLogin } from "@react-oauth/google";
// import { useToast } from "@chakra-ui/react";
// export const GoogleButton = () => {
//   const clientId = import.meta.env.VITE_CLIENT_ID;
//   const onLoginFail = () => {
//     toast({
//       title: "Login Failed.",
//       status: "error",
//       duration: 4000,
//       isClosable: true,
//     });
//   };
//   const loginSuccessful = (res) => {
//     console.log("googleRes", res);
//   };
//   return (
//     <>
//       <GoogleOAuthProvider clientId={clientId}>
//         <GoogleLogin
//           onSuccess={(res) => {
//             loginSuccessful(res);
//           }}
//           onError={onLoginFail}
//         />
//       </GoogleOAuthProvider>
//     </>
//   );
// };
