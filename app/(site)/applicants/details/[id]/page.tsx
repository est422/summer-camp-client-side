import { Metadata } from "next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import ApplicantDetailsComponent from "@/components/Applicants/details";

export const metadata: Metadata = {
  title: "Applicants page",
  description: "applicants page",
  // other metadata
};

const ApplicantDetailsPage = async () => {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/auth/signup");
  // }

  return (
    <>
      <ApplicantDetailsComponent />
    </>
  );
};

export default ApplicantDetailsPage;
