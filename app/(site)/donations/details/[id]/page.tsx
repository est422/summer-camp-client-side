import { Metadata } from "next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import DonationDetailsComponent from "@/components/Donations/details/[id]";

export const metadata: Metadata = {
  title: "Donations details page",
  description: "donations details page",
  // other metadata
};

const DonationsPage = async () => {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/auth/signup");
  // }

  return (
    <>
      <DonationDetailsComponent />
    </>
  );
};

export default DonationsPage;
