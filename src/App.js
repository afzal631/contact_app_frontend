import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Signup from "./components/singup/Signup";
import { createContext, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import logo from "./login.svg";

export const user_context = createContext();

function App() {
  const [userData, setUserData] = useState("");
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    setUserData("");
    window.location.reload();
  };

  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute setUser={setUser} user={user}>
          <Dashboard /> 
        </ProtectedRoute>
      ),
    },
    {
      path: "/",
      element: <Signup />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  return (
    <div>
      <div
        className=" flex justify-center items-center  text-white "
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: " cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <user_context.Provider
          value={{ setUserData, userData, logout, setUser, user }}
        >
          <RouterProvider router={router} />
        </user_context.Provider>
      </div>
    </div>
  );
}

export default App;
