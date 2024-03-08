"use client";
import React from "react";
import Link from "next/link";
import styles from "./menulink.module.css";
import { usePathname } from "next/navigation";
export const MenuLink = ({ item }: any) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Link
      href={item.path}
      className={`${styles.container} ${
        pathname === item.path && styles.active
      }`}
    >
      {item.icon}
      {item.title}
    </Link>
  );
};
