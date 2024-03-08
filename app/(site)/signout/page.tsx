import SignOut from "@/components/SignOut";
import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign out page",
  description: "sign page",
  // other metadata
};

const SignOutPage = async () => {
  // const data = await getUsersProfile(context);
  //   const session = getServerSession(authOptions);

  //   if (!session) {
  //     redirect("/auth/signup");
  //   }

  return <SignOut />;
};

export default SignOutPage;
