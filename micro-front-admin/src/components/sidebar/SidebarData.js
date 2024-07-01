import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Voitures',
    path: '/cars',
    icon: <FaIcons.FaCar />,
    cName: 'nav-text'
  },
  {
    title: 'Utilisateurs',
    path: '/users',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Reservations',
    path: '/reservations',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Ajouter admin',
    path: '/addadmin',
    icon: <IoIcons.IoIosAddCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Deconnexion',
    path: '/',
    icon: <IoIcons.IoMdLogOut/>,
    cName: 'nav-text'
  }
];