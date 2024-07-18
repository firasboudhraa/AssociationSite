import  React from "react";
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

const AccountDetailsForm = () => {
  return (
    <form>
      <Card className="bg-[var(--bgSoft)] rounded-lg shadow-md">
        <CardHeader
          subheader="The information can be edited"
          title=""
          subheaderTypographyProps={{ className: "text-white" }}
          titleTypographyProps={{ className: "text-white" }}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={4}>
              <div className="flex justify-center">
                <div className="relative rounded-full overflow-hidden w-24 h-24">
                  <Image
                    src="/noavatar.png"
                    alt="User Avatar"
                    width={100}
                    height={100}
                    layout="responsive"
                    className="rounded-full"
                  />
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                className="mt-2"
              />
            </Grid>
            <Grid item xs={8}>
              <FormControl fullWidth required>
                <InputLabel className="text-white">Full Name</InputLabel>
                <OutlinedInput
                  label="Full Name"
                  name="name"
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
        <CardActions  className="justify-center" sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained">Save details</Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default AccountDetailsForm;
