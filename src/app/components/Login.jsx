"use client";
import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { login } from "../Actions/login";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const init = {
  phone: "",
  password: "",
};

export default function Login() {
  const [user, setUser] = useState(init);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await login(user);
      if (data.ok) {
        Swal.fire({
          text: `${data.message}`,
          icon: "success",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            router.refresh();
          }
        });

        setUser(init);
        setIsLoading(false);
      } else {
        Swal.fire({
          text: `${data.error}`,
          icon: "error",
        });
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  return (
    <div className=" ">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your phone
            </Typography>
            <Input
              required
              disabled={isLoading}
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              required
              disabled={isLoading}
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="mt-6" fullWidth>
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}
