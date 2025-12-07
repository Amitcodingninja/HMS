// import { Button, PasswordInput, TextInput } from "@mantine/core";
import { IconHeartbeat } from "@tabler/icons-react";
import React, { use, useState } from "react";
import {
  Button,
  Checkbox,
  Group,
  PasswordInput,
  SegmentedControl,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../service/UserService";
import {
  errorNotification,
  successNotification,
} from "../Utility/NotificationUtil";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      name: "",
      role: "PATIENT",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      name: (value) => (value ? null : "Name is required"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => {
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        return null;
      },
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    setLoading(true);
    registerUser(values)
      .then((data) => {
        console.log("Registration successful:", data);
        successNotification("Registration successful");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        errorNotification(
          error.response?.data?.message || "Registration failed"
        );
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
            Register
          </div>
          <SegmentedControl
            color="pink"
            bg="none"
            {...form.getInputProps("type")}
            fullWidth
            size="md"
            radius="md"
            className="[&_*]:text-white border border-white/30"
            data={[
              { label: "Patient", value: "PATIENT" },
              { label: "Doctor", value: "DOCTOR" },
              { label: "Admin", value: "ADMIN" },
            ]}
          />
          <TextInput
            variant="unstyled"
            size="md"
            radius="md"
            placeholder="Full Name"
            className="text-white placeholder-white"
            {...form.getInputProps("name")}
          />

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
          <PasswordInput
            variant="unstyled"
            size="md"
            radius="md"
            placeholder="Confirm Password"
            classNames={{
              input: "text-white placeholder-white",
            }}
            {...form.getInputProps("confirmPassword")}
          />
          <Button loading={loading} type="submit" color="pink" radius="md">
            Register
          </Button>
          <div className="text-neutral-100 text-sm self-center">
            Don't have an account?{" "}
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
