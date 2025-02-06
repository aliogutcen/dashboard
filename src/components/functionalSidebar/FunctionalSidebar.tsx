'use client';
import { useState } from 'react';
import Header from '../header/Header';
import { Sidebar } from '../sidebar/Sidebar';

const FunctionalSidebar = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <div className={`dashboard-layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>

        <Header
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        
        <Sidebar isOpen={isSidebarOpen}   />
        <main className="dashboard-content">{children}</main>
      </div>
    </>
  );
};

export { FunctionalSidebar };
