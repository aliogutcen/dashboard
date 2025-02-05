import Header from '@/components/header/Header';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
 
  return (
    <div className="dashboard-layout-container">
      <Sidebar />
      <Header/>
      <div className='main-container'>{children}</div>
    </div>
  );
};

export default DashboardLayout;
