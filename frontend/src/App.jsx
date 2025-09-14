import React from "react";
// import Login from "./components/Login";
import AuthProvider from "./context/authContext";
import Register from "./components/Register";

const App = () => {
  return (
    <AuthProvider>
      <Register />
    </AuthProvider>

  );
};

export default App;
