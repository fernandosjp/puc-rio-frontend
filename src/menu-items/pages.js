// assets
import { PlusCircleOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  PlusCircleOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'expenses',
  title: 'Expenses',
  type: 'group',
  children: [
    {
      id: 'add-expenses',
      title: 'Add Expense',
      type: 'item',
      url: '/add-expenses',
      icon: icons.PlusCircleOutlined
    },
    {
      id: 'expenses',
      title: 'Expenses History',
      type: 'item',
      url: '/expenses',
      icon: icons.ProfileOutlined
    }
  ]
};

export default pages;
