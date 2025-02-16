'use client';

import { FC, ReactNode, useState } from 'react';
import { Sidebar } from '../sidebar/Sidebar';
import { Header } from '../header/Header';

interface FunctionalSidebarProps {
  children: ReactNode;
}

const FunctionalSidebar: FC<FunctionalSidebarProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout-container">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`content-wrapper ${!isSidebarOpen ? 'sidebar-closed' : ''} ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export { FunctionalSidebar };
