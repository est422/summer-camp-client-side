"use client";
import React, { useState, useEffect, cache } from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import UpdateProfile from "@/components/Profile/update";
import ApplicantsComponent from "@/components/Applicants";

const ApplicantsPage = () => {
  return (
    <>
      <ApplicantsComponent />
    </>
  );
};

export default ApplicantsPage;
