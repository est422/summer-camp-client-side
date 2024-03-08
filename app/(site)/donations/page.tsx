import { Metadata } from "next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import DonationsComponent from "@/components/Donations";

export const metadata: Metadata = {
  title: "Donations page",
  description: "donations page",
  // other metadata
};

const DonationsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signup");
  }

  return (
    <>
      <DonationsComponent />
    </>
  );
};

export default DonationsPage;
