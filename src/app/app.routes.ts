import { Routes } from '@angular/router';
import { Header } from './components/header/header';
import { InputText } from './components/input-text/input-text';
import { AuthGuard } from './routing/guards/auth-guard';
import { ProductCreationForm } from './components/creation/product-creation-form';
import { Login } from './pages/login/login';

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
];
