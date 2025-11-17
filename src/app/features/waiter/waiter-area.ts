import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-waiter-area',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    CardModule,
    DividerModule,
    RippleModule
  ],
  template: `
    <div class="min-h-screen bg-surface-50 dark:bg-surface-900">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-100 mb-2">
          Área de Mesero
        </h1>
        <p class="text-surface-600 dark:text-surface-400">
          Gestiona pedidos y mesas del restaurante
        </p>
      </div>

      <!-- Cards de funcionalidades -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Menú del Día -->
        <p-card class="cursor-pointer h-full hover:shadow-lg transition-all duration-200" [routerLink]="['/waiter/day-menu']">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="pi pi-list text-2xl text-primary-600 dark:text-primary-400"></i>
            </div>
            <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
              Menú del Día
            </h3>
            <p class="text-surface-600 dark:text-surface-400">
              Seleccionar menú del día actual
            </p>
          </div>
        </p-card>

        <!-- Productos -->
        <p-card class="cursor-pointer h-full hover:shadow-lg transition-all duration-200" [routerLink]="['/waiter/products']">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="pi pi-shopping-cart text-2xl text-green-600 dark:text-green-400"></i>
            </div>
            <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
              Productos
            </h3>
            <p class="text-surface-600 dark:text-surface-400">
              Seleccionar productos individuales
            </p>
          </div>
        </p-card>

        <!-- Órdenes Activas -->
        <p-card class="cursor-pointer h-full hover:shadow-lg transition-all duration-200">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="pi pi-clock text-2xl text-orange-600 dark:text-orange-400"></i>
            </div>
            <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
              Órdenes Activas
            </h3>
            <p class="text-surface-600 dark:text-surface-400">
              Gestionar pedidos en preparación
            </p>
          </div>
        </p-card>
      </div>

      <!-- Cuarta funcionalidad - Ver Mesas -->
      <div class="mt-6">
        <p-card class="cursor-pointer h-full hover:shadow-lg transition-all duration-200" [routerLink]="['/waiter/tables']">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="pi pi-table text-2xl text-blue-600 dark:text-blue-400"></i>
            </div>
            <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
              Ver Mesas
            </h3>
            <p class="text-surface-600 dark:text-surface-400">
              Estado de mesas ocupadas y disponibles
            </p>
          </div>
        </p-card>
      </div>

      <!-- Información rápida -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Estadísticas rápidas -->
        <p-card header="Resumen Rápido">
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-surface-600 dark:text-surface-400">Mesas ocupadas:</span>
              <span class="font-semibold text-surface-900 dark:text-surface-100">3/10</span>
            </div>
            <p-divider />
            <div class="flex justify-between items-center">
              <span class="text-surface-600 dark:text-surface-400">Órdenes activas:</span>
              <span class="font-semibold text-surface-900 dark:text-surface-100">5</span>
            </div>
            <p-divider />
            <div class="flex justify-between items-center">
              <span class="text-surface-600 dark:text-surface-400">Pedidos pendientes:</span>
              <span class="font-semibold text-surface-900 dark:text-surface-100">2</span>
            </div>
          </div>
        </p-card>

        <!-- Acciones rápidas -->
        <p-card header="Acciones Rápidas">
          <div class="space-y-3">
            <p-button
              label="Menú del Día"
              icon="pi pi-list"
              styleClass="w-full justify-start"
              [text]="true"
              [routerLink]="['/waiter/day-menu']">
            </p-button>
            <p-button
              label="Productos"
              icon="pi pi-shopping-cart"
              styleClass="w-full justify-start"
              [text]="true"
              [routerLink]="['/waiter/products']">
            </p-button>
            <p-button
              label="Ver Todas las Mesas"
              icon="pi pi-table"
              styleClass="w-full justify-start"
              [text]="true"
              [routerLink]="['/waiter/tables']">
            </p-button>
            <p-button
              label="Órdenes en Cocina"
              icon="pi pi-clock"
              styleClass="w-full justify-start"
              [text]="true">
            </p-button>
          </div>
        </p-card>
      </div>
    </div>
  `
})
export class WaiterArea {
}
