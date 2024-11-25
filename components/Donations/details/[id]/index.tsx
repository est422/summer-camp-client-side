"use client";
import React, { useState, useEffect, cache } from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { redirect, useRouter, useParams } from "next/navigation";
import Loader from "@/components/Common/Loader";

const DonationDetailsComponent = () => {
  const { data: session, status } = useSession();
  const userInfo = session?.user as unknown as any;
  const [donationDetail, setDonationDetail] = useState({
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    donationType: "",
    receipt: [],
    status: "",
    amount: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [successfull, setSuccessFull] = useState("");
  const params = useParams();
  const router = useRouter();

  const getDonationDetails = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
         `/api/donations/details/${params.id}`,
        {
          method: "GET",
          // headers: { "Content-Type": "application/json" },
        }
      );

      if (!res || res.ok !== true) {
        setIsLoading(false);
        setMessage("Your Donation has Failed");
        setSuccessFull("");
      } else {
        const data = await res.json();
        setDonationDetail(data);
        setIsLoading(false);
        setMessage("");
        setSuccessFull("successfull");
        router.refresh();

        // router.push(`/donations/details/${data.id}`);
      }
    } catch (error) {
      setIsLoading(false);
      setMessage("Something went wrong");
      setSuccessFull("");
    }

    return donationDetail;
  };

  useEffect(() => {
    getDonationDetails();
  }, []);

  useEffect(() => {}, [isLoading, message]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : !isLoading && message ? (
        <section className="pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-20">
          <div className="mx-auto max-w-c-1016 relative z-1 pt-10 lg:pt-15 xl:pt-20 pb-7.5 px-7.5 lg:px-15 xl:px-20">
            <h2 className="text-black dark:text-white text-3xl xl:text-sectiontitle2 font-semibold mb-15 text-center">
              <div className="flex w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
                <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#F87171]">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setMessage("");
                      router.refresh();
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351L12.2589 1.91221L12.2595 1.91158C12.5802 1.59132 12.5802 1.07805 12.2595 0.757793C11.9393 0.437994 11.4268 0.437869 11.1064 0.757418C11.1063 0.757543 11.1062 0.757668 11.106 0.757793L6.49234 5.34931L1.89459 0.740581L1.89396 0.739942C1.57364 0.420019 1.0608 0.420019 0.740487 0.739944C0.42005 1.05999 0.419837 1.57279 0.73985 1.89309L6.4917 7.65579ZM6.4917 7.65579L1.89459 12.2639L1.89395 12.2645C1.74546 12.4128 1.52854 12.5 1.32616 12.5C1.12377 12.5 0.906853 12.4128 0.758361 12.2645L1.1117 11.9108L0.758358 12.2645C0.437984 11.9445 0.437708 11.4319 0.757539 11.1116C0.757812 11.1113 0.758086 11.111 0.75836 11.1107L5.33864 6.50287L0.740487 1.89373L6.4917 7.65579Z"
                        fill="#ffffff"
                        stroke="#ffffff"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="w-full">
                  <h5 className="mb-3 font-semibold text-[#B45454]">
                    {message}
                  </h5>
                </div>
              </div>
            </h2>
          </div>
        </section>
      ) : (
        !isLoading &&
        !message && (
          <section className="pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-20">
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
                <div className="mt-6 border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-bold leading-6 text-gray-900">
                        Full name
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {donationDetail.firstName +
                          " " +
                          " " +
                          donationDetail.lastName}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-bold leading-6 text-gray-900">
                        Phone
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {donationDetail.phone}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-bold leading-6 text-gray-900">
                        Address
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {donationDetail.address}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-bold leading-6 text-gray-900">
                        City
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {donationDetail.city}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-bold leading-6 text-gray-900">
                        Donation status
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {donationDetail.status}
                      </dd>
                    </div>

                    {donationDetail?.donationType === "Money" ? (
                      <>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-bold leading-6 text-gray-900">
                            Donation Amount
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {donationDetail.amount}
                          </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-bold leading-6 text-gray-900">
                            Payment receipts
                          </dt>
                          <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul
                              role="list"
                              className="divide-y divide-gray-100 rounded-md border border-gray-200"
                            >
                              <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                <div className="flex w-0 flex-1 items-center">
                                  <svg
                                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                  <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                    <span className="truncate font-bold">
                                      {donationDetail.receipt}
                                    </span>
                                  </div>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <a
                                    href="#"
                                    className="font-bold text-indigo-600 hover:text-indigo-500"
                                  >
                                    Download
                                  </a>
                                </div>
                              </li>
                            </ul>
                          </dd>
                        </div>
                      </>
                    ) : (
                      donationDetail?.donationType === "Material" && (
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-bold leading-6 text-gray-900">
                            Donation description
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {donationDetail.description}
                          </dd>
                        </div>
                      )
                    )}
                  </dl>
                </div>
              </motion.div>
            </div>
          </section>
        )
      )}
    </>
  );
};

export default DonationDetailsComponent;
