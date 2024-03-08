import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },

  //   {
  //   id: 2.1,
  //   title: "Blog",
  //   newTab: false,
  //   path: "/blog",
  //   },

  //   {
  //     id: 2.3,
  //     title: "Docs",
  //     newTab: false,
  //     path: "/docs",
  //   },

  {
    id: 37,
    title: "About Us",
    newTab: false,
    path: "/",
  },

  //   {
  //     id: 2,
  //     title: "Camp Life",
  //     newTab: false,
  //     path: "/#features",
  //     submenu: [
  //       {
  //         id: 2.1,
  //         title: "Fun Activities",
  //         newTab: false,
  //         path: " ",
  //       },
  //       {
  //         id: 2.2,
  //         title: "Programmes snd Schedule",
  //         newTab: false,
  //         path: " ",
  //       },
  //       {
  //         id: 2.3,
  //         title: "Packing List",
  //         newTab: false,
  //         path: " ",
  //       },
  //       {
  //         id: 2.4,
  //         title: "Leadership and Training",
  //         newTab: false,
  //         path: " ",
  //       },
  //       {
  //         id: 2.5,
  //         title: "Work Crew",
  //         newTab: false,
  //         path: " ",
  //       },
  //     ],
  //   },
  {
    id: 35.2,
    title: "FAQ's",
    newTab: false,
    path: "",
  },
  {
    id: 3,
    title: "Join Us",
    newTab: false,
    path: "",
    submenu: [
      {
        id: 3.1,
        title: "Register for Day Camp",
        newTab: false,
        path: "/enroll",
      },
      {
        id: 3.2,
        title: "Membership",
        newTab: false,
        path: "/auth/signin",
      },
      {
        id: 3.3,
        title: "Volunteer",
        newTab: false,
        path: "/volunteersForm",
      },
      {
        id: 3.4,
        title: "Careers",
        newTab: false,
        path: "/applicationform",
      },
      {
        id: 3.5,
        title: "Forms/Docs",
        newTab: false,
        path: "/error",
      },

      {
        id: 3.6,
        title: "Sign In",
        newTab: false,
        path: "/auth/signin",
      },
      {
        id: 3.7,
        title: "Sign Out",
        newTab: false,
        path: "/signout",
      },
    ],
  },
  {
    id: 4,
    title: "Gallery",
    newTab: false,
    path: "/",
  },
  {
    id: 5,
    title: "Contact",
    newTab: false,
    path: "/support",
  },

  {
    id: 35,
    title: "Sign Up",
    newTab: false,
    path: "/auth/signup",
  },

  {
    id: 36,
    title: "Profile",
    newTab: false,
    path: "/profile",
  },

  // {
  //   id: 37,
  //   title: "Admin",
  //   newTab: false,
  //   path: "/admin",
  // },
  // {
  //   id: 4,
  //   title: "Dashboard",
  //   newTab: false,
  //   path: "",
  //   submenu: [
  //     {
  //       id: 4.1,
  //       title: "Volunteers",
  //       newTab: false,
  //       path: "/volunteers",
  //     },
  //     {
  //       id: 4.2,
  //       title: "Counsolers",
  //       newTab: false,
  //       path: "/applicants",
  //     },
  //     {
  //       id: 4.3,
  //       title: "Parents",
  //       newTab: false,
  //       path: "/users",
  //     },
  //     {
  //       id: 4.3,
  //       title: "Employees",
  //       newTab: false,
  //       path: "/employees",
  //       // submenu: [
  //       //   {
  //       //     id: 4.1,
  //       //     title: "Create",
  //       //     newTab: false,
  //       //     path: "/createEmployees",
  //       //   },
  //       // ],
  //     },
  //     {
  //       id: 4.5,
  //       title: "Donations",
  //       newTab: false,
  //       path: "/donation",
  //     },
  //     {
  //       id: 4.6,
  //       title: "Sign Out",
  //       newTab: false,
  //       path: "/signout",
  //     },
  //   ],
  // },
];

export default menuData;
