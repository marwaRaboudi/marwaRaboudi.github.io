import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalComponent } from './modal/modal.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    MapComponent,
    NavbarComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    MapComponent,
    NavbarComponent
  ]
})
export class ComponentsModule { }
