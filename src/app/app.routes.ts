import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth-guard';
import { ProductCreationForm } from '@features/admin/creation/product-creation-form';
import { Login } from '@areas/login/login-area';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login,
  },
  {
    path: 'admin',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'create-product',
        component: ProductCreationForm,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
