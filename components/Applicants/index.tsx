"use client";
import React, { useState, useEffect, cache } from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { redirect, useRouter } from "next/navigation";

const ApplicantsComponent = () => {
  const { data: session, status } = useSession();
  const userInfo = session?.user as unknown as any;
  const [applicants, setApplicants] = useState([
    {
      id: "",
      imageName: "",
      email: "",
      firstName: "",
      lastName: "",
      age: "",
      phone: "",
      address: "",
      city: "",
      grade: "",
      gender: "",
      major: "",
      skillsandabilities: "",
      references: "",
      experiances: "",
      appliedPosition: "",
      cv: "",
      status: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const getApplicants = async () => {
    setIsLoading(true);
    // if (status === "authenticated") {
    try {
      const res = await fetch(process.env.APIpath + `/api/application/`, {
        method: "GET",
        // headers: { "Content-Type": "application/json" },
      });

      if (!res) {
        setIsLoading(false);
        setMessage("Something went wrong");
      } else {
        const data = await res.json();
        setApplicants(data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setMessage("Something went wrong");
    }
    // }

    return applicants;
  };
  useEffect(() => {
    getApplicants();
  }, []);

  useEffect(() => {}, [isLoading, message]);

  if (isLoading)
    return (
      <section className="pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1016 relative z-1 pt-10 lg:pt-15 xl:pt-20 pb-7.5 px-7.5 lg:px-15 xl:px-20">
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
      <section className="pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1016 relative z-1 pt-10 lg:pt-15 xl:pt-20 pb-7.5 px-7.5 lg:px-15 xl:px-20">
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

  return (
    <>
      <section className="pt-32.5 lg:pt-35 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-30">
        <div className="container container max-w-xxl m-auto flex flex-wrap flex-col md:flex-row items-center justify-center">
          <div className="w-full lg:w-1/2 p-3">
            {/* <div className="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-42 border shadow shadow-lg">
              <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"> */}
            <div>
              <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  Applicant Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  Personal details and application.
                </p>
              </div>
              {applicants?.map((applicant, i) => (
                <div key={i} className="mt-16 border-t border-gray-100">
                  <img
                    src={`/${applicant.imageName}`}
                    className="block h-auto p-2 w-full lg:w-48 flex-none bg-cover h-24"
                  />
                  <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Full name
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {applicant.firstName + " " + " " + applicant.lastName}
                      </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {applicant.email}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Phone
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {applicant.phone}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Application for
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {applicant.appliedPosition}
                      </dd>
                    </div>
                  </dl>
                  <div className="ml-4 flex items-center justify-center">
                    <a
                      // href={`/applicants/update/${applicantProfile.id}`}
                      // onClick={(e) => handleApprove(e)}
                      href={`/applicants/details/${applicant.id}`}
                      className="flex items-center justify-center bg-primary hover:bg-primaryho ease-in-out duration-300 text-white text-regular rounded-full py-2.5 px-7.5 p-5"
                    >
                      View more
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* </div>
        </div> */}
      </section>
      {/* <section className="pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-30">
        {applicants?.map((applicant, i) => (
          <div
            key={i}
            className="container container max-w-xxl m-auto flex flex-wrap flex-col md:flex-row items-center justify-center"
          >
            <div className="w-full lg:w-1/2 p-3">
              <div className="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-42 border shadow shadow-lg">
                <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                  <div className="text-black font-bold text-xl mb-2 leading-tight">
                    Full Name: {applicant.firstName + applicant.lastName}
                  </div>
                  <div className="text-black font-bold text-xl mb-2 leading-tight">
                    Email: {applicant.email}
                  </div>
                  <div className="text-black font-bold text-xl mb-2 leading-tight">
                    Phone: {applicant.phone}
                  </div>
                  <a
                    href={`/applicants/details/${applicant.id}`}
                    className="text-grey-darker text-base mb-2"
                  >
                    View more
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section> */}
    </>
  );
};

export default ApplicantsComponent;
