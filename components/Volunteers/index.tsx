"use client";
import React, { useState, useEffect, cache } from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { redirect, useRouter } from "next/navigation";

const VolunteersComponent = () => {
  // const { data: session, status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/auth/signin");
  //   },
  // });
  // const userInfo = session?.user as unknown as any;
  const [volunteers, setVolunteers] = useState([
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
      gender: "",
      major: "",
      skillsandabilities: "",
      references: "",
      experiances: "",
      // appliedPosition: "",
      cv: "",
      status: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const getVolunteers = async () => {
    setIsLoading(true);
    // if (status === "authenticated") {
    try {
      const res = await fetch( `api/volunteers/`, {
        method: "GET",
        // headers: { "Content-Type": "application/json" },
      });

      if (!res) {
        setIsLoading(false);
        setMessage("Something went wrong");
      } else {
        const data = await res.json();
        setVolunteers(data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setMessage("Something went wrong");
    }
    // }

    return volunteers;
  };
  useEffect(() => {
    getVolunteers();
  }, []);

  useEffect(() => {}, [isLoading, message]);

  return (
    <>
      {isLoading ? (
        <section className="pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-20">
          <div className="mx-auto max-w-c-1016 relative z-1 pt-10 lg:pt-15 xl:pt-20 pb-7.5 px-7.5 lg:px-15 xl:px-20">
            <h2 className="text-black dark:text-white text-3xl xl:text-sectiontitle2 font-semibold mb-15 text-center">
              Loading...
            </h2>
          </div>
        </section>
      ) : !isLoading && !volunteers.length ? (
        <section className="pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-20">
          <div className="mx-auto max-w-c-1016 relative z-1 pt-10 lg:pt-15 xl:pt-20 pb-7.5 px-7.5 lg:px-15 xl:px-20">
            <h2 className="text-black dark:text-white text-3xl xl:text-sectiontitle2 font-semibold mb-15 text-center">
              No Data to Display...
            </h2>
          </div>
        </section>
      ) : (
        volunteers?.map((volunteer, i) => (
          <section
            key={i}
            className="pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-20"
          >
            <div className="mx-auto max-w-c-1016 relative z-1 pt-10 lg:pt-15 xl:pt-20 pb-7.5 px-7.5 lg:px-15 xl:px-20">
              <div className="absolute -z-1 rounded-lg left-0 top-0 w-full h-2/3 bg-gradient-to-t from-[#F8F9FF] to-[#dee7ff47] dark:bg-gradient-to-t dark:from-[#24283E] dark:to-[#252A42]"></div>
              <h2 className="text-black dark:text-white text-3xl xl:text-sectiontitle2 font-semibold mb-15 text-center">
                Profile Information
              </h2>
              <div className="absolute -z-1 bottom-17.5 left-0 w-full h-1/3">
                <Image
                  src="/images/shape/shape-dotted-light.svg"
                  alt="Dotted"
                  className="dark:hidden"
                  fill
                />
                <Image
                  src="/images/shape/shape-dotted-dark.svg"
                  alt="Dotted"
                  className="hidden dark:block"
                  fill
                />
              </div>

              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    y: -20,
                  },

                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, delay: 0.1 }}
                viewport={{ once: true }}
                className="animate_top shadow-solid-8 rounded-lg bg-white dark:bg-black dark:border dark:border-strokedark pt-7.5 xl:pt-15 px-7.5 xl:px-15"
              >
                <div>
                  {/* <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 p-4"> */}
                  <Image
                    src={
                      volunteer.imageName === "undefined"
                        ? "/Unknown_person.jpg"
                        : `/${volunteer.imageName}`
                    }
                    alt="user-img"
                    width={250}
                    height={150}
                  />
                  <div className="mt-16 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Full name
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {volunteer.firstName + " " + " " + volunteer.lastName}
                        </dd>
                      </div>

                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Email address
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {volunteer.email}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Phone
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {volunteer.phone}
                        </dd>
                      </div>
                    </dl>
                    <div className="p-4 ml-4 flex items-center justify-center">
                      <a
                        // href={`/volunteers/update/${volunteerProfile.id}`}
                        // onClick={(e) => handleApprove(e)}
                        href={`/volunteers/details/${volunteer.id}`}
                        className="flex items-center justify-center bg-primary hover:bg-primaryho ease-in-out duration-300 text-white text-regular rounded-full py-2.5 px-7.5 p-5"
                      >
                        View more
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        ))
      )}
    </>
  );
};

export default VolunteersComponent;
