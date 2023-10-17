import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="text-black border-2 border-blue-500 rounded-3xl m-3"
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

export default function Signup() {
  const [value, setValue] = React.useState(0);
  const [showPassword, setShowpassword] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePasswordToggle = () => {
    setShowpassword(!showPassword);
  };

  return (
    <Box
      sx={{ width: "32%" }}
      className="bg-white rounded-xl"
      style={{ boxShadow: "6px 7px 2rem #6666ff" }}
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
        <form onSubmit="" className="m-5  grid gap-4">
          <TextField
            //   className="bg-white"
            fullWidth
            label="Username"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
          />
          <TextField
            fullWidth
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
          <button className="bg-blue-300 border-2 border-blue-600 rounded-3xl p-3">
            Sign up
          </button>
        </form>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <form onSubmit="" className="m-5  grid gap-4">
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
          />
          <TextField
            fullWidth
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
          <button className="bg-blue-300 border-2 border-blue-600 rounded-3xl p-3">
            Login
          </button>
        </form>
      </CustomTabPanel>
    </Box>
  );
}
