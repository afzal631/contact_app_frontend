import * as React from "react";
// import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import addNew from "../../assets/public/addNew.svg";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Addnew({ token, setAllContacts }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("username");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const title = formData.get("title");
    const group = formData.get("group");

    if (!name || !email || !phone) return console.error("fields required");
    try {
      const data = JSON.stringify({
        name,
        email,
        phone,
        title,
        group,
      });

      const response = await axios.post(
        "https://merncontactbackend.onrender.com/api/contacts/",
        data, // Directly pass the data here
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "Contact created successfully.") {
        toast.success(response.data.message);
        setOpen(false);
        setAllContacts((prev) => [...prev, response.data.data[0]]);
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <div className="flex">
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <div
        onClick={handleClickOpen}
        className=" bg-[#6666ff] duration-0 cursor-pointer rounded-2xl text-white p-0 m-0 w-16 flex justify-center items-center"
      >
        <img src={addNew} alt="add" className="text-white " />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          style={{
            background: "black",
            color: "#6666ff",
            display: "flex",
            justifyContent: "center",
            border: "4px solid white",
            // boxShadow: " 0 0rem 1rem black",
          }}
        >
          Add new contact
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
            <TextField
              required
              autoFocus
              name="username"
              margin="dense"
              id="name"
              label="username"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              required
              autoFocus
              name="email"
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
            />
            <TextField
              required
              autoFocus
              name="phone"
              margin="dense"
              id="phone"
              label="phone Number"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              name="title"
              id="title"
              label="title"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              name="group"
              id="relation"
              label="group"
              type="text"
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <button
              onClick={handleClose}
              className="bg-red-300 w-full border-2 border-red-600 rounded-3xl p-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-300 w-full border-2 border-blue-600 rounded-3xl p-3"
            >
              Save
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
