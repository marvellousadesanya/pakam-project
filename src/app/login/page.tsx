"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/auth";

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    let isFormValid = true;
    if (!username.trim()) {
      setUsernameError("Username is required");
      isFormValid = false;
    } else {
      setUsernameError("");
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
      isFormValid = false;
    } else {
      setPasswordError("");
    }

    if (isFormValid) {
      try {
        const response = await login(username, password);
        if (response === 404) {
          setUsernameError("User does not exist");
        }
        if (response === 400) {
          setPasswordError("Password incorrect");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <main className="w-screen h-screen bg-[#C2C2C2] flex justify-center items-center text-[#222D33]">
      <div>
        <div className="w-[940px] h-[560px] bg-white rounded-2xl flex justify-center items-center">
          <div className="w-full space-y-12">
            <div className=" w-full flex justify-center items-center mt-3">
              <div className="space-y-4">
                <div className="w-full ">
                  <Image
                    src="/pakam-logo.png"
                    alt="logo"
                    height={55}
                    width={110}
                  />
                </div>

                <div>
                  <h2 className=" font-bold text-2xl">Login</h2>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <div className="w-full flex justify-center ">
                  <div className="space-y-5">
                    <div className="flex flex-col w-[420px] ">
                      <label className="font-semibold text-sm">Username</label>
                      <input
                        type="text"
                        className={`input-field ${
                          usernameError ? "border-red-500" : ""
                        }`}
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      {usernameError && (
                        <p className="text-red-500 text-xs mt-1">
                          {usernameError}
                        </p>
                      )}
                    </div>
                    <div className="relative flex flex-col w-[420px]">
                      <label className="font-semibold text-sm">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`input-field pr-10 w-[420px] ${
                            passwordError ? "border-red-500" : ""
                          }`}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && (
                          <p className="text-red-500 text-xs mt-1">
                            {passwordError}
                          </p>
                        )}
                        <Image
                          src="/eye-icon.svg"
                          alt="eye icon"
                          height={24}
                          width={24}
                          className="absolute top-0 right-0 mt-[15px] mr-[10px] cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-center">
                  <div>
                    <div className=" bg-[#005700] opacity-50 hover:opacity-100 hover:cursor-pointer text-white rounded-[12px] py-[14px] flex justify-center items-center mt-12">
                      <button type="submit" className="text-center w-[420px]">
                        Log in
                      </button>
                    </div>
                    <div className="pt-3 text-sm">
                      <p className="text-center">
                        Forgot password?{" "}
                        <span className="text-[#005700] font-semibold">
                          Retrieve now
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <p className="font-bold text-[#295011] text-center pt-5">
          Powered by Pakam Technology
        </p>
      </div>
    </main>
  );
}
