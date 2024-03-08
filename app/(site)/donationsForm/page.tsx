import DonationsForm from "@/components/DonationsForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donations form",
  description: "Donations form",
  // other metadata
};

const ApplicationPage = () => {
  return (
    <>
      <DonationsForm />
    </>
  );
};

export default ApplicationPage;
