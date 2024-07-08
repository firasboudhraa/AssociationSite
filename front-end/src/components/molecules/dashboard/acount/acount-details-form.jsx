"use client";

import * as React from "react";
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

export function AccountDetailsForm() {
  return (
    <form>
      <Card className="bg-gray-200 rounded-lg shadow-md">
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Full Name</InputLabel>
                <OutlinedInput
                  label="Full Name"
                  name="name"
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput
                  label="Email address"
                  name="email"
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Phone number</InputLabel>
                <OutlinedInput label="Phone number" name="phone" type="tel" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  label="Password"
                  name="password"
                  type="password"
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Address</InputLabel>
                <OutlinedInput label="Address" name="address"  />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Function</InputLabel>
                <OutlinedInput label="Function" name="function"  />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained">Save details</Button>
        </CardActions>
      </Card>
    </form>
  );
}
