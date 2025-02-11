'use client';

import { AudioLines, LayoutDashboard, Settings } from 'lucide-react';
import Link from 'next/link';
import React, { FC, useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
}

const sidebarItem = [
  {
    id: 1,
    item: 'Dashboard',
    icon: <LayoutDashboard />,
    subItems: [
      { id: 4, item: 'Overview', link: '/overview' },
      { id: 5, item: 'Analytics', link: '/' },
    ],
  },
  {
    id: 2,
    item: 'PlayGround',
    icon: <AudioLines />,
    subItems: [
      { id: 6, item: 'number', link: '/number' },
      { id: 7, item: 'email', link: '/email' },
    ],
  },
  {
    id: 3,
    item: 'Settings',
    icon: <Settings />,
    subItems: [
      { id: 8, item: 'Profile', link: '/settings/profile' },
      { id: 9, item: 'Security', link: '/settings/security' },
    ],
  },
];

const Sidebar: FC<SidebarProps> = ({ isOpen }) => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const handleToggleSubItems = (id: number) => {
    // Toggle the sub-items of the clicked section
    setOpenSection((prev) => (prev === id ? null : id));
  };
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <aside>
        <nav>
          <ul>
            {sidebarItem.map((section) => (
              <li key={section.id} onClick={() => handleToggleSubItems(section.id)}>
                <div className="span-div">
                  <span className="icon-span">{section.icon}</span>
                  <span className="item-span">{section.item}</span>
                </div>
                {openSection === section.id && (
                  <ul>
                    {section.subItems.map((subItem) => (
                      <li key={subItem.id}>
                        <Link href={subItem.link}>{subItem.item}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export { Sidebar };
