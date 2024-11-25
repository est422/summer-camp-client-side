"use client";
import React, { useState, useEffect, cache } from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { redirect, useRouter, useParams } from "next/navigation";

const DeleteApplicantComponent = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/signin");
    },
  });
  const userInfo = session?.user as unknown as any;
  const [userProfile, setUserProfile] = useState({
    id: "",
    imageName: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    relationshiptocamper: "",
    addressInfo: { phone: "", address: "", city: "" },
    camperInfo: [
      {
        imageName: "",
        firstName: "",
        lastName: "",
        dateofbirth: "",
        gender: "",
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  // console.log("params", params);

  const getUserProfile = async () => {
    if (status === "authenticated") {
      try {
        const res = await fetch(
           `/api/users/${params.id}`,
          {
            method: "GET",
            // headers: { "Content-Type": "application/json" },
          }
        );

        if (!res) return null;
        else {
          const data = await res.json();
          setUserProfile(data);
          setIsLoading(false);
          console.log("userProfile", userProfile);
        }
      } catch (error) {
        console.log("unable to get users profile", error);
        setIsLoading(false);
      }
    }
    return userProfile;
  };
  useEffect(() => {
    getUserProfile();
  }, [session, status]);

  if (status === "loading")
    return (
      <p className="pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-30">
        Loading...
      </p>
    );
  if (!userProfile)
    return (
      <p className="pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-30">
        No profile data
      </p>
    );

  if (status !== "authenticated")
    return (
      <p className="pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-30">
        Not Authorized Please Log In
      </p>
    );

  return (
    <>
      <section className="pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-30">
        <div className="container container max-w-xxl m-auto flex flex-wrap flex-col md:flex-row items-center justify-center">
          <div className="w-full lg:w-1/2 p-3">
            <div className="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-42 border shadow shadow-lg">
              <img
                src={`/${userProfile.imageName}`}
                className="block h-auto w-full lg:w-48 flex-none bg-cover h-24"
              />
              <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="text-black font-bold text-xl mb-2 leading-tight">
                  Full Name:{userProfile.firstName + userProfile.lastName}
                </div>
                <div className="text-black font-bold text-xl mb-2 leading-tight">
                  Email: {userProfile.email}
                </div>
                <div className="text-black font-bold text-xl mb-2 leading-tight">
                  Phone: {userProfile.addressInfo.phone}
                </div>
                {/* <div className="text-black font-bold text-xl mb-2 leading-tight">
                  <a
                    href={`/profile/update/${userProfile.id}`}
                    className="text-grey-darker text-base"
                  >
                    Edit
                  </a>
                </div> */}
                <div className="text-black font-bold text-xl mb-2 leading-tight">
                  <a
                    href={`/users/profile/delete/${userProfile.id}`}
                    className="text-grey-darker text-base"
                  >
                    Delete
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {userProfile.camperInfo.map((camper, i) => (
          <div
            key={i}
            className="container container max-w-xxl m-auto flex flex-wrap flex-col md:flex-row items-center justify-center"
          >
            <div className="w-full lg:w-1/2 p-3">
              <div className="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-42 border shadow shadow-lg">
                <img
                  className="block h-auto w-full lg:w-48 flex-none bg-cover h-24"
                  src={`/${camper.imageName}`}
                />
                <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                  <div className="text-black font-bold text-xl mb-2 leading-tight">
                    Full Name :{`${camper.firstName + camper.lastName} `}
                  </div>
                  <div className="text-black font-bold text-xl mb-2 leading-tight">
                    Gender: {camper.gender}
                  </div>
                  <div className="text-black font-bold text-xl mb-2 leading-tight">
                    Date of Birth: {userProfile.addressInfo.phone}
                  </div>
                  {/* <div className="text-black font-bold text-xl mb-2 leading-tight">
                    <a
                      href={`/profile/update/${userProfile.id}`}
                      className="text-grey-darker text-base"
                    >
                      Edit
                    </a>
                  </div> */}
                  <div className="text-black font-bold text-xl mb-2 leading-tight">
                    <a
                      href={`/users/delete/${userProfile.id}`}
                      className="text-grey-darker text-base"
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="pt-12.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-30"></section>
    </>
  );
};

export default DeleteApplicantComponent;
