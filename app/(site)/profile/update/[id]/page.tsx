import React, { useState, useEffect, cache } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import UpdateProfile from "@/components/Profile/update";
import { profileType } from "@/types/profileType";

async function getUserProfile(id: any) {
  let profile: profileType;
  try {
    const res = await fetch(process.env.APIpath + `/api/users/profile/${id}`, {
      method: "GET",
      // headers: { "Content-Type": "application/json" },
    });

    if (!res || res.ok !== true) {
    } else {
      profile = await res.json();

      return profile;
    }
  } catch (error) {
    return error;
    // setIsLoading(false);
  }
  return null;
}

const UpdateUserProfile = async () => {
  const session = await getServerSession(authOptions);
  let data;
  // const data = await getUserProfile(session?.user?.id);

  if (!session) {
    redirect("/auth/signup");
  }
  if (!session.user) {
    redirect("/auth/signin");
  } else {
    data = await getUserProfile(session.user.id);
    // console.log("data", data);
  }
  return (
    <>
      <UpdateProfile profile={data} />
    </>
  );
};

export default UpdateUserProfile;
