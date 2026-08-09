"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Fields are required");
      return;
    }

    try {
      const user = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log(user);
      router.push("/");
    } catch (error) {
      console.error("Login Error", error);
    }
  };

  return (
    <>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="passwordil"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">login</button>
        </form>
      </div>
      <div>
        <p>Don't have an Account ?</p>
        <a href="/register">Register</a>
      </div>
      <div>
        <button onClick={() => signIn("github")}>Login with GitHub</button>
        <button onClick={() => signIn("google")}>Login with Google</button>
      </div>
    </>
  );
};

export default LoginPage;
