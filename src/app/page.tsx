"use client";

import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-screen h-screen bg-[#C2C2C2] flex justify-center items-center text-[#222D33]">
      <div className="flex flex-col">
        <h2>Go to register page</h2>
        <Link href="register">Go!</Link>
      </div>
    </main>
  );
}
