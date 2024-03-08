"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { useSession, signIn, signOut } from "next-auth/react";
import CustomFileSelector from "@/components/FileUploader/CustomFileSelector";
import ImagePreview from "@/components/FileUploader/ImagePreview";
import { redirect, useParams, useRouter } from "next/navigation";
import Loader from "@/components/Common/Loader";
import { profileType } from "@/types/profileType";
import { camperProfileType } from "@/types/CamperProfileType";
import CamperProfile from "../..";

interface EnrollFormData {
  id: string;
  accommodationRequirments: string;
  alergies: string;
  dietaryRestriction: string;
  medicalCondition: string;
  shouldAvoid: string;
  dateofbirth: Date;
  firstName: string;
  gender: string;
  // id: string;
  imageName: string;
  lastName: string;
  userId: string;
  images: File[] | null;
}

const UpdateCamperProfile = ({ profile }: any) => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/signin");
    },
  });
  const userInfo = session?.user as unknown as any;
  const [images, setImages] = useState<File[]>([]);
  const [reciept, setReciept] = useState<File[]>([]);
  const [initialProfile, setInitialProfile] = useState(profile);
  const [formData, setFormData] = useState<EnrollFormData>({
    imageName: initialProfile?.imageName || "",
    firstName: initialProfile?.firstName || "",
    lastName: initialProfile?.lastName || "",
    dateofbirth: initialProfile?.dateofbirth
      ? new Date(initialProfile?.dateofbirth)
      : new Date(),
    gender: initialProfile?.gender || "",
    id: initialProfile?.camperMedicalInfo[0].id,
    accommodationRequirments:
      initialProfile?.camperMedicalInfo[0].accommodationRequirments || "",
    alergies: initialProfile?.camperMedicalInfo[0].alergies || "",
    dietaryRestriction:
      initialProfile?.camperMedicalInfo[0].dietaryRestriction || "",
    medicalCondition:
      initialProfile?.camperMedicalInfo[0].medicalCondition || "",
    shouldAvoid: initialProfile?.camperMedicalInfo[0].shouldAvoid || "",
    userId: initialProfile?.userId || "",
    images: [],
  });

  const [newImage, setNewImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successfull, setSuccessFull] = useState("");
  const router = useRouter();
  const params = useParams();

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
      // formData.images = images;
      setFormData({ ...formData, images: _files, imageName: _files[0]?.name });

      //   console.log(images);
    }
  };
  // const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     //convert `FileList` to `File[]`
  //     const _files = Array.from(e.target.files);
  //     setReciept(_files);
  //     setFormData({
  //       ...formData,
  //       receipt: receipt,
  //       fileName: _files[0]?.name,
  //     });

  //     //   console.log(images);
  //   }
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // setFormData({ ...formData });

    // console.log("camperInfo", camperInfo);
    // formData.imageName = images[0]?.name;
    // formData.images = images;

    const data = new FormData();
    data.append("imageName", formData.imageName);
    data.append("fname", formData.firstName);
    data.append("lname", formData.lastName);
    data.append("dateofbirth", new Date(formData.dateofbirth).toString());
    data.append("gender", formData.gender);
    data.append("alergies", formData.alergies);
    data.append("medicalCondition", formData.medicalCondition);
    data.append("shouldAvoid", formData.shouldAvoid);
    data.append("dietaryRestriction", formData.dietaryRestriction);
    data.append("accommodationRequirments", formData.accommodationRequirments);
    data.append("image", images[0]);
    data.append("camperMedicalInfoId", formData.id);

    // data.set("", formData);
    // Submit the form data to the server
    // console.log("data", data);
    // console.log("enroll form data", formData);
    try {
      const res = await fetch(
        `https://camp-addis.vercel.app/api/campers/update/${params.id}`,
        {
          method: "PUT",
          // headers: { "Content-Type": "multipart/form-data" },
          body: data,
        }
      );
      if (!res || res.ok !== true) {
        setIsLoading(false);
        setMessage("Unable to update information");
        setSuccessFull("");
        // router.push("/error");
      } else {
        // router.refresh();
        // console.log(`sign up response ${signUpResponse.status}`);
        setIsLoading(false);
        setMessage("");
        setSuccessFull("Sign in successfull");
        router.push("/profile");
      }
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      setMessage("Something went wrong");
      setSuccessFull("");
    }
  };

  const dateString = formData.dateofbirth.toString();

  useEffect(() => {
    // console.log("initialProfile", initialProfile);
  }, [session, status]);

  useEffect(() => {}, [isLoading, message, successfull]);

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
                    setMessage("");
                    router.back();
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
                  Message Sent Successfully Please wait....
                </h5>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-30">
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
                Update Camper Information Form
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
                    {/* <input
                type="submit"
                onSubmit={handleFileUpload}
                value="upload"
              /> */}
                    {/* Image Preiewer>*/}
                    <ImagePreview images={images} />
                  </section>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="firstName" className="mb-2">
                      First Name:
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      //   required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="lastName" className="mb-2">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      //   required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="dateofbirth" className="mb-2">
                      Date of birth:
                    </label>
                    <input
                      type="date"
                      id="dateofbirth"
                      name="dateofbirth"
                      //   required
                      value={
                        formData.dateofbirth instanceof Date
                          ? formData.dateofbirth.toISOString().split("T")[0]
                          : ""
                      }
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="alergies" className="mb-2">
                      Allergies:
                    </label>
                    <input
                      type="text"
                      id="alergies"
                      name="alergies"
                      //   required
                      value={formData.alergies}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="medicalCondition" className="mb-2">
                      medicalCondition:
                    </label>
                    <input
                      type="text"
                      id="medicalCondition"
                      name="medicalCondition"
                      //   required
                      value={formData.medicalCondition}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="shouldAvoid" className="mb-2">
                      Avoid activities:
                    </label>
                    <input
                      type="text"
                      id="shouldAvoid"
                      name="shouldAvoid"
                      //   required
                      value={formData.shouldAvoid}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label htmlFor="dietaryRestriction" className="mb-2">
                      Dietary Restriction:
                    </label>
                    <input
                      type="text"
                      id="dietaryRestriction"
                      name="dietaryRestriction"
                      //   required
                      value={formData.dietaryRestriction}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label htmlFor="accommodationRequirments" className="mb-2">
                      Accommodation Requirments:
                    </label>
                    <input
                      type="text"
                      id="accommodationRequirments"
                      name="accommodationRequirments"
                      //   required
                      value={formData.accommodationRequirments}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div> </div>
                  <button
                    aria-label="submit enroll camper"
                    className=" text-meta dark:bg-transparent hover:text-btndark dark:hover:text-meta font-bold py-4 mt-2 px-4 rounded"
                    // onClick={() => setFormData}
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
};

export default UpdateCamperProfile;
