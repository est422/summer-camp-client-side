import { Metadata } from "next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import VolunteersComponent from "@/components/Volunteers";

export const metadata: Metadata = {
  title: "Volunteers page",
  description: "volunteers page",
  // other metadata
};

const VolunteersPage = async () => {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/auth/signup");
  // }

  return (
    <>
      <VolunteersComponent />
    </>
  );
};

export default VolunteersPage;
