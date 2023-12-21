import { AllRoutes } from "./AllRoutes/AllRoutes";
import "./App.css";
// import { HomePage } from "./Pages/HomePage";
// import { AddVendor } from "./components/AddVendor";
// import { GButton } from "./components/GButton";
import { NavBar } from "./components/NavBar";
// import { VandorList } from "./components/VandorList";
// import { googleLogout } from "@react-oauth/google";
function App() {
  return (
    <>
      <NavBar />
      <AllRoutes />
    </>
  );
}

export default App;
