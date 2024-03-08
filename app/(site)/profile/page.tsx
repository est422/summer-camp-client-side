import Profile from "@/components/Profile";
import { authOptions } from "@/lib/auth";
import { profileType } from "@/types/profileType";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile page",
  description: "user profile page",
  // other metadata
};

async function getUserProfile() {
  let profile: profileType;
  // console.log("id", id);
  const session = await getServerSession(authOptions);
  // console.log("session ", session);

  try {
    const res = await fetch(
      process.env.APIpath + `/api/users/profile/${session?.user.id}`,
      {
        method: "GET",
        // headers: {
        //   Authorizaton: `Bearer ${token}`,
        // },
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
  return null;
}

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  let data = await getUserProfile();

  if (!session) {
    redirect("/auth/signin");
  }

  // if (!session.user) {
  //   redirect("/auth/signin");
  // } else {
  //   data = await getUserProfile();
  //   // console.log("data", data);
  // }

  return <Profile profile={data} />;
};

export default ProfilePage;
