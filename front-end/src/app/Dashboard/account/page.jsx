"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
    id: '', 
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    function: '',
    photo: '/noavatar.png'
  });
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser({
        id: parsedUser.id || '', 
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
      setPhotoFile(file);
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

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      setPhotoFile(file);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/usersupdate/${user.id}/update-fields`, user);
      
      if (photoFile) {
        const formData = new FormData();
        formData.append('photo', photoFile);

        await axios.post(`http://localhost:8000/api/usersupdate/${user.id}/update-photo`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      
      const updatedUser = {
        ...user,
        photo: photoFile ? URL.createObjectURL(photoFile) : user.photo 
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
  
      alert('User information updated successfully!');
    } catch (error) {
      console.error('Failed to update user information:', error);
      alert('Failed to update information.');
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 max-w-4xl mx-auto"
    >
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-2xl p-6 transition-transform transform hover:scale-105">
        <CardHeader
          subheader="Edit your information below"
          title="Account Details"
          subheaderTypographyProps={{ className: "text-gray-200" }}
          titleTypographyProps={{ className: "text-white" }}
        />
        <Divider />
        <CardContent className="bg-gradient-to-r from-blue-600 to-purple-700">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={4}>
              <div 
                className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-md bg-gray-800"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="relative rounded-full overflow-hidden w-32 h-32 border-4 border-gray-300 shadow-2xl transition-transform transform hover:scale-110">
                  <Image
                    src={user.photo}
                    alt="User Avatar"
                    width={128}
                    height={128}
                    layout="responsive"
                    className="rounded-full object-cover"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="mt-3"
                  onChange={handleFileChange}
                  id="fileInput"
                  hidden
                />
                <label htmlFor="fileInput" className="cursor-pointer text-blue-300 hover:underline">
                  <Tooltip title="Choose or drag a new profile picture" arrow>
                    <span>Change Photo</span>
                  </Tooltip>
                </label>
              </div>
            </Grid>
            <Grid item xs={8}>
              <FormControl fullWidth required>
                <InputLabel className="text-gray-200">Full Name</InputLabel>
                <OutlinedInput
                  label="Full Name"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  className="bg-gray-800 text-gray-200 rounded-md border-2 border-gray-700 focus:border-blue-500"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel className="text-gray-200">Email address</InputLabel>
                <OutlinedInput
                  label="Email address"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className="bg-gray-800 text-gray-200 rounded-md border-2 border-gray-700 focus:border-blue-500"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel className="text-gray-200">Phone number</InputLabel>
                <OutlinedInput
                  label="Phone number"
                  name="phone"
                  type="tel"
                  value={user.phone}
                  onChange={handleInputChange}
                  className="bg-gray-800 text-gray-200 rounded-md border-2 border-gray-700 focus:border-blue-500"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel className="text-gray-200">Password</InputLabel>
                <OutlinedInput
                  label="Password"
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleInputChange}
                  className="bg-gray-800 text-gray-200 rounded-md border-2 border-gray-700 focus:border-blue-500"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel className="text-gray-200">Address</InputLabel>
                <OutlinedInput
                  label="Address"
                  name="address"
                  value={user.address}
                  onChange={handleInputChange}
                  className="bg-gray-800 text-gray-200 rounded-md border-2 border-gray-700 focus:border-blue-500"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel className="text-gray-200">Function</InputLabel>
                <Select
                  label="Function"
                  name="function"
                  value={user.function}
                  onChange={handleInputChange}
                  className="bg-gray-800 text-gray-200 rounded-md border-2 border-gray-700 focus:border-blue-500"
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
        <CardActions className="justify-center bg-gradient-to-r from-blue-600 to-purple-700" sx={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="shadow-lg transition-transform transform hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Details
          </Button>
        </CardActions>
      </Card>
    </motion.form>
  );
};

export default AccountDetailsForm;
