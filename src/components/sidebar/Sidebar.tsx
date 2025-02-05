'use client'


import React, { useState } from 'react'

const sidebarItem = [
    {
        item: 'Dashboard',
        icon: 'dashboard',
        subItems: [
            { item: 'Overview', link: '/dashboard/overview' },
            { item: 'Analytics', link: '/dashboard/analytics' },
        ],
    },
    {
        item: 'Settings',
        icon: 'settings',
        subItems: [
            { item: 'Profile', link: '/settings/profile' },
            { item: 'Security', link: '/settings/security' },
        ],
    },
];


const Sidebar = () => {

    const [visibleSubList, setVisibleSubList] = useState<string | null>(null);

    const handleToggleSubList = (itemName: string) => {
        setVisibleSubList(prevState => (prevState === itemName ? null : itemName));
    }
    
 
  return (
    <div className='sidebar-container'>
    <aside>
        <div className='sidebar-header'>
            <p>Acme Inc</p>
        </div>
        <nav className='sidebar-nav'>
            {sidebarItem.map((item, index) => (
                <div key={index}>
                    <button
                        onClick={() => item.subItems && handleToggleSubList(item.item)}
                        className="sidebar-item"
                        aria-expanded={visibleSubList === item.item ? "true" : "false"}
                    >
                        {item.icon && <i className={`icon-${item.icon}`}></i>}
                        {item.item}
                    </button>
                    {item.subItems && visibleSubList === item.item && (
                        <div className="sub-list">
                            {item.subItems.map((subItem, subIndex) => (
                                <a key={subIndex} href={subItem.link} className="sub-list-item">
                                    {subItem.item}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </nav>
    </aside>
</div>
  )
}

export  {Sidebar}