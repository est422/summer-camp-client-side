import ForgatPassword from "@/components/Profile/ForgatPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgat password Page - Camp Addis",
  description: "This is Forgat password page for Camp Addis",
  // other metadata
};

const ForgatPasswordPage = () => {
  return (
    <>
      <ForgatPassword />
    </>
  );
};

export default ForgatPasswordPage;
