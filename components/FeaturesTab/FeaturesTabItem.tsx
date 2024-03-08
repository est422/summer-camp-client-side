import React from "react";
import { FeatureTab } from "@/types/featureTab";
import Image from "next/image";

const FeaturesTabItem = ({ featureTab }: { featureTab: FeatureTab }) => {
  const { title, desc1, desc2, desc3, desc4, image, imageDark } = featureTab;

  return (
    <>
      <div className="flex items-center gap-8 lg:gap-19">
        <div className="md:w-1/2">
          <h3 className="text-black dark:text-white text-xl xl:text-2xl font-bold mb-7">
            {title}
          </h3>
          <ul className="flex-col">
            <li className="mb-5">{desc1}</li>
            <li className="mb-5">{desc2}</li>
            <li className="mb-5">{desc3}</li>
            <li className="w-11/12">{desc4}</li>
          </ul>
        </div>
        <div className="hidden md:block md:w-1/2 relative mx-auto aspect-[562/366] max-w-[550px]">
          <Image src={image} alt={title} fill className="dark:hidden" />
          <Image
            src={imageDark}
            alt={title}
            fill
            className="hidden dark:block"
          />
        </div>
      </div>
    </>
  );
};

export default FeaturesTabItem;
