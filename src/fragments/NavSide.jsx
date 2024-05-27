import NavbarFragment from "./Navbar";
import SidebarFragment from "./Sidebar";

const NavSideFragment = ({ children }) => {
  return (
    <div className="relative bg-zinc-800 h-full">
      <NavbarFragment />
      <SidebarFragment />
      <div className="ml-16 grid grid-cols-4 gap-4">{children}</div>
    </div>
  );
};

export default NavSideFragment;
