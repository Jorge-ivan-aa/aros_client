import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth-guard';
import { RoleGuard } from '@core/guards/role-guard';
import { RedirectGuard } from '@app/core/guards/redirect-guard';
import { ProductCreationForm } from '@features/admin/creation/product-creation-form';
import { Dashboard } from '@features/admin/dashboard/dashboard';
import { Orders } from '@features/admin/orders/orders';
import { Manage } from '@features/admin/manage/manage';
import { Products } from '@features/admin/manage/products/products';
import { Menu } from '@features/admin/manage/menu/menu';
import { Categories } from '@features/admin/manage/categories/categories';
import { Tables } from '@features/admin/manage/tables/tables';
import { Analytics } from '@features/admin/analytics/analytics';
import { Login } from '@areas/login/login-area';
import { AdminArea } from '@areas/admin/admin-area';
import { WorkerArea } from '@areas/worker/worker-area';
import { Users } from './features/admin/manage/users/users';


export const routes: Routes = [

  {
    path: 'login',
    component: Login,
    canActivate: [RedirectGuard],
  },
  {
    path: 'admin',
    component: AdminArea,
    canActivate: [AuthGuard, RoleGuard],
    children: [
      {
        path: '',
        component: Dashboard,
      },
      {
        path: 'orders',
        component: Orders,
      },
      {
        path: 'manage',
        component: Manage,
        children: [
          {
            path: 'products',
            component: Products,
          },
          {
            path: 'categories',
            component: Categories,
          },
          {
            path: 'tables',
            component: Tables,
          },
          {
            path: 'menu',
            component: Menu,
          },
              {
                path: 'orders-create',
                loadComponent: () => import('./features/orders-create/order-creation-form').then(m => m.OrderCreationForm),
              },
          {
            path: 'users',
            component: Users,
          },
        ]
      },
      {
        path: 'analytics',
        component: Analytics,
      },
      {
        path: 'create-product',
        component: ProductCreationForm,
      },
    ],
  },

  {
    path: 'worker',
    component: WorkerArea,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: '**',
    redirectTo: '/login'

  }
];
