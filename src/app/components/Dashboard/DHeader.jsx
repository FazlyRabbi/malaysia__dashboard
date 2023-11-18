"use client";
import React from "react";
import Link from "next/link";
import { CgMenuRightAlt, CgProfile } from "react-icons/cg";

function DHeader({ toggleOpen }) {
  return (
    <div
      className=" shadow-lg    text-black fixed top-0 lg:top-2 z-10  
      text-[10px] md:text-[1rem]
      right-[0]  py-[1rem] space-y-2  rounded-md font-bold 
     flex  flex-col lg:flex-row items-center xl:items-start justify-between
    
 w-[100%] lg:w-[98%] px-8 md:pr-[4rem] "
    >
      <div>
        <h1 className=" lg:pl-[13rem] text-[14px] lg:text-[1rem] xl:text-[1.5rem] uppercase ">
          Welcome{" "}
          <span className="hidden  lg:inline-block">Admin dashboard</span>
        </h1>
      </div>

      <div className=" flex justify-center  items-center space-x-8">
        <p className=" cursor-pointer">
          <Link href={`/`}>HomePage</Link>
        </p>
        <p className=" cursor-pointer" onClick={() => signOut()}>
          LogOut
        </p>
        <p>
          <CgProfile className="text-[1.5rem]" />
        </p>
        <CgMenuRightAlt
          onClick={() => toggleOpen()}
          className=" 
        
          lg:hidden
         animate-pulse
         cursor-pointer text-[1.5rem]"
        />
      </div>
    </div>
  );
}

export default DHeader;
