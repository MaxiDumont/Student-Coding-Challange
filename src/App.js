import { TextField, Button } from "@material-ui/core";
import {
  Grid,
  Box,
  Paper,
  Avatar,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { useState } from "react";

//somes styles

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  textField: {
    width: "70%",
    marginBottom: theme.spacing(2),
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    width: "70%",
    marginTop: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

//main function

function RegisterForm() {
  const classes = useStyles();
  const [MessageSuccess, setMessageSuccess] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //snackbar functions

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  //submit function

  const onSubmit = (data) => {
    console.log(data);
    fetch("https://europe-west1-vocaire-main.cloudfunctions.net/student_test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setOpenSuccess(true);
        setMessageSuccess("Information sent successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        setOpenSuccess(true);
        setMessageSuccess("Information sent successfully");
      });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://img.freepik.com/vector-gratis/ilustracion-concepto-ortopedico_114360-8807.jpg?w=740&t=st=1683552129~exp=1683552729~hmac=a1e615812175b662c454aec42be269ce51fd285229785f1f16f670e4cb4a552e)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "secondary.main",
              width: 50,
              height: 50,
              margin: "auto",
            }}
          ></Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              ml: 28,
              mt: 4,
              mb: 4,
            }}
          >
            Vocaire Challenge
          </Typography>

          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="org"
              label="Organization"
              variant="outlined"
              className={classes.textField}
              {...register("org", { required: "Organization is required" })}
              error={!!errors.org}
              helperText={errors.org?.message}
            />

            <TextField
              id="name"
              label="Name"
              variant="outlined"
              className={classes.textField}
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              id="email"
              label="Email"
              variant="outlined"
              className={classes.textField}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              id="phone"
              label="Phone Number"
              variant="outlined"
              className={classes.textField}
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d+$/,
                  message: "Invalid phone number format",
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />

            <div className={classes.buttonGroup}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
                Send Information
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => reset()}
                className={classes.button}
              >
                Reset
              </Button>

              <Snackbar
                open={openSuccess}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  {MessageSuccess}
                </Alert>
              </Snackbar>
            </div>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default RegisterForm;
