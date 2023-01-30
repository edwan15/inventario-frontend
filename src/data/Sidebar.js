import { RxDashboard } from "react-icons/rx";
import { AiFillFileAdd } from "react-icons/ai";
import { MdManageAccounts, MdOutlineSupportAgent } from "react-icons/md";

const Menu = [
  {
    title: "Panel",
    icon: <RxDashboard />,
    path: "/panel",
  },
  {
    title: "Product+",
    icon: <AiFillFileAdd />,
    path: "/add-product",
  },
  {
    title: "Cuenta",
    icon: <MdManageAccounts />,
    childrens: [
      {
        title: "profile",
        path: "/profile",
      },
      {
        title: "Editar Perfil",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Soporte",
    icon: <MdOutlineSupportAgent />,
    path: "/contact-us",
  },
];

export default Menu
