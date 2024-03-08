import React from "react";
import styles from "./sidebar.module.css";
// import { MdDashboard, MdSupervisedUserCircle } from "react-icons/md";
import { MenuLink } from "./MenuLink/MenuLink";
import Image from "next/image";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        // icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/users",
        // icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Applicants",
        path: "/applicants",
        // icon: <MdDashboard />,
      },
    ],
  },
  {
    title: "Camp staff",
    list: [
      {
        title: "Staff",
        path: "dashboard/staff",
        // icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Work Time",
        path: "/dashboard/transactions",
        // icon: <MdDashboard />,
      },
      {
        title: "Teams",
        path: "/dashboard/teams",
        // icon: <MdDashboard />,
      },
    ],
  },
  {
    title: "Inventory ",
    list: [
      {
        title: "Applicants",
        path: "/dashboard/applicants",
        // icon: <MdDashboard />,
      },
      {
        title: "Staff",
        path: "dashboard/staff",
        // icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Teams",
        path: "/dashboard/teams",
        // icon: <MdDashboard />,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userimage}
          src={"/avatar.jpg"}
          alt=""
          width={"50"}
          height={"50"}
        />
        <div className={styles.userdetails}>
          <span className={styles.username}>John Doe</span>
          <span className={styles.usertitle}>HR Head</span>
        </div>
      </div>
      <ul className="styles.list">
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}> {cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
