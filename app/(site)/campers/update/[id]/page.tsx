import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UpdateCamperProfile from "@/components/Campers/update/[id]";
import { profileType } from "@/types/profileType";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { NextRequest } from "next/server";

export const metadata: Metadata = {
  title: "Update Camper Information",
  description: "update camper info",
  // other metadata
};

async function getCamperProfile(id: any) {
  // const id = NextRequest.
  // console.log("search id", id);
  let profile: profileType;

  try {
    const res = await fetch(
      process.env.APIpath + `/api/campers/details/${id}`,
      {
        method: "GET",
        // headers: { "Content-Type": "application/json" },
      }
    );

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

const UpdateCamperPage = async ({ params }: any) => {
  const session = await getServerSession(authOptions);
  const id = params.id;
  // let data: profileType;
  const data = await getCamperProfile(id);
  // console.log("data", data);

  if (!session) {
    redirect("/auth/signin");
  } else if (!session.user || session.user?.role !== "USER") {
    redirect("/denied");
  }
  return (
    <>
      <UpdateCamperProfile profile={data} />
    </>
  );
};

export default UpdateCamperPage;
