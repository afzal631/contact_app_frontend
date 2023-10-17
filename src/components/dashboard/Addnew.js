import * as React from "react";
// import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import addNew from "../../assets/public/addNew.svg";

export default function Addnew() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            autoFocus
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
            id="company"
            label="Company Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Designation"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="relation"
            label="Relation"
            type="email"
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
            onClick={handleClose}
            className="bg-blue-300 w-full border-2 border-blue-600 rounded-3xl p-3"
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
