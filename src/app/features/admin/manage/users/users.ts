import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { MultiSelectModule } from 'primeng/multiselect';
import { UserResponse } from '@app/shared/models/dto/users/user-response.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '@app/core/services/users/user-service';
import { CreateUserRequest } from '@app/shared/models/dto/users/create-user-request.model';
import { AreaService } from '@app/core/services/areas/area-service';
import { AreaSimpleResponse } from '@app/shared/models/dto/areas/area-simple-response';
import { MessageService } from 'primeng/api';
import { FormValidation } from '@app/shared/components/form/form-validation';

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    IftaLabelModule,
    ReactiveFormsModule,
    InputIconModule,
    IconFieldModule,
    MultiSelectModule,
    FormValidation,
  ],
  templateUrl: './users.html',
  styles: ``,
})
export class Users implements OnInit {
  title = 'Administracion de usuarios';
  description = 'Gestión completa de todos los usuarios/empleados del restaurante';

  users: UserResponse[] = [];
  availableAreas: AreaSimpleResponse[] = [];
  /**
   * the form is on editing mode?
   */
  editing: boolean = false;

  userForm: FormGroup = new FormGroup({
    document: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    areas: new FormControl([], []),
  });

  creationModalVisible = false;
  modificationModalVisible = false;

  constructor(
    private userService: UserService,
    private areaService: AreaService,
    private messageService: MessageService
  ) {
    //
  }

  ngOnInit(): void {
    this.searchForUsers();
    this.searchForAreas();
  }

  closeModals() {
    this.modificationModalVisible = false;
    this.creationModalVisible = false;
  }

  showModificationModal(data: UserResponse) {
    this.closeModals();
    this.fillFormWithData(data);
    this.editing = true;
    // this.modificationModalVisible = true;
    this.creationModalVisible = true;
  }

  showCreationModal() {
    this.closeModals();
    this.clearForm();
    this.editing = false;
    this.creationModalVisible = true;
  }

  createUser() {
    this.userService.createUser(this.formToRequest()).subscribe(() => {
      this.closeModals();
      this.searchForUsers();
      this.messageService.add({
        severity: 'success',
        summary: 'Operacion exitosa.',
        detail: 'El usuario ha sido creado exitosamente.',
        life: 3000,
      });
    });
  }
  
  updateUser() {
    this.userService.updateUser(this.formToRequest()).subscribe(() => {
      this.closeModals();
      this.searchForUsers();
      this.messageService.add({
        severity: 'success',
        summary: 'Operacion exitosa.',
        detail: 'El usuario ha sido actualizado exitosamente.',
        life: 3000,
      });
    });
  }
  
  deleteUser(document: string) {
    this.userService.deleteUser(document).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Operacion exitosa.',
        detail: 'El usuario ha sido eliminado exitosamente.',
        life: 3000,
      });
      this.searchForUsers();
    });
  }

  private fillFormWithData(data: UserResponse): void {
    this.userForm.setValue({ ...data, areas: data.areas.map(a => a.id), password: '' });
    console.log("areas => ");
    console.log(this.userForm.get('areas')?.value);
  }

  private clearForm(): void {
    this.userForm.reset();
  }

  private formToRequest(): CreateUserRequest {
    return {
      document: this.userForm.get('document')?.value,
      name: this.userForm.get('name')?.value,
      email: this.userForm.get('email')?.value,
      phone: this.userForm.get('phone')?.value,
      address: this.userForm.get('address')?.value,
      password: this.userForm.get('password')?.value,
      areas: this.userForm.get('areas')?.value,
    };
  }

  private searchForUsers(): void {
    this.userService.getUsers().subscribe((res) => {
      this.users = res;
      console.log(this.users);
    });
  }

  private searchForAreas(): void {
    this.areaService.getAreas().subscribe((res) => {
      this.availableAreas = res;
      console.log(this.availableAreas);
    });
  }

  public isValidField(field: string) {
    return this.userForm.get(field)?.valid && this.userForm.get(field)?.touched;
  }
}
