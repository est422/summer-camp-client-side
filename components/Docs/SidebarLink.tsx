"use client";
import Link from "next/link";

const SidebarLink = () => {
  return (
    <>
      <li className="block ">
        <Link
          href={`/docs`}
          className={`text-base py-2 px-3 rounded-sm flex w-full bg-stroke text-black dark:text-white dark:bg-blackho`}
        >
          Our Vision
        </Link>
        <Link
          href={`/docs`}
          className={`text-base py-2 px-3 rounded-sm flex w-full text-black dark:text-white `}
        >
          Our Mission
        </Link>
        <Link
          href={`/docs`}
          className={`text-base py-2 px-3 rounded-sm flex w-full text-black dark:text-white `}
        >
          Counselors
        </Link>
        <Link
          href={`/docs`}
          className={`text-base py-2 px-3 rounded-sm flex w-full text-black dark:text-white `}
        >
          Staff
        </Link>
      </li>
    </>
  );
};

export default SidebarLink;
