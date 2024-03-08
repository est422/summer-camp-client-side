import ApplicationForm from "@/components/ApplicationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Counselors Application form",
  description: "counselors application form",
  // other metadata
};

const ApplicationPage = () => {
  return (
    <>
      <ApplicationForm />
    </>
  );
};

export default ApplicationPage;
