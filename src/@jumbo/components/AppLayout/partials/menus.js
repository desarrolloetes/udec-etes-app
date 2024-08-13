import React from 'react';
import { PostAdd } from '@material-ui/icons';
import IntlMessages from '../../../utils/IntlMessages';
import {
  Settings,
  Person,
  Edit,
  EditAttributes,
  Search,
  House,
  CloudUpload,
  Inbox,
  AddToHomeScreen,
  Folder,
  LibraryBooks,
  Functions,
  Grain,
  PieChart,
  LibraryAdd,
  HomeWork,
} from '@material-ui/icons';

const homeMenu = {
  name: <IntlMessages id={'sidebar.appModule.homePage'} />,
  icon: <HomeWork />,
  link: '/',
};

const adminMenu = {
  name: <IntlMessages id={'sidebar.appModule.admin'} />,
  icon: <Settings />,
  type: 'collapse',
  children: [
    {
      name: <IntlMessages id={'sidebar.appModule.admin.users'} />,
      icon: <Person />,
      type: 'item',
      link: '/admin/users',
    },
    /*     {
      name: <IntlMessages id={'sidebar.appModule.admin.prototypeAdd'} />,
      icon: <EditAttributes />,
      type: 'item',
      link: '/admin/prototype-add',
    }, */
    {
      name: <IntlMessages id={'sidebar.appModule.admin.roles'} />,
      icon: <Search />,
      type: 'item',
      link: '/admin/roles',
    },
    {
      name: <IntlMessages id={'sidebar.appModule.admin.unidadesNegocio'} />,
      icon: <Search />,
      type: 'item',
      link: '/admin/businessUnits',
    },
    {
      name: <IntlMessages id={'sidebar.appModule.admin.purchaseArea'} />,
      icon: <Search />,
      type: 'item',
      link: '/admin/purchaseAreas',
    },
    {
      name: <IntlMessages id={'sidebar.appModule.admin.chargeAccount'} />,
      icon: <Search />,
      type: 'item',
      link: '/admin/chargeAccounts',
    },
    {
      name: <IntlMessages id={'sidebar.appModule.admin.major'} />,
      icon: <Search />,
      type: 'item',
      link: '/admin/majors',
    },
    {
      name: <IntlMessages id={'sidebar.appModule.admin.school'} />,
      icon: <Search />,
      type: 'item',
      link: '/admin/schools',
    },
    {
      name: <IntlMessages id={'sidebar.appModule.admin.items'} />,
      icon: <Search />,
      type: 'item',
      link: '/admin/items',
    },
  ],
};

const standarMenu = {
  name: <IntlMessages id={'sidebar.appModule.standard'} />,
  icon: <Edit />,
  type: 'collapse',
  children: [
    {
      name: <IntlMessages id={'sidebar.appModule.admin.standardEdit'} />,
      icon: <Edit />,
      type: 'item',
      link: '/standard/standards',
    },
    /*     {
      name: <IntlMessages id={'sidebar.appModule.standard.prototypeFacilities'} />,
      icon: <House />,
      type: 'item',
      link: '/standard/prototype-facilities',
    }, */
    /*     {
      name: <IntlMessages id={'sidebar.appModule.standard.standardSearch'} />,
      icon: <Search />,
      type: 'item',
      link: '/standard/standard-search',
    }, */
    {
      name: <IntlMessages id={'sidebar.appModule.standard.bulkUpload'} />,
      icon: <CloudUpload />,
      type: 'item',
      link: '/standard/bulk-upload',
    },
  ],
};

const reportsMenu = {
  name: <IntlMessages id={'sidebar.appModule.reports'} />,
  icon: <Inbox />,
  type: 'collapse',
  children: [
    {
      name: <IntlMessages id={'sidebar.appModule.reports.standardMajors'} />,
      icon: <AddToHomeScreen />,
      type: 'item',
      link: '/reports/standard-majors',
    },
    {
      name: <IntlMessages id={'sidebar.appModule.reports.standardPrototypeFacilities'} />,
      icon: <House />,
      type: 'item',
      link: '/reports/standard-prototype',
    },
    {
      name: <IntlMessages id={'sidebar.appModule.reports.equipmentMajor'} />,
      icon: <Folder />,
      type: 'item',
      link: '/reports/equipment-major',
    },
  ],
};

const bibliographicGapPlanMenu = {
  name: <IntlMessages id={'sidebar.appModule.bibliographicGapPlan'} />,
  icon: <LibraryBooks />,
  type: 'collapse',
  children: [
    {
      name: <IntlMessages id={'sidebar.appModule.bibliographicGapPlan.planningDataSourcesStock'} />,
      icon: <PieChart />,
      type: 'item',
      link: '/bibliographic/gap-source-stock',
    },
    {
      name: <IntlMessages id={'sidebar.appModule.bibliographicGapPlan.planningDataSourcesDemand'} />,
      icon: <PieChart />,
      type: 'item',
      link: '/bibliographic/gap-source-demand',
    },
    {
      name: <IntlMessages id={'sidebar.appModule.bibliographicGapPlan.planningDataSourcesStandard'} />,
      icon: <PieChart />,
      type: 'item',
      link: '/bibliographic/gap-source-standard',
    },
  ],
};

const bibliographicGapCalculoMenu = {
  name: <IntlMessages id={'sidebar.appModule.bibliographicGapCalculo'} />,
  icon: <LibraryBooks />,
  type: 'collapse',
  children: [
    {
      name: <IntlMessages id={'sidebar.appModule.bibliographicGapCalculo.calculatedGaps'} />,
      icon: <Functions />,
      type: 'item',
      link: '/bibliographic/gaps',
    },
  ],
};

const bookCoverageMenu = {
  name: <IntlMessages id={'sidebar.appModule.bookCoverage'} />,
  icon: <Inbox />,
  type: 'collapse',
  children: [
    {
      name: <IntlMessages id={'sidebar.appModule.reports.bookCoverage'} />,
      icon: <AddToHomeScreen />,
      type: 'item',
      link: '/reports/book-coverage',
    },
  ],
};

/* export const sidebarNavs = [
  {
    name: <IntlMessages id={'sidebar.modules'} />,
    type: 'section',
    children: [
      homeMenu,
      adminMenu,
      standarMenu,
      reportsMenu,
      bibliographicGapPlanMenu,
      bibliographicGapCalculoMenu,
      bookCoverageMenu,
    ],
  },
]; */

export const horizontalDefaultNavs = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/sample-page',
      },
    ],
  },
];

export const minimalHorizontalMenus = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/sample-page',
      },
    ],
  },
];
export const sidebarNavs = authUser => {
  //const { authUser } = useSelector(({ auth }) => auth);
  const children = [];
  children.push(homeMenu);

  if (authUser !== null) {
    var roles = JSON.parse(authUser.roles);
    roles.sort((a, b) => a.role_order - b.role_order);
    for (let i = 0; i < roles.length; i++) {
      switch (roles[i].role_name) {
        case 'ROLE_ADMIN': {
          // ADMINISTRADOR ETES
          children.push(adminMenu);
          break;
        }
        case 'SSTD_ADMIN': {
          // ADMINISTRADOR DE ESTANDARES
          children.push(standarMenu);
          break;
        }
        case 'GAPB_USER': {
          // USUARIO BRECHA BIBLIOTECA
          children.push(bibliographicGapPlanMenu);
          children.push(bibliographicGapCalculoMenu);
          break;
        }
        case 'REPO_USER': {
          // USUARIO BIBLIOTECA
          children.push(reportsMenu);
          children.push(bookCoverageMenu);
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  return [
    {
      name: <IntlMessages id={'sidebar.modules'} />,
      type: 'section',
      children: children,
    },
  ];
};
