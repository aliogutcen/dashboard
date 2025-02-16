'use client';

import { Menu, Bell, Settings, Search } from 'lucide-react';
import { FC } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isMobile?: boolean;
}

const Header: FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);
  const currentPath = paths[paths.length - 1] || 'Dashboard';

  return (
    <header className={`header ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="header-container">
        <div className="left-content">
          <button 
            className="menu-button"
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? 'Kenar çubuğunu kapat' : 'Kenar çubuğunu aç'}
          >
            <Menu size={20} />
          </button>
          <div className="breadcrumb">
            <span>{currentPath}</span>
          </div>
        </div>
        <div className="right-content">
          <div className="search-container">
            <div className="search-wrapper">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Ara..." 
                className="search-input"
              />
            </div>
          </div>
          <button className="action-button" aria-label="Bildirimler">
            <Bell size={20} />
          </button>
          <button className="action-button" aria-label="Ayarlar">
            <Settings size={20} />
          </button>
          <button className="profile-button" aria-label="Profil">
            <Image
              width={32}
              height={32}
              quality={80}
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="profile-image"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export { Header };
