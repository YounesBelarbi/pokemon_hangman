import { NavLink } from "react-router-dom";
interface NavItemProps {
  route: string;
  label: string;
}

const NavItem = ({ route, label }: NavItemProps) => {
  return (
    <NavLink
      to={route}
      className={(isActive) =>
        "flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 " +
        (isActive
          ? " focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
          : "")
      }
    >
      {label}
    </NavLink>
  );
};

export default NavItem;
