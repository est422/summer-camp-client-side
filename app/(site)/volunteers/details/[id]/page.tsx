import { Metadata } from "next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import VolunteerDetailsComponent from "@/components/Volunteers/details/[id]";

export const metadata: Metadata = {
  title: "Volunteers details page",
  description: "volunteers details page",
  // other metadata
};

const ApplicantDetailsPage = async () => {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/auth/signup");
  // }

  return (
    <>
      <VolunteerDetailsComponent />
    </>
  );
};

export default ApplicantDetailsPage;
