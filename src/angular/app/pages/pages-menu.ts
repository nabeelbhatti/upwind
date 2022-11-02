import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Clients',
    icon: 'home-outline',
    link: '/pages/',
    home: true,
    children: [
      {
        title: 'Fleet Standard Doc',
        icon: 'home-outline',
        link: '/pages/fsd',
        home: true,
      }
    ]
  },
  {
    title: 'Projects',
    icon: 'home-outline',
    link: '/pages/',
    home: true,
    children: [
      {
        title: 'Project Overview',
        icon: 'home-outline',
        link: '/pages/project-overview',
        home: true,
      },
      {
        title: 'Vessel Information',
        icon: 'home-outline',
        link: '/pages/vessel-information',
        home: true,
      },
      {
        title: 'Source Manual',
        icon: 'home-outline',
        link: '/pages/source-manual',
        home: true,
      },
      {
        title: 'Machinery Particular',
        icon: 'home-outline',
        link: '/pages/machinery-particular',
        home: true,
      },
      {
        title: 'Manual Index',
        icon: 'home-outline',
        link: '/pages/manual-index',
        home: true,
      }
    ]
  },
  {
    title: 'Libraries',
    icon: 'home-outline',
    link: '/pages/libraries',
    home: true,
    children: [{
      title: 'General Libraries',
      icon: 'home-outline',
      link: '/pages/libraries/general-libraries'
    }]
  },
  {
    title: 'Repository',
    icon: 'home-outline',
    link: '/pages/',
    home: true,
  },
  {
    title: 'Library types',
    icon: 'home-outline',
    link: '/pages/librarytypes',
    home: true,
  },
  {
    title: 'Reports',
    icon: 'home-outline',
    link: '/pages/',
    home: true,
    children: [
     
     
      {
        title: 'Screening Report',
        icon: 'home-outline',
        link: '/pages/screening-report',
        home: true,
      }
    ]
  },
  {
    title: 'Settings',
    icon: 'home-outline',
    link: '/pages/',
    home: true,
  },
];
