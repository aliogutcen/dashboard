'use client';
import {Menu} from "lucide-react"

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header = ({isSidebarOpen, toggleSidebar }: HeaderProps) => {
  console.log(isSidebarOpen)
  return (
   
   <header className={`header ${isSidebarOpen ? "shifted" : ""}`}>
   <button className="menu-button" onClick={toggleSidebar}>
    <Menu />
    </button>
    <h1>Dashboard</h1>
    </header>
   
 
  );
};

export default Header;
