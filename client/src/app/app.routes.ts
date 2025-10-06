import { Routes } from '@angular/router';
import { Header } from './components/header/header';
import { InputText } from './components/input-text/input-text';
import { LoginForm } from './authentication/login-form';
import { AuthGuard } from './routing/guards/auth-guard';
import { ProductCreationForm } from './products/creation/product-creation-form';

export const routes: Routes = [
  {
    path: '',
    component: InputText,
  },
  {
    path: 'app',
    component: Header,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginForm,
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
];
