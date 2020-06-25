import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from "app/products/add-product/add-product.component";
import { SplitkeyPipe } from "app/splitkey.pipe";
import {NgxPaginationModule} from 'ngx-pagination';
import { ToastrModule } from 'ng6-toastr-notifications';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatRadioModule,
  MatCheckboxModule
} from '@angular/material';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [AddProductComponent,SplitkeyPipe],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatRadioModule,
    MatCheckboxModule,
     ReactiveFormsModule,
      ToastrModule.forRoot(),
  ],
  exports:[AddProductComponent, SplitkeyPipe]
})
export class SharedModule { }
