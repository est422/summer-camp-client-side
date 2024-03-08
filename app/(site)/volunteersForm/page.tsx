import VolunteersApplicationForm from "@/components/VolunteerApplicationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volunteers Application form",
  description: "volunteers application form",
  // other metadata
};

const VolunteersPage = () => {
  return (
    <>
      <VolunteersApplicationForm />
    </>
  );
};

export default VolunteersPage;
