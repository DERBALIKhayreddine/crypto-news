import { Navigation } from 'src/app/@theme/types/navigation';

export const menus: Navigation[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Dashboard',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard',
        icon: '#custom-status-up'
      }
    ]
  },
  {
    id: 'other',
    title: 'Crypto currency',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id:'crypto',
        title:'Crypto Coins',
        type:'item',
        classes:'nav-item',
        url:'/crypto/allcoins',
        icon: '#custom-status-up'

      },
      {
        id:'allarticles',
        title:'All Articles',
        type:'item',
        classes:'nav-item',
        url:'/articles/allarticles',
        icon: '#custom-status-up'
      },
      {
        id: 'sample-page',
        title: 'Published Articles',
        type: 'item',
        classes: 'nav-item',
        url: '/sample-page',
        icon: '#custom-notification-status'
      }
    ]
  }
];
