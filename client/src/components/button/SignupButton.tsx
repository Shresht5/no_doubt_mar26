"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const SignupButton = () => {
  const [profile, setProfile] = useState(false);
  const [picture, setPicture] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parseuser = JSON.parse(user);
      setProfile(true);
      if (parseuser.picture) {
        setPicture(parseuser.picture);
      } else {
        setPicture(""); // fallback logo (public folder)
      }
    }
  }, []);
  const signout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setPicture("");
    setProfile(false);
  };
  return (
    <>
      {profile ? (
        <button
          onClick={signout}
          className="cursor-pointer flex items-center"
          title="logout"
        >
          {picture ? (
            <Image
              src={picture}
              width={30}
              height={30}
              alt="profile"
              className="rounded-full"
            />
          ) : (
            <svg className="h-7 fill-white" viewBox="0 0 640 640">
              <path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" />
            </svg>
          )}
        </button>
      ) : (
        <Link href={"/l"}>
          <div className="flex items-center space-x-2 border-2 p-2 rounded-lg">
            <svg className="h-7 fill-black" viewBox="0 0 640 640">
              <path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" />
            </svg>
            <h3>SignUp</h3>
          </div>
        </Link>
      )}
    </>
  );
};

export default SignupButton;
