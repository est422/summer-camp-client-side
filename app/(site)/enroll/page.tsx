import Enroll from "@/components/Enroll";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enroll for coming Dates",
  description: "enroll for comming summer",
  // other metadata
};

const EnrollPage = async () => {
  const session = await getServerSession(authOptions);
  // console.log("session", session);

  if (!session) {
    redirect("/auth/signin");
  } else if (!session.user || session.user?.role !== "USER") {
    redirect("/denied");
  }

  return (
    <>
      <Enroll />
    </>
  );
};

export default EnrollPage;
