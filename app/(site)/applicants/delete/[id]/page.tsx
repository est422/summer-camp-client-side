"use client";
import React, { useState, useEffect, cache } from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import UpdateProfile from "@/components/Profile/update";

const DeleteApplicantPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/signin");
    },
  });
  const userInfo = session?.user as unknown as any;
  const [user, setUser] = useState({
    id: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    relationshiptocamper: "",
    addressInfo: { phone: "", address: "", city: "" },
    camperInfo: [{ firstName: "", lastName: "" }],
  });
  const [isLoading, setIsLoading] = useState(true);

  const getUserUser = async () => {
    if (status === "authenticated") {
      try {
        const res = await fetch(
          `http://localhost:3000/api/users/profile/${userInfo.id}`,
          {
            method: "GET",
            // headers: { "Content-Type": "application/json" },
          }
        );

        if (!res) return null;
        else {
          const data = await res.json();
          setUser(data);
          setIsLoading(false);
          // console.log("userUser", userUser);
        }
      } catch (error) {
        console.log("unable to get users profile", error);
        setIsLoading(false);
      }
    }
    return user;
  };
  useEffect(() => {
    getUserUser();
  }, [session, status]);

  if (status === "loading")
    return (
      <p className="pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-30">
        Loading...
      </p>
    );
  if (!user)
    return (
      <p className="pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-30">
        No user data
      </p>
    );

  if (status !== "authenticated")
    return (
      <p className="pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-30">
        Not Authorized Please Log In
      </p>
    );

  return <>{/* <UpdateProfile /> */}</>;
};

export default DeleteApplicantPage;
