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

interface EnrollFormData {
  imageName: string;
  fileName: string;
  fname: string;
  lname: string;
  dob: Date;
  address: string;
  city: string;
  grade: string;
  gender: string;
  allergies: string;
  mdconditions: string;
  avoidactivities: string;
  dietrestriction: string;
  specialneeds: string;
  images: File[] | null;
  reciept: File[] | null;
  userId: string;
}

const Enroll = () => {
  const { data: session, status } = useSession();
  const userInfo = session?.user as unknown as any;
  const [images, setImages] = useState<File[]>([]);
  const [reciept, setReciept] = useState<File[]>([]);
  const [formData, setFormData] = useState<EnrollFormData>({
    imageName: "",
    fileName: "",
    fname: "",
    lname: "",
    dob: new Date(),
    address: "",
    city: "",
    grade: "",
    gender: "",
    allergies: "",
    mdconditions: "",
    avoidactivities: "",
    dietrestriction: "",
    specialneeds: "",
    images: [],
    reciept: [],
    userId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successfull, setSuccessFull] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // console.log(formData);
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
      setReciept(_files);
      formData.reciept = reciept;

      //   console.log(images);
    }
  };

  const calculateAge = (dob: Date) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormData({ ...formData });
    setIsLoading(!isLoading);
    // Validate first name and last name (assuming they should not be empty)
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

    // Validate age (between 13 and 19)
    const age = calculateAge(formData.dob);
    if (age < 13 || age > 19) {
      setMessage("The camper's age must be between 13 and 19 years old.");
      setIsLoading(false); // Set loading state to false
      return;
    }
    // console.log("userInfo", session);
    formData.imageName = images[0]?.name;
    formData.fileName = reciept[0]?.name;
    formData.images = images;
    formData.reciept = reciept;
    formData.userId = userInfo.id;

    const data = new FormData();
    data.append("imageName", formData.imageName);
    data.append("fileName", formData.fileName);
    data.append("fname", formData.fname);
    data.append("lname", formData.lname);
    data.append("dob", new Date(formData.dob).toString());
    data.append("address", formData.address);
    data.append("city", formData.city);
    data.append("grade", formData.grade);
    data.append("gender", formData.gender);
    data.append("alergies", formData.allergies);
    data.append("medicalCondition", formData.mdconditions);
    data.append("shouldAvoid", formData.avoidactivities);
    data.append("dietaryRestriction", formData.dietrestriction);
    data.append("accommodationRequirments", formData.specialneeds);
    data.append("userId", userInfo.id);
    data.append("image", images[0]);
    data.append("file", reciept[0]);

    try {
      const res = await fetch(process.env.APIpath + "/api/enroll", {
        method: "POST",
        // headers: { "Content-Type": "multipart/form-data" },
        body: data,
      });
      if (!res || res.ok !== true) {
        setIsLoading(false);
        setMessage("Unable to enroll camper");
        // router.push("/error");
      } else {
        setIsLoading(false);
        setSuccessFull("Camper created successfull");
        setMessage("");
        router.push(`/profile`);
      }
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      setMessage("Something went wrong");
    }
  };
  const dateString = formData.dob.toString();

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
            <h2 className="text-black dark:text-white text-3xl xl:text-sectiontitle2 font-semibold mb-15 text-center">
              <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
                <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
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
                </div>
                <div className="w-full">
                  <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
                    Enrolled in Successfully Please wait...
                  </h5>
                </div>
              </div>
            </h2>
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
                Summer Camp Enrollment Form
              </h2>

              <div className="flex flex-col lg:flex-col lg:justify-between gap-3.5 lg:gap-6 mb-2.5 lg:mb-1.5">
                <h2 className="font-bold text rounded-lg text-center">
                  Camper Information{" "}
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="ml-128">
                    {" "}
                    <section className="pb-2  sm:ml-0 lg:ml-2">
                      <h6 className="text-sm font-bold">
                        Upload Passport size picture of camper
                      </h6>
                      {/* <FileUploader /> */}
                      <CustomFileSelector
                        accept="image/png, image/jpeg"
                        onChange={handleImageSelected}
                        id="images"
                        name="images"
                      />
                      {/* <input
                      type="submit"
                      onSubmit={handleFileUpload}
                      value="upload"
                    /> */}
                      {/* Image Preiewer>*/}
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
                      <label htmlFor="dob" className="mb-2">
                        Date of Birth:
                      </label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        //   required
                        value={dateString}
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
                        Camper Medical Information
                      </h2>
                    </div>
                    <div className="flex flex-col mt-4 mb-2">
                      <label htmlFor="address" className="mb-2">
                        Does the camper have any allergies? If yes, please list:
                      </label>
                      <input
                        type="text"
                        id="allergies"
                        name="allergies"
                        //   required
                        value={formData.allergies}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col mt-4 mb-2">
                      <label htmlFor="address" className="mb-2">
                        Does the camper have any medical conditions? If yes,
                        please list:
                      </label>
                      <input
                        type="text"
                        id="mdconditions"
                        name="mdconditions"
                        //   required
                        value={formData.mdconditions}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col mt-4 mb-2">
                      <label htmlFor="address" className="mb-2">
                        Does the camper have any dietary restrictions? ? If yes,
                        please list:
                      </label>
                      <input
                        type="text"
                        id="dietrestriction"
                        name="dietrestriction"
                        //   required
                        value={formData.dietrestriction}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <label htmlFor="address" className="mb-2">
                      Does the camper have any dietary restrictions? If yes,
                      please list:
                    </label>
                    <div className="flex flex-col mt-4 mb-2">
                      <label htmlFor="address" className="mb-2">
                        Are there any activities that you would like the camper
                        to avoid?
                      </label>
                      <input
                        type="text"
                        id="avoidactivities"
                        name="avoidactivities"
                        //   required
                        value={formData.avoidactivities}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col mt-4 mb-2">
                      <label htmlFor="address" className="mb-2">
                        Are there any other special needs or accommodations that
                        the camper may require?
                      </label>
                      <input
                        type="text"
                        id="specialneeds"
                        name="specialneeds"
                        //   required
                        value={formData.specialneeds}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col mt-4 mb-2">
                      <label htmlFor="reciept" className="mb-2">
                        Add image or pdf of payment invoice
                      </label>
                      <CustomFileSelector
                        accept="image/png, image/jpeg,.pdf "
                        onChange={handleFileSelected}
                        id="reciept"
                        name="reciept"
                      />
                    </div>
                    <div> </div>
                    <button
                      aria-label="submit enroll camper"
                      className=" text-meta dark:bg-transparent hover:text-btndark dark:hover:text-meta font-bold py-4 mt-2 px-4 rounded"
                      onClick={() => setFormData}
                      type="submit"
                    >
                      Submit
                    </button>
                    {isLoading ? (
                      <h2 className="text-black dark:text-white text-3xl xl:text-sectiontitle2 font-semibold mt-4 mb-15 text-center">
                        Loading...
                      </h2>
                    ) : message !== "" ? (
                      <h2 className="text-black dark:text-white text-3xl xl:text-sectiontitle2 font-semibold mt-4 mb-15 text-center">
                        {message}
                      </h2>
                    ) : null}
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

export default Enroll;
