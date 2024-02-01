"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/auth";
import { CircleLoader } from "react-spinners";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { register, isLoading } = useAuth();

  const validatePassword = (value: string) => {
    if (value.length < 8 || !/[A-Z]/.test(value)) {
      setPasswordError("Must be 8 characters long, Uppercase inclusive");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    let isFormValid = true;
    if (!validatePassword(password)) {
      isFormValid = false;
    }
    if (!firstName.trim()) {
      setFirstNameError("First name is required");
      isFormValid = false;
    }
    if (!lastName.trim()) {
      setLastNameError("Last name is required");
      isFormValid = false;
    }
    if (!username.trim()) {
      setUsernameError("Username is required");
      isFormValid = false;
    }

    if (isFormValid) {
      try {
        const response = await register(
          firstName,
          lastName,
          username,
          password
        );
        console.log(response);
        if (response === 409) {
          setUsernameError("Username is already taken");
        }
      } catch (error) {
        console.log(error);
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
                <div className="w-full flex justify-center items-center">
                  <Image
                    src="/pakam-logo.png"
                    alt="logo"
                    height={55}
                    width={110}
                  />
                </div>

                <div>
                  <h2 className=" font-bold text-2xl">Create Account</h2>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <div className="w-full flex justify-center">
                  <div className="grid grid-cols-2 gap-y-5 gap-x-7">
                    <div className="flex flex-col w-[420px] ">
                      <label className="font-semibold text-sm">
                        First name
                      </label>
                      <input
                        type="text"
                        className={`input-field ${
                          firstNameError ? "border-red-500" : ""
                        }`}
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                          setFirstNameError("");
                        }}
                      />
                      {firstNameError && (
                        <p className="text-red-500 text-xs mt-1">
                          {firstNameError}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col w-[420px]">
                      <label className="font-semibold text-sm">Last name</label>
                      <input
                        type="text"
                        className={`input-field ${
                          lastNameError ? "border-red-500" : ""
                        }`}
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                          setLastNameError("");
                        }}
                      />
                      {lastNameError && (
                        <p className="text-red-500 text-xs mt-1">
                          {lastNameError}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col w-[420px]">
                      <label className="font-semibold text-sm">Username</label>
                      <input
                        type="text"
                        className={`input-field ${
                          usernameError ? "border-red-500" : ""
                        }`}
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          setUsernameError("");
                        }}
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
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError("");
                          }}
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
                    <div className="w-full flex justify-center items-center mt-12">
                      <button
                        type="submit"
                        className="text-center bg-[#005700] text-white rounded-[12px] py-[14px] hover:cursor-pointer opacity-50 hover:opacity-100 w-[420px]">
                        {isLoading ? (
                          <div className="w-full flex justify-center items-center">
                            <CircleLoader size="20" />
                          </div>
                        ) : (
                          "Register"
                        )}
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
