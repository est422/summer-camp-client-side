"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CustomFileSelector from "../FileUploader/CustomFileSelector";
import ImagePreview from "../FileUploader/ImagePreview";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "../Common/Loader";
import { applicationInfo } from "@/types/applicationInfo";

interface ApplicationFormData {
  imageName: string;
  fileName: string;
  fname: string;
  lname: string;
  age: string;
  phone: string;
  address: string;
  city: string;
  gender: string;
  major: string;
  skillsandabilities: string;
  references: string;
  experiances: string;
  images: File[] | null;
  cv: File[] | null;
  appliedPosition: string;
}

const ApplicationForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [cv, setCv] = useState<File[]>([]);
  const [formData, setFormData] = useState<ApplicationFormData>({
    imageName: "",
    fileName: "",
    fname: "",
    lname: "",
    age: "",
    phone: "",
    address: "",
    city: "",
    gender: "",
    major: "",
    skillsandabilities: "",
    references: "",
    experiances: "",
    images: [],
    cv: [],
    appliedPosition: "",
  });
  const [applicationInfo, setApplicationInfo] = useState<applicationInfo>();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [successfull, setSuccessFull] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };
  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //convert `FileList` to `File[]`
      const _files = Array.from(e.target.files);
      setImages(_files);
      formData.images = images;

      //   console.log(images);
    }
  };
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //convert `FileList` to `File[]`
      const _files = Array.from(e.target.files);
      setCv(_files);
      formData.cv = cv;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setFormData({ ...formData });

    if (!formData.fname.match(/^[a-zA-Z ]+$/)) {
      setMessage("Please enter a valid first name.");
      setIsLoading(false); // Set loading state to false
      return;
    }

    if (!formData.lname.match(/^[a-zA-Z ]+$/)) {
      setMessage("Please enter a valid last name.");
      setIsLoading(false); // Set loading state to false
      return;
    }

    formData.imageName = images[0]?.name;
    formData.fileName = cv[0]?.name;
    formData.images = images;
    formData.cv = cv;

    const data = new FormData();
    data.append("imageName", formData.imageName);
    data.append("fileName", formData.fileName);
    data.append("fname", formData.fname);
    data.append("lname", formData.lname);
    data.append("age", formData.age);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("city", formData.city);
    data.append("gender", formData.gender);
    data.append("major", formData.major);
    data.append("skillsandabilities", formData.skillsandabilities);
    data.append("experiances", formData.experiances);
    data.append("references", formData.references);
    data.append("image", images[0]);
    data.append("cv", cv[0]);
    data.append("appliedPosition", formData.appliedPosition);

    console.log("application form data", formData);
    try {
      const res = await fetch( "/api/application", {
        method: "POST",
        // headers: { "Content-Type": "multipart/form-data" },
        body: data,
      });
      if (!res || res.ok !== true) {
        setIsLoading(false);
        setMessage("Your Application has Failed");
        setSuccessFull("");
      }
      {
        const data = await res.json();
        setApplicationInfo(data);
        setIsLoading(false);
        setSuccessFull("Your Application is Successfull");
        setMessage("");
        // router.push(`/applicants/details/${data.id}`);
      }
    } catch (e: any) {
      //   console.error(e);
      setIsLoading(false);
      setMessage("Something went wrong");
      setSuccessFull("");
    }
  };
  //   const dateString = formData.dob.toString();

  useEffect(() => {
    // console.log(`sessionIs: ${userInfo.role}`);
  }, [isLoading, message, successfull]);

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
      ) : !isLoading && !message && successfull ? (
        <section className="pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-20">
          <div className="mx-auto max-w-c-1016 relative z-1 pt-10 lg:pt-15 xl:pt-20 pb-7.5 px-7.5 lg:px-15 xl:px-20">
            <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
              <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // setSuccessFull("");
                    router.push(`/applicants/details/${applicationInfo?.id}`);
                  }}
                >
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                      fill="white"
                      stroke="white"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="w-full">
                <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
                  Application has been Sent Successfully
                </h5>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="pt-32.5 lg:pt-45 xl:pt-30 pb-12.5 lg:pb-25 xl:pb-30">
          <div className="mx-auto max-w-c-1016 relative z-1 pt-10 lg:pt-15 xl:pt-20 pb-7.5 px-7.5 lg:px-15 xl:px-20">
            <div className="absolute -z-1 rounded-lg left-0 top-0 w-full h-2/3 bg-gradient-to-t from-[#F8F9FF] to-[#dee7ff47] dark:bg-gradient-to-t dark:from-[#24283E] dark:to-[#252A42]"></div>
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
              <h2 className=" text-meta dark:text-white text-xl xl:text-xl font-semibold mb-8 text-center">
                Application Form
              </h2>

              <div className="flex flex-col lg:flex-col lg:justify-between gap-3.5 lg:gap-6 mb-2.5 lg:mb-1.5">
                <h2 className="font-bold text rounded-lg text-center">
                  Applicant Personal Information{" "}
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="ml-128">
                    {" "}
                    <section className="pb-2  sm:ml-0 lg:ml-2">
                      <h6 className="text-sm font-bold">
                        Upload Passport size picture
                      </h6>
                      {/* <FileUploader /> */}
                      <CustomFileSelector
                        accept="image/png, image/jpeg"
                        onChange={handleImageSelected}
                        id="images"
                        name="images"
                      />
                      <ImagePreview images={images} />
                    </section>
                    <div className="flex flex-col mb-2">
                      <label htmlFor="fname" className="mb-2">
                        First Name:
                      </label>
                      <input
                        type="text"
                        id="fname"
                        name="fname"
                        //   required
                        value={formData.fname}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                      <ul>
                        <li>{formData.fname}</li>
                      </ul>
                    </div>
                    <div className="flex flex-col mb-2">
                      <label htmlFor="lname" className="mb-2">
                        Last Name:
                      </label>
                      <input
                        type="text"
                        id="lname"
                        name="lname"
                        //   required
                        value={formData.lname}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col mb-4">
                      <label htmlFor="age" className="mb-2">
                        Age:
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        //   required
                        value={formData.age}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col mb-4">
                      <label htmlFor="age" className="mb-2">
                        Phone:
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        //   required
                        value={formData.phone}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col mb-4">
                      <label htmlFor="address" className="mb-2">
                        Address:
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        //   required
                        value={formData.address}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col mb-4">
                      <label htmlFor="city" className="mb-2">
                        City:
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        //   required
                        value={formData.city}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col mb-4">
                      <label htmlFor="state" className="mb-2">
                        Gender:
                      </label>
                      <input
                        type="text"
                        id="gender"
                        name="gender"
                        //   required
                        value={formData.gender}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col lg:flex-col lg:justify-between gap-7.5 lg:gap-14 mb-2.5 lg:mb-4.5">
                      <h2 className="font-bold text-xl">
                        Applicant Information
                      </h2>
                    </div>
                    <div className="flex flex-col mt-4 mb-2">
                      <label htmlFor="address" className="mb-2">
                        Applicants major:
                      </label>
                      <input
                        type="text"
                        id="major"
                        name="major"
                        //   required
                        value={formData.major}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col mt-4 mb-2">
                      <label htmlFor="address" className="mb-2">
                        Work related references:
                      </label>
                      <input
                        type="text"
                        id="references"
                        name="references"
                        //   required
                        value={formData.references}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col mt-4 mb-2">
                      <label htmlFor="address" className="mb-2">
                        Skills and abilities
                      </label>
                      <input
                        type="text"
                        id="skillsandabilities"
                        name="skillsandabilities"
                        //   required
                        value={formData.skillsandabilities}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col mt-4 mb-2">
                      <label htmlFor="address" className="mb-2">
                        Work experiances?
                      </label>
                      <input
                        type="text"
                        id="experiances"
                        name="experiances"
                        //   required
                        value={formData.experiances}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex mt-4 mb-2">
                      <label htmlFor="address" className="mb-2">
                        Apply for Position
                      </label>

                      <div className="pl-4 relative inline-block text-left">
                        <div>
                          <button
                            type="button"
                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            id="menu-button"
                            aria-expanded="true"
                            aria-haspopup="true"
                            onClick={toggleDropdown}
                          >
                            Options
                            <svg
                              className="-mr-1 h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>

                        {isOpen && (
                          <div
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            // tabIndex="-1"
                          >
                            <div className="py-1" role="none">
                              <button
                                // href="#"
                                name="appliedPosition"
                                value={formData.appliedPosition}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setFormData({
                                    ...formData,
                                    appliedPosition: "Camp Councelor",
                                  });
                                  setIsOpen(!isOpen);
                                }}
                                className="text-gray-700 block px-4 py-2 text-sm"
                                role="menuitem"
                                // tabIndex="-1"
                                id="menu-item-0"
                              >
                                Camp Counselor
                              </button>
                              <button
                                // href="#"
                                name="appliedPosition"
                                value={formData.appliedPosition}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setFormData({
                                    ...formData,
                                    appliedPosition: "Activity Leader",
                                  });
                                  setIsOpen(!isOpen);
                                }}
                                className="text-gray-700 block px-4 py-2 text-sm"
                                role="menuitem"
                                // tabIndex="-1"
                                id="menu-item-1"
                              >
                                Activity Leader
                              </button>
                              <button
                                // href="#"
                                name="appliedPosition"
                                value={formData.appliedPosition}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setFormData({
                                    ...formData,
                                    appliedPosition: "Nurse/Ho",
                                  });
                                  setIsOpen(!isOpen);
                                }}
                                className="text-gray-700 block px-4 py-2 text-sm"
                                role="menuitem"
                                // tabIndex="-1"
                                id="menu-item-2"
                              >
                                Nurse/Ho
                              </button>
                              <button
                                name="appliedPosition"
                                value={formData.appliedPosition}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setFormData({
                                    ...formData,
                                    appliedPosition: "Art Director",
                                  });
                                  setIsOpen(!isOpen);
                                }}
                                className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                                role="menuitem"
                                // tabindex="-1"
                                id="menu-item-3"
                              >
                                Art Director
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* <input
                      type="text"
                      id="appliedPosition"
                      name="appliedPosition"
                      //   required
                      value={formData.appliedPosition}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2"
                    /> */}
                    </div>
                    <div className="flex flex-col mt-4 mb-2">
                      <label htmlFor="reciept" className="mb-2">
                        Add your cv
                      </label>
                      <CustomFileSelector
                        accept="image/png, image/jpeg,.pdf "
                        onChange={handleFileSelected}
                        id="cv"
                        name="cv"
                      />
                    </div>
                    <div> </div>
                    <button
                      aria-label="submit application form"
                      className=" text-meta dark:bg-transparent hover:text-btndark dark:hover:text-meta font-bold py-4 mt-2 px-4 rounded"
                      onClick={() => setFormData}
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
};

export default ApplicationForm;
