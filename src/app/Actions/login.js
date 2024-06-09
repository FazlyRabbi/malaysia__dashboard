"use server";

import { signIn, auth } from "../../../auth";

export const useSession = async () => {
  const session = await auth();
  return session;
};

export const login = async (user) => {
  try {
    await signIn("credentials", {
      redirect: false,
      phone: user.phone,
      password: user.password,
    });

    return {
      ok: true,
      message: "Login Success!",
    };
  } catch (err) {
    console.log(err);
    if (err) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid Username or Password!" };

        default:
          return { error: "Invalid Username or Password!" };
      }
    }

    throw err;
  }
};
