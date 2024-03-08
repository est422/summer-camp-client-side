import CamperProfile from "@/components/Campers";

import { authOptions } from "@/lib/auth";
import { profileType } from "@/types/profileType";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Campers Profile page",
  description: "campers profile page",
  // other metadata
};

async function getCampersProfile(id: any) {
  let profile: profileType;
  // console.log("id", id);

  try {
    const res = await fetch(
      process.env.APIpath + `/api/campers/details/${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res || res.ok !== true) {
      return null;
    } else {
      profile = await res.json();
      return profile;
    }
  } catch (error) {
    return error;
  }
}

const CampersProfilePage = async () => {
  const session = await getServerSession(authOptions);
  let data;

  if (!session) {
    redirect("/auth/signin");
  }

  if (!session.user) {
    redirect("/auth/signin");
  } else {
    data = await getCampersProfile(session.user.id);
    // console.log("data", data);
  }

  return <CamperProfile profile={data} />;
};

export default CampersProfilePage;
