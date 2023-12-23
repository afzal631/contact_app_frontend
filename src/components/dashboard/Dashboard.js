import { Avatar, Box, Divider, InputBase, Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
// import Card from "../../assets/public/AddContact.svg";
import profile from "../../assets/public/Photo.svg";
// import share from "../../assets/public/share.svg";
import trash from "../../assets/public/trash.svg";
// import edit from "../../assets/public/edit.svg";
import "./styles.css";
import Header from "../header/Header";
import Addnew from "./Addnew";
import { motion } from "framer-motion";
import { user_context } from "../../App";
import axios from "axios";

export default function Dashboard() {
  const { logout, user } = useContext(user_context);
  const token = localStorage.getItem("token") || "";
  const [username, setUsername] = useState("");
  const [deleted,setdeleted]=useState("");
  const [AllContacts, setAllContacts] = useState([]);
  const [OpenContacts, setOpenContacts] = useState("");
  const [search, setSearch] = useState("");

  const get_all_contacts = async () => {
    try {
      const response = await axios.get(
        "https://merncontactbackend.onrender.com/api/contacts/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllContacts(response?.data);
    } catch (e) {
      console.log("Error", e);
    }
  };
  useEffect(() => {
    get_all_contacts();
  }, [AllContacts,deleted]);
  useEffect(() => {
    // get_all_contacts();
    if (!user || user === "") {
      logout();
    }
    setUsername(user ? user?.data[0]?.username : "");
  }, [username]);

  let filtered = AllContacts?.filter((searched_contact) =>
    searched_contact.name.includes(search)
  );

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://merncontactbackend.onrender.com/api/contacts/${OpenContacts._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data[0]);
      if (response.data.message === "Contact deleted successfully.") {
        AllContacts.filter((deleted) => deleted._id === response.data.data[0]);
        get_all_contacts();
        setdeleted(prev=>...prev+1)
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <>
      <div className="w-screen flex justify-center items-center bg-[#2C2A2A] text-white h-screen">
        <Header username={username} />
        <motion.div
          initial={{ scale: "60%" }}
          animate={{ scale: "100%" }}
          className="bg-[#4a4aba] w-[80%] h-[76%]  mt-12 justify-between flex items-center rounded-xl  "
        >
          <Box
            className="bg-[#4a4aba]  p-2 w-full h-full mx-auto rounded-xl justify-between flex items-center border border-white border-opacity-60 "
            style={{ boxShadow: "0rem 0rem 1rem #6666ff" }}
          >
            <div className="grid grid-cols-12 gap-2 w-full h-full ">
              {/* left */}
              <div className="col-span-4 overflow-hidden h-full bg-black text-white p-3 rounded-xl ">
                <div className="flex items- gap-3">
                  <Paper
                    component="form"
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      width: 350,
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search Contacts"
                      inputProps={{ "aria-label": "search contacts" }}
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                    <IconButton
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                  {/*  */}
                  <Addnew token={token} setAllContacts={setAllContacts} />
                </div>
                <Divider
                  className="bg-gray-100 text-gray-100 w-[82%] "
                  style={{ marginTop: "0.5rem" }}
                  orientation="horizontal"
                />
                <div className="flex flex-col items-start justify-start h-[87%]  gap-2">
                  <p className="font-bold text-sm my-2">All Contacts</p>
                  <div className=" grid gap-2 w-full scroll-container pb-[0.2rem] pr-2">
                    {/* map function  */}
                    {filtered.length > 0
                      ? filtered &&
                        filtered.map((contacts, index) => {
                          return (
                            <div
                              key={index}
                              onClick={() => {
                                setOpenContacts(contacts);
                              }}
                              className="flex w-full bg-[#4e4ec3] rounded-lg py-2 px-5 items-center gap-3 cursor-pointer"
                            >
                              <Avatar></Avatar>
                              <div className="flex flex-col text-sm justify-start items-start">
                                <div className="text-md font-semibold">
                                  {contacts?.name}
                                </div>
                                <div>{contacts?.phone}</div>
                              </div>
                            </div>
                          );
                        })
                      : AllContacts &&
                        AllContacts.map((contacts, index) => {
                          return (
                            <div
                              key={index}
                              onClick={() => {
                                setOpenContacts(contacts);
                              }}
                              className="flex w-full cursor-pointer bg-[#4e4ec3] rounded-lg py-2 px-5 items-center gap-3"
                            >
                              <Avatar></Avatar>
                              <div className="flex flex-col text-sm justify-start items-start">
                                <div className="text-md font-semibold">
                                  {contacts?.name}
                                </div>
                                <div>{contacts?.phone}</div>
                              </div>
                            </div>
                          );
                        })}
                  </div>
                </div>
              </div>
              {/* right */}
              {OpenContacts ? (
                <motion.div
                  initial={{ scale: "60%" }}
                  animate={{ scale: "100%" }}
                  className="col-span-8 relative h-full bg-[#FFFFFF] rounded-xl text-black overflow-x-hidden overflow-y-scroll"
                >
                  {/* header */}
                  <div className="h-[20%] bg-gray-300 rounded-tl-xl rounded-tr-xl"></div>
                  <div className="flex">
                    {/* image profile */}
                    <div className="w-[240px]">
                      <img
                        className="absolute top-[4%] w-[12rem] left-[3%]"
                        src={profile}
                        alt="profile"
                      />
                    </div>
                    {/* name and relation */}
                    <div className="flex flex-col justify-start items-start pb-[2rem]">
                      <p className="text-4xl font-bold">
                        {OpenContacts
                          ? OpenContacts.name.toUpperCase()
                          : "loading..."}
                      </p>
                      <p className="text-xl flex justify-start text-blue-400 font-bold">
                        {OpenContacts ? OpenContacts.group : "loading..."}
                      </p>
                    </div>
                    {/* right buttons */}
                    <div className="grid gap-2 absolute right-[3%] pt-[10px] ">
                      {/* <div
                        // onClick={handleAddnew}
                        className=" bg-[#6666ff] hover:bg-red-400 cursor-pointer rounded-2xl text-white p-0 m-0 w-12 h-11 flex justify-center items-center"
                      >
                        <img src={edit} alt="edit" className="text-white " />
                      </div>
                      <div
                        // onClick={handleAddnew}
                        className=" bg-[#6666ff] hover:bg-red-400 cursor-pointer rounded-2xl text-white p-0 m-0 w-12 h-11 flex justify-center items-center"
                      >
                        <img src={share} alt="share" className="text-white " />
                      </div> */}
                      <div
                        onClick={handleDelete}
                        className=" bg-[#6666ff] cursor-pointer rounded-2xl p-0 m-0 w-12 h-11 flex justify-center items-center hover:bg-red-400 "
                      >
                        <img src={trash} alt="trash" className="text-white " />
                      </div>
                    </div>
                  </div>
                  {/* information */}
                  <div className="w-full flex items-start mt-16 ml-10 justify-start text-start gap-7">
                    <div className="grid gap-5">
                      <p className="text-xl font-bold text-[#7474ff]">Name</p>
                      <p className="text-xl font-bold text-[#7474ff]">Email</p>
                      <p className="text-xl font-bold text-[#7474ff]">Title</p>
                      <p className="text-xl font-bold text-[#7474ff]">Phone</p>
                    </div>
                    <Divider
                      className="bg-black text-black h-[9rem] "
                      style={{ marginTop: "0", height: "12rem" }}
                      orientation="vertical"
                    />
                    <div className="grid gap-5">
                      <p className="text-lg font-semibold ">
                        {OpenContacts
                          ? OpenContacts.name === ""
                            ? "_NIL_"
                            : OpenContacts.name
                          : "loading..."}
                      </p>
                      <p className="text-lg font-semibold ">
                        {OpenContacts
                          ? OpenContacts.email === ""
                            ? "_NIL_"
                            : OpenContacts.email
                          : "loading..."}
                      </p>
                      <p className="text-lg font-semibold ">
                        {OpenContacts
                          ? OpenContacts.title === ""
                            ? "_NIL_"
                            : OpenContacts.title
                          : "loading..."}
                      </p>
                      <p className="text-lg font-semibold ">
                        {OpenContacts
                          ? OpenContacts.phone === ""
                            ? "_NIL_"
                            : OpenContacts.phone
                          : "loading..."}
                      </p>
                    </div>
                  </div>
                  <div className="bottom-0 flex justify-center w-full rounded-br-xl rounded-bl-xl bg-white p-1 text-xs text-gray-500">
                    Made with 🧡 by Mohammed Afzal
                  </div>
                </motion.div>
              ) : (
                <div className="flex col-span-8 rounded-xl justify-center items-center">
                  Please select a contact.
                </div>
              )}
            </div>
          </Box>
        </motion.div>
      </div>
    </>
  );
}
