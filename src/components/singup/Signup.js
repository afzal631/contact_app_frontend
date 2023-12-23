import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { user_context } from "../../App";
// import { useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
// import { Navigate } from "react-router-dom";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="text-black  rounded-3xl m-3"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
// const glass = {
//   background: "rgba( 255, 255, 255, 0.35 )",
//   boxShadow: " 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
//   backdropFilter: "blur( 3.5px )",
//   webkitBackdropFilter: "blur( 3.5px )",
//   borderRadius: "10px",
//   border: "1px solid rgba( 255, 255, 255, 0.18 )",
// };

export default function Signup() {
  const { setUserData, userData } = useContext(user_context);
  const [value, setValue] = React.useState(0);
  const [showPassword, setShowpassword] = React.useState(false);
  const [showLoginPassword, setLoginShowpassword] = React.useState(false);
  const [error, setError] = useState("");
  const [loginerror, setLoginError] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setError("");
    setLoginError("");
  };
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setShowpassword(!showPassword);
  };
  const handleLoginPasswordToggle = () => {
    setLoginShowpassword(!showLoginPassword);
  };
  const handlelogin = async (e) => {
    e.preventDefault();
    // Access form data using FormData or state variables
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) return setLoginError("fields required");
    try {
      const data = JSON.stringify({
        email,
        password,
      });

      const response = await axios.post(
        "https://merncontactbackend.onrender.com/user/login",
        data, // Directly pass the data here
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "User logged in successfully") {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.Token);
        setUserData(response.data);
        navigate("/dashboard");
      } else {
        setLoginError(response.data.message);
      }
    } catch (e) {
      console.log("Error", e);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    // Access form data using FormData or state variables
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password || !username) return setError("fields required");
    try {
      const data = JSON.stringify({
        username,
        email,
        password,
      });
      const response = await axios.post(
        "https://merncontactbackend.onrender.com/user/registration",
        data, // Directly pass the data here
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.message === "Registered successfully") {
        toast.success(response.data.message);
        setValue(1);
      } else {
        setError(response.data.message);
      }
    } catch (e) {
      console.log("Error ", e);
    }
  };
  console.log(userData)
  return (
    <div
      sx={{ width: "24%" }}
      className="bg-white rounded-xl"
      // style={{ boxShadow: "6px 7px 2rem #6666ff" }}
    >
      <Box
        className="bg-gray-600 text-white rounded-3xl p-1 m-3"
        sx={{ borderBottom: 1, borderColor: "" }}
      >
        <Tabs
          centered
          value={value}
          textColor="inherit"
          onChange={handleChange}
          aria-label="basic tabs "
          //   className="text-white font-bold"
        >
          <Tab label="Sign up" {...a11yProps(0)} />
          <Tab label="Login" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <form onSubmit={handleSignup} className=" grid gap-4">
          <TextField
            //   className="bg-white"
            onFocus={() => setError("")}
            type="text"
            name="username"
            fullWidth
            label="Username"
            variant="outlined"
          />
          <TextField
            onFocus={() => setError("")}
            fullWidth
            type="email"
            label="Email"
            variant="outlined"
            name="email"
          />
          <TextField
            onFocus={() => setError("")}
            fullWidth
            type={showPassword ? "text" : "password"}
            name="password"
            label="Password"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handlePasswordToggle} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error !== "" ? <p className="text-sm text-red-500">{error}</p> : ""}
          <button
            type="submit"
            className="bg-blue-300 border-2 border-blue-600 rounded-3xl p-3"
          >
            Sign up
          </button>
        </form>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <form onSubmit={handlelogin} className="  grid gap-4">
          <TextField
            onFocus={() => setLoginError("")}
            fullWidth
            name="email"
            type="email"
            label="Email"
            variant="outlined"
          />
          <TextField
            onFocus={() => setLoginError("")}
            fullWidth
            type={showLoginPassword ? "text" : "password"}
            name="password"
            label="Password"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleLoginPasswordToggle} edge="end">
                    {showLoginPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {loginerror !== "" ? (
            <p className="text-sm text-red-500">{loginerror}</p>
          ) : (
            ""
          )}
          <button
            className="bg-blue-300 border-2 border-blue-600 rounded-3xl p-3"
            type="submit"
          >
            Login
          </button>
        </form>
      </CustomTabPanel>
    </div>
  );
}
