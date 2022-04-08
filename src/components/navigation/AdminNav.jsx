import SiderBarLayout from "../layouts/SideBarLayout";
import { IoApps } from "react-icons/io5";

const menu = [
  {
    title: "Dashboard",
    link: "/admin/dashboard",
    icon: <IoApps />,
    size: 0,
  },
  {
    title: "Stores",
    link: "/admin/stores",
    icon: <IoApps />,
    size: 1,
  },
  {
    title: "Products",
    link: "/admin/products",
    icon: <IoApps />,
    size: 7,
  },

  {
    title: "Category",
    link: "/admin/category",
    icon: <IoApps />,
    size: 5,
  },
  {
    title: "Sub Category",
    link: "/admin/subcategory",
    icon: <IoApps />,
    size: 7,
  },
  {
    title: "Coupons",
    link: "/admin/dashboard",
    icon: <IoApps />,
    size: 0,
  },
];

const AdminNav = () => {
  return <SiderBarLayout menu={menu} />;
};

export default AdminNav;
