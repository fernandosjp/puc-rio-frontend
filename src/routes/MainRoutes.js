import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - pages
const AddExpense = Loadable(lazy(() => import('pages/expense-add/expense-add')));
const EditExpense = Loadable(lazy(() => import('pages/expense-edit/expense-edit')));
const Expenses = Loadable(lazy(() => import('pages/expenses-history/index')));

// render - support
const Documentation = Loadable(lazy(() => import('pages/Documentation')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'expenses',
      element: <Expenses />
    },
    {
      path: 'add-expenses',
      element: <AddExpense />
    },
    {
      path: 'edit-expenses',
      element: <EditExpense />
    },
    {
      path: 'documentation',
      element: <Documentation />
    }
  ]
};

export default MainRoutes;
