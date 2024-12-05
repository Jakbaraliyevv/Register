import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
  firstName: Yup.string().required("Firstname is ruquired"),
  lastName: Yup.string().required("Lastname is ruquired"),
  email: Yup.string()
    .required("Email is ruquired")
    .email("Invalid email address"),
  password: Yup.string()
    .required("password is required")
    .min(4, "Password must be at least 8 characters ")
    .max(8, "Password must be at least 8 characters"),
});

function RegisterComponents() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
      setValue(savedData);
    }
  }, []);

  const changeValue = (e) => {
    const { name, value } = e.target;
    setValue((allDataValue) => ({
      ...allDataValue,
      [name]: value,
    }));
  };

  const getValue = (e) => {
    // const newGetDatal = JSON.parse(localStorage.getItem("formData")) || [];
    // newGetDatal.push(value);
    localStorage.setItem("formData", JSON.stringify(value));
    if (value) {
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="w-[90%] m-auto pt-10 items-center justify-center flex">
        <form
          onSubmit={handleSubmit(getValue)}
          className="w-[40%] flex flex-col items-center gap-8"
        >
          <h1 className="text-[38px] text-[#121212]">Register</h1>

          <TextField
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            onChange={changeValue}
            name="firstName"
            className="w-[100%]"
            id="outlined-firstname"
            label="FirstName"
            variant="outlined"
            type="text"
            inputProps={{
              style: { fontSize: "12px" }, // Input balandligi va padding
            }}
            InputLabelProps={{
              style: { fontSize: "14px" },
            }}
          />
          <TextField
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            onChange={changeValue}
            name="lastName"
            className="w-[100%]"
            id="outlined-lastName"
            label="lastName"
            type="text"
            inputProps={{
              style: { fontSize: "12px" },
            }}
            InputLabelProps={{
              style: {
                fontSize: "14px",
              },
            }}
          />

          <TextField
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            onChange={changeValue}
            name="email"
            className="w-[100%]"
            id="outlined-email"
            label="email"
            type="email"
            inputProps={{
              style: {
                fontSize: "12px",
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: "14px",
              },
            }}
          />

          <TextField
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            onChange={changeValue}
            name="password"
            className="w-[100%]"
            id="outlined-password"
            label="password"
            type="password"
            inputProps={{
              style: {
                fontSize: "12px",
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: "14px",
              },
            }}
          />

          <Button
            type="submit"
            className="w-[100%] h-[40px] "
            variant="contained"
            sx={{ fontSize: "16px" }}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RegisterComponents;
