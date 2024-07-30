"use client"
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
import { motion } from "framer-motion";

const AccountDetailsForm = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    function: '',
    photo: '/noavatar.png'
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser({
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || '',
        password: parsedUser.password || '',
        address: parsedUser.address || '',
        function: parsedUser.function || '',
        photo: parsedUser.photo || '/noavatar.png'
      });
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({
          ...prevUser,
          photo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <motion.form onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="bg-[var(--bgSoft)] rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
        <CardHeader
          subheader="Edit your information below"
          title="Account Details"
          subheaderTypographyProps={{ className: "text-white" }}
          titleTypographyProps={{ className: "text-white" }}
        />
        <Divider />
        <CardContent className="bg-[var(--bgSoft)]">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={4}>
              <div className="flex justify-center">
                <div className="relative rounded-full overflow-hidden w-24 h-24 border-4 border-gray-300 shadow-lg">
                  <Image
                    src={user.photo}
                    alt="User Avatar"
                    width={100}
                    height={100}
                    layout="responsive"
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                className="mt-2"
                onChange={handleFileChange}
              />
              <Tooltip title="Choose a new profile picture" arrow>
                <span className="text-blue-500 cursor-pointer">Change Photo</span>
              </Tooltip>
            </Grid>
            <Grid item xs={8}>
              <FormControl fullWidth required>
                <InputLabel className="text-white">Full Name</InputLabel>
                <OutlinedInput
                  label="Full Name"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  className="bg-bg text-white p-4 rounded border border-bgSoft"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel className="text-white">Email address</InputLabel>
                <OutlinedInput
                  label="Email address"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className="bg-bg text-white p-4 rounded border border-bgSoft"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel className="text-white">Phone number</InputLabel>
                <OutlinedInput
                  label="Phone number"
                  name="phone"
                  type="tel"
                  value={user.phone}
                  onChange={handleInputChange}
                  className="bg-bg text-white p-4 rounded border border-bgSoft"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel className="text-white">Password</InputLabel>
                <OutlinedInput
                  label="Password"
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleInputChange}
                  className="bg-bg text-white p-4 rounded border border-bgSoft"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel className="text-white">Address</InputLabel>
                <OutlinedInput
                  label="Address"
                  name="address"
                  value={user.address}
                  onChange={handleInputChange}
                  className="bg-bg text-white p-4 rounded border border-bgSoft"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel className="text-white">Function</InputLabel>
                <Select
                  label="Function"
                  name="function"
                  value={user.function}
                  onChange={handleInputChange}
                  className="bg-bg text-white p-4 rounded border border-bgSoft"
                >
                  <MenuItem value="Designer">Designer</MenuItem>
                  <MenuItem value="Developer">Developer</MenuItem>
                  <MenuItem value="Devops">Devops</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions className="justify-center bg-[var(--bgSoft)]" sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" type="submit">Save Details</Button>
        </CardActions>
      </Card>
    </motion.form>
  );
};

export default AccountDetailsForm;
