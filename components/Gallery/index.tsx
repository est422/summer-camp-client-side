import Image from "next/image";
import React from "react";

const Gallery = () => {
  return (
    <div className="h-120 mt-24 p-4">
      <section className="bg-lightmeta text-blackho m-12">Gallery</section>
      <div className="sm:flex-col lg:flex-row from-alt3 ">
        {/* <div className="w-auto border-l-alt1">
          <Image
            src={"/images/camp/full-height-lineup-lg.jpg"}
            width={400}
            height={480}
            alt="title"
          ></Image>
        </div>
        <div className="w-auto border-l-alt1">
          <Image
            src={"/images/features/features-light-01.png"}
            width={400}
            height={480}
            alt="title"
          ></Image>
        </div>
        <div className="w-auto border-l-alt1">
          <Image
            src={"/images/features/features-light-01.png"}
            width={800}
            height={480}
            alt="title"
          ></Image>
        </div> */}
      </div>
    </div>
  );
};

export default Gallery;
