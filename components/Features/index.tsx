"use client";
import React from "react";
import featuresData from "./featuresData";
import SingleFeature from "./SingleFeature";
import SectionHeader from "../Common/SectionHeader";

const Feature = () => {
  return (
    <>
      {/* <!-- ===== Features Start ===== --> */}
      <section
        id="features"
        // style={{ backgroundColor: "#F8F9FF" }}
        className="py-10 lg:py-25 xl:py-10"
      >
        <div className="mx-auto min-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* <!-- Section Title Start --> */}

          <SectionHeader
            headerInfo={{
              title: "",
              subtitle: "Our Programmes ",
              description: `To enable children and adolescents globally to develop their natural talents and skill's and to create a productive generation that is empowered by ethics.`,
            }}
          />

          {/* <!-- Section Title End --> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7.5 xl:gap-12.5 mt-12.5 lg:mt-15 xl:mt-20">
            {/* <!-- Features item Start --> */}

            {featuresData.map((feature, key) => (
              <SingleFeature feature={feature} key={key} />
            ))}
            {/* <!-- Features item End --> */}
          </div>
        </div>
      </section>

      {/* <!-- ===== Features End ===== --> */}
    </>
  );
};

export default Feature;
