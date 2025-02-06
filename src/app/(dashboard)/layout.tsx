import { ReactNode } from 'react';

import { FunctionalSidebar } from '@/components/functionalSidebar/FunctionalSidebar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="dashboard-layout-container">
      <FunctionalSidebar children={children}/>
    </div>
  );
};

export default DashboardLayout;
