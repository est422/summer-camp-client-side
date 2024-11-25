"use client";
import React, { useState, useEffect, cache } from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { redirect, useRouter, useParams } from "next/navigation";

const UpdateApplicantComponent = () => {
  // const { data: session, status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/auth/signin");
  //   },
  // });
  // const userInfo = session?.user as unknown as any;
  const [applicantProfile, setApplicantProfile] = useState({
    id: "",
    imageName: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    age: "",
    address: "",
    city: "",
    gender: "",
    major: "",
    skillsandabilities: "",
    references: "",
    experiances: "",
    appliedPosition: "",
    cv: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const params = useParams();
  // console.log("params", params);

  const getApplicantProfile = async () => {
    setIsLoading(true);
    // if (status === "authenticated") {
    try {
      const res = await fetch(
        `/api/application/details/${params.id}`,
        {
          method: "GET",
          // headers: { "Content-Type": "application/json" },
        }
      );

      if (!res) {
        setIsLoading(false);
        setMessage("Something went wrong");
      } else {
        const data = await res.json();
        setApplicantProfile(data);
        setIsLoading(false);
        // setMessage("SuccessFull");
        // console.log("applicantProfile", applicantProfile);
      }
    } catch (error) {
      console.log("unable to get applicants profile", error);
      setMessage("Something went wrong");
      setIsLoading(false);
    }
    // }
    return applicantProfile;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    data.append("status", "Approved");

    try {
      const res = await fetch(
         `/api/application/update/${params.id}`,
        {
          method: "PUT",
          // headers: { "Content-Type": "multipart/form-data" },
          body: data,
        }
      );
      if (!res.ok) {
        setIsLoading(false);
        setMessage("Something went wrong");
      }
    } catch (e: any) {
      setMessage("Something went wrong");
      console.error(e);
    }
  };

  useEffect(() => {
    getApplicantProfile();
  }, [isLoading, message]);

  if (isLoading)
    return (
      <section className="p-50 pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-30">
        <div className="container container max-w-xxl m-auto flex flex-wrap flex-col md:flex-row items-center justify-center">
          <div className="w-full lg:w-1/2 p-3">
            <div className="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-42 border shadow shadow-lg">
              <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <h3 className="text-base font-bold leading-7 text-gray-900">
                  Loading...
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  if (message)
    return (
      <section className="p-50 pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-30">
        <div className="container container max-w-xxl m-auto flex flex-wrap flex-col md:flex-row items-center justify-center">
          <div className="w-full lg:w-1/2 p-3">
            <div className="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-42 border shadow shadow-lg">
              <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <h3 className="text-base font-bold leading-7 text-gray-900">
                  {message}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  // if (status === "loading")
  //   return (
  //     <p className="pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-30">
  //       Loading...
  //     </p>
  //   );
  // if (!applicantProfile)
  //   return (
  //     <p className="pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-30">
  //       No profile data
  //     </p>
  //   );

  // if (status !== "authenticated")
  //   return (
  //     <p className="pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-30">
  //       Not Authorized Please Log In
  //     </p>
  //   );

  return (
    <>
      <section className="pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-30">
        <div className="container container max-w-xxl m-auto flex flex-wrap flex-col md:flex-row items-center justify-center">
          <div className="w-full lg:w-1/2 p-3">
            <div className="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-42 border shadow shadow-lg">
              {/* <img
                src={`/${applicantProfile.imageName}`}
                className="block h-auto w-full lg:w-48 flex-none bg-cover h-24"
              /> */}
              <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="text-black font-bold text-xl mb-2 leading-tight">
                  Full Name:
                  {applicantProfile.firstName + applicantProfile.lastName}
                </div>
                <div className="text-black font-bold text-xl mb-2 leading-tight">
                  Email: {applicantProfile.email}
                </div>
                <div className="text-black font-bold text-xl mb-2 leading-tight">
                  Phone: {applicantProfile.phone}
                </div>
                <div className="text-black font-bold text-xl mb-2 leading-tight">
                  Age:
                  {applicantProfile.age}
                </div>
                <div className="text-black font-bold text-xl mb-2 leading-tight">
                  Gender: {applicantProfile.gender}
                </div>
                <div className="text-black font-bold text-xl mb-2 leading-tight">
                  Address: {applicantProfile.address}
                </div>
                <div className="text-black font-bold text-xl mb-2 leading-tight">
                  City: {applicantProfile.city}
                </div>
                <div className="text-black font-bold text-xl mb-2 leading-tight">
                  Major: {applicantProfile.major}
                </div>
                <div className="text-black font-bold text-xl mb-2 leading-tight">
                  Skills and abilities: {applicantProfile.skillsandabilities}
                </div>
                <div className="text-black font-bold text-xl mb-2 leading-tight">
                  Referencess: {applicantProfile.references}
                </div>
                <div className="text-black font-bold text-xl mb-2 leading-tight">
                  Experiances: {applicantProfile.experiances}
                </div>
                <div className="text-black font-bold text-xl mb-2 leading-tight">
                  Applied Position: {applicantProfile.appliedPosition}
                </div>
                <div className="text-black font-bold text-xl mb-2 leading-tight">
                  Cv: {applicantProfile.cv}
                </div>
                <div className="text-black font-bold text-xl mb-2 leading-tight">
                  Status: {applicantProfile.status}
                </div>
                <div className="text-black font-bold text-xl mb-2 leading-tight">
                  <button
                    // href=""
                    onClick={(e) => handleSubmit(e)}
                    className="text-grey-darker text-base"
                  >
                    Approve
                  </button>
                </div>
                <div className="text-black font-bold text-xl mb-2 leading-tight">
                  <a
                    href={`/application/delete/${applicantProfile.id}`}
                    className="text-grey-darker text-base"
                  >
                    Reject
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-12.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-30">
        {message}
      </section>
    </>
  );
};

export default UpdateApplicantComponent;
