import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AreaService } from '@app/core/services/areas/area-service';
import { CategoryService } from '@app/core/services/category/category-service';
import { ProductService } from '@app/core/services/products/product-service';
import { FormValidation } from '@app/shared/components/form/form-validation';
import { AreaSimpleResponse } from '@app/shared/models/dto/areas/area-simple-response';
import { CategorySimpleResponse } from '@app/shared/models/dto/category/category-simple-response';
import { ProductReponse } from '@app/shared/models/dto/products/product-response';
import { ProductSimpleResponse } from '@app/shared/models/dto/products/product-simple-response';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ProgressSpinnerModule,
    ButtonModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    TextareaModule,
    SelectModule,
    MultiSelectModule,
    IftaLabelModule,
    DialogModule,
    ReactiveFormsModule,
    FormValidation,
    InputNumberModule,
  ],
  templateUrl: './products.html',
  styles: ``,
})
export class Products implements OnInit {
  title = 'Carta de Productos';
  description = 'Gestión completa de todos los productos del restaurante';

  currencyFormat = Intl.NumberFormat('es-Co', {
    style: 'currency',
    currency: 'COP',
  });

  products?: ProductSimpleResponse[];
  availablePreparationAreas: AreaSimpleResponse[] = [];
  availableCategories?: CategorySimpleResponse[] = undefined;

  modalIsOpen = false;
  modalMode: 'edit' | 'create' = 'create';

  formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    id: [null],
    name: ['', Validators.required],
    price: ['', [Validators.required, Validators.min(0)]],
    active: [true, [Validators.required]],
    preparationTime: [false, [Validators.required, Validators.min(0)]],
    preparationArea: [null, [Validators.required]],
    description: [''],
    categories: [[]],
  });

  filterCategories = new FormControl<number[]>([], []);

  constructor(
    private productService: ProductService,
    private areaService: AreaService,
    private categoryService: CategoryService
  ) {
    //
  }

  ngOnInit(): void {
    this.refreshProducts();

    this.areaService.getAreas().subscribe((res) => {
      this.availablePreparationAreas = res;
    });
    this.checkForCategories();
  }

  createProduct(): void {
    this.productService
      .createProduct({
        name: this.form.get('name')?.value,
        description: this.form.get('description')?.value,
        price: this.form.get('price')?.value,
        preparationTime: this.form.get('preparationTime')?.value,
        preparationArea: this.form.get('preparationArea')?.value,
      })
      .subscribe(() => {
        this.refreshProducts();
        this.closeModal();
      });
  }

  updateProduct(): void {
    this.productService
      .updateProduct({
        id: this.form.get('id')?.value,
        name: this.form.get('name')?.value,
        description: this.form.get('description')?.value,
        price: this.form.get('price')?.value,
        preparationTime: this.form.get('preparationTime')?.value,
        preparationArea: this.form.get('preparationArea')?.value,
        active: this.form.get('active')?.value,
        categories: this.form.get('categories')?.value,
      })
      .subscribe(() => {
        this.refreshProducts();
        this.closeModal();
      });
  }

  filterProducts(): void {
    const nums: null | number[] = this.filterCategories.value;

    if (nums === null || nums.length == 0) {
      this.refreshProducts();
    } else {
      this.productService.filterByCategories(nums).subscribe((res) => {
        this.products = res;
      });
    }
  }

  showCreationModal() {
    this.checkForCategories();
    this.clearForm();
    this.modalMode = 'create';
    this.modalIsOpen = true;
  }

  /**
   * @param id id of the product to edit
   */
  showModificationModal(id: number) {
    this.checkForCategories();
    this.clearForm();
    this.loadProductFullData(id);
    this.modalMode = 'edit';
    this.modalIsOpen = true;
  }

  closeModal() {
    this.modalIsOpen = false;
  }

  clearForm() {
    this.form.reset();
  }

  isInvalidField(field: string) {
    const control = this.form.get(field);

    return control?.invalid && control?.touched && control?.dirty;
  }

  private refreshProducts() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }

  private loadProductFullData(id: number): void {
    this.productService.findProduct(id).subscribe((res) => {
      this.fillFormWithProductData(res);
    });
  }

  private fillFormWithProductData(data: ProductReponse): void {
    this.form.get('id')?.setValue(data.id);
    this.form.get('name')?.setValue(data.name);
    this.form.get('price')?.setValue(data.price);
    this.form.get('description')?.setValue(data.description);
    this.form.get('active')?.setValue(data.active);
    this.form.get('preparationTime')?.setValue(data.preparationTime);
    this.form.get('preparationArea')?.setValue(data.preparationArea.id);
    this.form.get('categories')?.setValue(data.categories.map((c) => c.id));
  }

  private checkForCategories() {
    if (this.availableCategories == undefined) {
      this.categoryService.getCategories().subscribe((res) => {
        this.availableCategories = res;
      });
    }
  }
}
