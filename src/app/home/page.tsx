import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-screen h-screen bg-[#C2C2C2] flex justify-center items-center">
      <div className="w-[940px] h-[497px] bg-white rounded-2xl flex justify-center ">
        <div className="w-full ">
          <div>
            <Image src="/pakam-logo.png" alt="logo" height={55} width={110} />
          </div>

          <div>
            <h2 className="text-black font-bold text-xl">Create Account</h2>
          </div>

          <div>
            <form>
              <div>
                <label>First name</label>
                <input type="text" />
              </div>
              <div>
                <label>Last name</label>
                <input type="text" />
              </div>
              <div>
                <label>First name</label>
                <input type="text" />
              </div>
              <div>
                <label>Username</label>
                <input type="text" />
              </div>
              <div>
                <label>Password</label>
                <input type="text" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
