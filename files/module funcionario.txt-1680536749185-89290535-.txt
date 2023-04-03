import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioComponent } from '../funcionario/funcionario.component';
import { FuncionarioFormComponent } from './funcionario-form/funcionario-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FuncionarioListComponent } from './funcionario-list/funcionario-list.component';
import { FuncionarioDetailedComponent } from './funcionario-detailed/funcionario-detailed.component';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FuncionarioComponent,
    FuncionarioFormComponent,
    FuncionarioListComponent,
    FuncionarioDetailedComponent,
  ],
  exports: [
    FuncionarioComponent,
    FuncionarioFormComponent,
    FuncionarioListComponent
  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class FuncionarioModule { }
