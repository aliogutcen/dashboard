'use client';

import { LayoutDashboard, ChevronRight, ChevronDown, Settings, Users, FileText, Box } from 'lucide-react';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { usePathname } from 'next/navigation';

interface Company {
  id: number;
  name: string;
  logo: string;
}

interface SubItem {
  id: number;
  item: string;
  link: string;
}

interface SidebarItem {
  id: number;
  item: string;
  icon: React.ReactNode;
  link?: string;
  subItems?: SubItem[];
}

interface SidebarProps {
  isOpen: boolean;
}

const companies: Company[] = [
  { id: 1, name: 'Acme Corp.', logo: '🏢' },
  { id: 2, name: 'Startup Inc.', logo: '🚀' },
  { id: 3, name: 'Tech Labs', logo: '⚡' },
];

const sidebarItems: SidebarItem[] = [
  {
    id: 1,
    item: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
    link: '/dashboard'
  },
  {
    id: 2,
    item: 'Kullanıcılar',
    icon: <Users size={20} />,
    subItems: [
      { id: 1, item: 'Tüm Kullanıcılar', link: '/users' },
      { id: 2, item: 'Roller', link: '/roles' },
      { id: 3, item: 'İzinler', link: '/permissions' },
    ],
  },
  {
    id: 3,
    item: 'Dökümanlar',
    icon: <FileText size={20} />,
    link: '/documents'
  },
  {
    id: 4,
    item: 'Ürünler',
    icon: <Box size={20} />,
    subItems: [
      { id: 4, item: 'Tüm Ürünler', link: '/products' },
      { id: 5, item: 'Kategoriler', link: '/categories' },
      { id: 6, item: 'Stok', link: '/inventory' },
    ],
  },
  {
    id: 5,
    item: 'Ayarlar',
    icon: <Settings size={20} />,
    link: '/settings'
  },
];

const Sidebar: FC<SidebarProps> = ({ isOpen }) => {
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company>(companies[0]);
  const pathname = usePathname();

  const handleToggleSubItems = (id: number): void => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const handleCompanySelect = (company: Company): void => {
    setSelectedCompany(company);
    setIsCompanyDropdownOpen(false);
  };

  const isLinkActive = (link: string): boolean => {
    return pathname === link;
  };

  return (
    <aside className={`sidebar ${!isOpen ? 'closed' : 'open'}`}>
      <div className="company-selector">
        <button 
          className="company-button"
          onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
          aria-expanded={isCompanyDropdownOpen}
          aria-label="Şirket seçici"
        >
          <div className="company-info">
            <span className="company-icon">
              {selectedCompany.logo}
            </span>
            {isOpen && (
              <span className="company-name">{selectedCompany.name}</span>
            )}
          </div>
          {isOpen && (
            <ChevronDown 
              size={16}
              className={`dropdown-arrow ${isCompanyDropdownOpen ? 'rotate' : ''}`}
              aria-hidden="true"
            />
          )}
        </button>
        {isCompanyDropdownOpen && isOpen && (
          <div className="company-dropdown">
            {companies.map((company) => (
              <button
                key={company.id}
                className={`company-option ${selectedCompany.id === company.id ? 'active' : ''}`}
                onClick={() => handleCompanySelect(company)}
              >
                <span className="company-logo">{company.logo}</span>
                <span className="company-name">{company.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <nav className="sidebar-nav">
        {sidebarItems.map((item) => (
          <div key={item.id} className="nav-item">
            {item.link ? (
              <Link 
                href={item.link}
                className={`nav-link ${isLinkActive(item.link) ? 'active' : ''}`}
              >
                <span className="icon">{item.icon}</span>
                {isOpen && <span>{item.item}</span>}
              </Link>
            ) : (
              <>
                <button
                  className={`nav-link ${openSection === item.id ? 'active' : ''}`}
                  onClick={() => handleToggleSubItems(item.id)}
                >
                  <span className="icon">{item.icon}</span>
                  {isOpen && (
                    <>
                      <span>{item.item}</span>
                      <ChevronRight
                        size={16}
                        className={`arrow ${openSection === item.id ? 'rotate' : ''}`}
                      />
                    </>
                  )}
                </button>
                {isOpen && openSection === item.id && item.subItems && (
                  <div className="sub-items">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.id}
                        href={subItem.link}
                        className={`sub-link ${isLinkActive(subItem.link) ? 'active' : ''}`}
                      >
                        {subItem.item}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export { Sidebar };
