import React from "react";
import { Feature } from "@/types/feature";
import Image from "next/image";
import { motion } from "framer-motion";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, description } = feature;

  return (
    <>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -10,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="animate_top border border-white shadow-solid-3 rounded-lg p-7.5 xl:p-12.5 transition-all hover:shadow-solid-4 dark:hover:bg-hoverdark dark:border-strokedark dark:bg-blacksection z-40 bg-white"
      >
        <h4 className="font-semibold text-lg xl:text-lg text-meta dark:text-white mt-7.5 mb-5">
          {title}
        </h4>
        <div className="flex items-center justify-center  ">
          <Image src={icon} width={800} height={480} alt="title" />
        </div>

        <p className="font-semibold  pt-2">{description}</p>
      </motion.div>
    </>
  );
};

export default SingleFeature;
