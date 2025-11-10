import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DayMenuService } from '@app/core/services/daymenu/daymenu-service';
import { ProductService } from '@app/core/services/products/product-service';
import { CategoryService } from '@app/core/services/category/category-service';
import { ProductSimpleResponse } from '@app/shared/models/dto/products/product-simple-response';
import { CategorySimpleResponse } from '@app/shared/models/dto/category/category-simple-response';
import { DayMenuCreateRequest } from '@app/shared/models/dto/daymenu/daymenu-create-request';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-menu',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    MultiSelectModule,
    CardModule,
    ToastModule,
    SelectModule
  ],
  templateUrl: './menu.html',
  styles: ``,
  providers: [MessageService]
})
export class Menu {
  title = 'Menús del Día';
  description = 'Historial y gestión de menús promocionales por día';

  private fb = inject(FormBuilder);
  private dayMenuService = inject(DayMenuService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private messageService = inject(MessageService);

  dayMenuForm: FormGroup;
  availableProducts = signal<Map<number, ProductSimpleResponse[]>>(new Map()); // Cambio aquí
  availableCategories = signal<CategorySimpleResponse[]>([]);
  isSubmitting = signal(false);
  loadingProducts = signal<boolean>(false); // Nuevo signal para loading

  constructor() {
    this.dayMenuForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      products: this.fb.array([], [Validators.required, Validators.minLength(1)])
    });

    this.loadAvailableCategories();
    // Removemos loadAvailableProducts ya que cargaremos por categoría
  }

  // Método para cargar productos por categoría
  loadProductsForCategory(categoryId: number): void {
    // Si ya tenemos los productos para esta categoría, no cargamos de nuevo
    if (this.availableProducts().has(categoryId)) {
      return;
    }

    this.loadingProducts.set(true);
    this.productService.getProductsByCategories([categoryId]).subscribe({
      next: (products) => {
        const currentMap = this.availableProducts();
        currentMap.set(categoryId, products);
        this.availableProducts.set(new Map(currentMap));
        this.loadingProducts.set(false);
      },
      error: (error) => {
        console.error('Error loading products for category:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los productos de esta categoría'
        });
        this.loadingProducts.set(false);
      }
    });
  }

  // Método para obtener productos filtrados por categoría
  getFilteredProducts(categoryId: number | null): ProductSimpleResponse[] {
    if (!categoryId) {
      return [];
    }
    return this.availableProducts().get(categoryId) || [];
  }

  // Método que se ejecuta cuando cambia la categoría
  onCategoryChange(categoryIndex: number) {
    const categoryControl = this.productsFormArray.at(categoryIndex);
    const categoryId = categoryControl.get('categoryId')?.value;
    const productIdsControl = categoryControl.get('productIds');

    // Resetear los productos seleccionados cuando cambia la categoría
    if (productIdsControl) {
      productIdsControl.setValue([]);
    }

    // Cargar productos para la categoría seleccionada
    if (categoryId) {
      this.loadProductsForCategory(categoryId);
    }
  }

  private loadAvailableCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.availableCategories.set(categories);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las categorías disponibles'
        });
      }
    });
  }

  onSubmit() {
    if (this.dayMenuForm.valid) {
      // Validate that selected categories and products exist
      const formValue = this.dayMenuForm.value;
      const validationErrors: string[] = [];

      formValue.products.forEach((category: { categoryId: number; productIds: number[] }, index: number) => {
        // Check if category exists
        const categoryExists = this.availableCategories().some(cat => cat.id === category.categoryId);
        if (!categoryExists) {
          validationErrors.push(`Categoría en posición ${index + 1} no existe`);
        }

        // Check if products exist
        category.productIds.forEach(productId => {
          const categoryProducts = this.availableProducts().get(category.categoryId) || [];
          const productExists = categoryProducts.some(prod => prod.id === productId);
          if (!productExists) {
            validationErrors.push(`Producto con ID ${productId} no existe en la categoría seleccionada`);
          }
        });
      });

      if (validationErrors.length > 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error de validación',
          detail: validationErrors.join(', ')
        });
        return;
      }

      this.isSubmitting.set(true);

      const today = new Date();
      const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD format

      const dayMenuRequest: DayMenuCreateRequest = {
        name: formValue.name,
        price: formValue.price,
        date: dateString,
        products: formValue.products.map((category: { categoryId: number; productIds: number[] }, index: number) => ({
          category: category.categoryId,
          position: index + 1,
          products: category.productIds
        }))
      };

      this.dayMenuService.createDayMenu(dayMenuRequest).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: response || 'Menú del día creado exitosamente'
          });
          this.dayMenuForm.reset({
            name: '',
            price: 0,
            products: []
          });
          this.isSubmitting.set(false);
        },
        error: (error) => {
          console.error('Error creating day menu:', error);
          const errorMessage = error.error?.message || error.message || 'No se pudo crear el menú del día';
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage
          });
          this.isSubmitting.set(false);
        }
      });
    } else {
      this.markFormGroupTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Validación',
        detail: 'Por favor complete todos los campos requeridos'
      });
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.dayMenuForm.controls).forEach(key => {
      const control = this.dayMenuForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.dayMenuForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return 'Este campo es requerido';
      }
      if (control.errors['minlength']) {
        return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
      }
      if (control.errors['min']) {
        return `El valor mínimo es ${control.errors['min'].min}`;
      }
    }
    return '';
  }

  get productsFormArray(): FormArray {
    return this.dayMenuForm.get('products') as FormArray;
  }

  addCategory() {
    const categoryForm = this.fb.group({
      categoryId: [null, Validators.required],
      productIds: [[], [Validators.required, Validators.minLength(1)]]
    });
    this.productsFormArray.push(categoryForm);
  }

  removeCategory(index: number) {
    this.productsFormArray.removeAt(index);
  }
}
