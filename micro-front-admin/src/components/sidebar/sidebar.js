import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Sidebar.css';
import { IconContext } from 'react-icons';

function Sidebar() {
  const [sidebar, ] = useState(true); // Afficher la barre latérale par défaut

  return (
    <>
  <IconContext.Provider value={{ color: '#fff' }}>
    <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
      <ul className='nav-menu-items'>
        {SidebarData.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
              {item.subNav && 
                <ul className='dropdown-menu'>
                  {item.subNav.map((subItem, subIndex) => {
                    return (
                      <li key={subIndex}>
                        <Link className='dropdown-item' to={subItem.path}>
                          {subItem.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              }
            </li>
          );
        })}
      </ul>
    </div>
  </IconContext.Provider>
</>


  );
}

export default Sidebar;
