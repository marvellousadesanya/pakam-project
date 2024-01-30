import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-screen h-screen bg-[#C2C2C2] flex justify-center items-center text-[#222D33]">
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
            <form>
              <div className="w-full flex justify-center">
                <div className="grid grid-cols-2 gap-y-5 gap-x-7">
                  <div className="flex flex-col w-[420px] ">
                    <label className="font-semibold text-sm">First name</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter your first name"
                    />
                  </div>

                  <div className="flex flex-col w-[420px]">
                    <label className="font-semibold text-sm">Last name</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div className="flex flex-col w-[420px]">
                    <label className="font-semibold text-sm">Username</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter your username"
                    />
                  </div>
                  <div className="flex flex-col w-[420px]">
                    <label className="font-semibold text-sm">Password</label>

                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter your password"
                    />
                    <Image
                      src="/eye-icon.svg"
                      alt="eye icon"
                      height={24}
                      width={24}
                      className="absolute ml-[-10px]"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-center">
                <div>
                  <div className="w-[420px] bg-[#005700] opacity-50 hover:opacity-100 hover:cursor-pointer text-white rounded-[12px] py-[14px] flex justify-center items-center mt-12">
                    <button className="text-center">Log in</button>
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
    </main>
  );
}
