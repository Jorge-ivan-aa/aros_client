import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { OrderService } from '@core/services/orders/order-service';
import { CreateOrderRequest } from '@app/shared/models/dto/orders/create-order-request.model';
import { MessageService } from 'primeng/api';
import { ProductService } from '@core/services/products/product-service';
import { ProductListResponse } from '@app/shared/models/dto/products/product-list-response.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoggingService } from '@app/core/services/logging/logging-service';

@Component({
  selector: 'app-order-creation-form',
  templateUrl: './order-creation-form.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class OrderCreationForm implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private orderService = inject(OrderService);
  private messageService = inject(MessageService);
  private productService = inject(ProductService);
  private destroyRef = inject(DestroyRef);
  private loggingService = inject(LoggingService);

  title = 'Crear pedido';
  description = 'Registra un nuevo pedido indicando la mesa y los productos para cada orden de cliente.';

  form: FormGroup = this.fb.group({
    table: new FormControl<number | null>(null, { nonNullable: false, validators: [Validators.required, Validators.min(1)] }),
    clientOrders: this.fb.array([this.createClientOrderGroup()])
  });

  products: ProductListResponse[] = [];
  productsLoading = false;
  get isSubmitDisabled(): boolean {
    return this.form.invalid || this.productsLoading;
  }

  get clientOrders(): FormArray<FormGroup> {
    return this.form.get('clientOrders') as FormArray<FormGroup>;
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  createClientOrderGroup(): FormGroup {
    return this.fb.group({
      details: this.fb.array([this.createDetailGroup()])
    });
  }

  createDetailGroup(): FormGroup {
    return this.fb.group({
      product: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
      quantity: new FormControl<number>(1, [Validators.required, Validators.min(1)]),
      observations: new FormControl<string>('', []),
      subProducts: new FormControl<string>('', []) // comma-separated ids
    });
  }

  detailsAt(index: number): FormArray<FormGroup> {
    return (this.clientOrders.at(index).get('details') as FormArray<FormGroup>);
  }

  addClientOrder(): void {
    this.clientOrders.push(this.createClientOrderGroup());
  }

  removeClientOrder(index: number): void {
    if (this.clientOrders.length > 1) {
      this.clientOrders.removeAt(index);
    }
  }

  addDetail(clientIndex: number): void {
    this.detailsAt(clientIndex).push(this.createDetailGroup());
  }

  removeDetail(clientIndex: number, detailIndex: number): void {
    const details = this.detailsAt(clientIndex);
    if (details.length > 1) {
      details.removeAt(detailIndex);
    }
  }

  submit(): void {
    this.loggingService.debug('OrderCreationForm.submit called');
    this.loggingService.debug('Form status', this.form.status);
    this.loggingService.debug('Form value', this.form.getRawValue());
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.loggingService.warn('OrderCreationForm.submit aborted: form invalid', this.form.errors);
      return;
    }

  interface DetailFormValue { product: number | null; quantity: number; observations: string; subProducts: string }
  interface ClientOrderFormValue { details: DetailFormValue[] }

    const raw = this.form.getRawValue() as { table: number | null; clientOrders: ClientOrderFormValue[] };

    // HARDCODED: Using user with document '1001' (Carlos Gómez) as responsible
    // TODO: Get responsible from authenticated user or allow selection
    const request: CreateOrderRequest = {
      table: Number(raw.table),
      responsible: '1001',  // ⚠️ HARDCODED - User exists in database
      clientOrders: raw.clientOrders.map((co) => ({
        details: co.details.map((d) => {
          const parsedSubProducts = (d.subProducts)
            ? (d.subProducts)
                .split(',')
                .map(s => s.trim())
                .filter(s => s.length > 0 && !isNaN(Number(s)))
                .map(n => Number(n))
            : [];

          const trimmedObservations = d.observations?.trim();

          return {
            product: Number(d.product),
            quantity: Number(d.quantity) || 1,
            observations: trimmedObservations ?? '',
            subProducts: parsedSubProducts,
          };
        })
      }))
    };
    this.loggingService.debug('CreateOrder request payload', request);

    this.orderService.createOrder(request).subscribe({
      next: () => {
        this.loggingService.info('CreateOrder success');
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Pedido creado correctamente.' });
        this.router.navigate(['/admin/orders']);
      },
      error: (err) => {
        this.loggingService.error('CreateOrder failed', err);
        let backendMsg = (err && err.error && (err.error.message || err.error.error || err.message)) || 'No se pudo crear el pedido.';
        // Try to surface validation errors if present
        const validation = err?.error?.errors;
        if (validation) {
          if (Array.isArray(validation)) {
            backendMsg += ' - ' + validation.join(', ');
          } else if (typeof validation === 'object') {
            const parts = Object.entries(validation).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`);
            backendMsg += ' - ' + parts.join('; ');
          }
        }
        this.messageService.add({ severity: 'error', summary: 'Error', detail: backendMsg });
      }
    });
  }

  private loadProducts(): void {
    this.productsLoading = true;
    this.productService.getAllProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (products) => {
          this.products = products;
          this.productsLoading = false;
        },
        error: (err) => {
          console.error('Error loading products', err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los productos.' });
          this.products = [];
          this.productsLoading = false;
        }
      });
  }
}
