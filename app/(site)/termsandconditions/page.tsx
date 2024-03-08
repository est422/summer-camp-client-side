import { Metadata } from "next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import TermsAndConditionsComponent from "@/components/TermsAndConditions";

export const metadata: Metadata = {
  title: "Terms and conditions page",
  description: "Terms and conditions page",
  // other metadata
};

const TermsAndConditionsPage = async () => {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/auth/signup");
  // }

  return (
    <>
      <TermsAndConditionsComponent />
    </>
  );
};

export default TermsAndConditionsPage;
