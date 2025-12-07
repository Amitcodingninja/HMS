// import { Button, PasswordInput, TextInput } from "@mantine/core";
import { IconHeartbeat } from "@tabler/icons-react";
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../service/UserService";
import {
  errorNotification,
  successNotification,
} from "../Utility/NotificationUtil";
import { useDispatch } from "react-redux";
import { setJwt } from "../Slices/JwtSlice";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../Slices/UserSlice";
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => {
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        return null;
      },
    },
  });
  const handleSubmit = (values: typeof form.values) => {
    setLoading(true);
    loginUser(values)
      .then((_data) => {
        // console.log(jwtDecode(_data));
        successNotification("Login successful");
        dispatch(setJwt(_data));
        dispatch(setUser(jwtDecode(_data)));
        navigate("/");
      })
      .catch((error) => {
        errorNotification(error.response?.data?.message || "Login failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div
      style={{
        backgroundImage: `url("/bg.jpg")`,
      }}
      className="h-screen w-full bg-cover bg-center flex flex-col justify-center items-center"
    >
      <div className=" py-3 text-pink-500 flex gap-1 items-center">
        <IconHeartbeat size={45} stroke={2.5} />
        <span className="font-heading font-semibold text-4xl">Pulse</span>
      </div>
      <div className="w-[450px] backdrop-blur-md bg-white/30 rounded-lg p-10 py-8 shadow-lg flex flex-col gap-5 rounded-lg">
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
          className="flex flex-col gap-5 
        [&mantine_input]:placeholder:neutral-100
        border border-white/30 p-6 rounded-lg
      
        "
        >
          <div className="self-center font-medium text-white text-xl">
            Login
          </div>
          <TextInput
            variant="unstyled"
            size="md"
            radius="md"
            placeholder="Email"
            className="text-white placeholder-white"
            {...form.getInputProps("email")}
          />

          <PasswordInput
            variant="unstyled"
            size="md"
            radius="md"
            placeholder="Password"
            classNames={{
              input: "text-white placeholder-white",
            }}
            {...form.getInputProps("password")}
          />

          <Button loading={loading} type="submit" color="pink" radius="md">
            Login
          </Button>
          <div className="text-neutral-100 text-sm self-center">
            Don't have an account?{" "}
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
