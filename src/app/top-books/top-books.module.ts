import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopBooksRoutingModule } from './top-books-routing.module';
import { TopBooksComponent } from './top-books.component';


@NgModule({
  declarations: [
    TopBooksComponent
  ],
  imports: [
    CommonModule,
    TopBooksRoutingModule
  ]
})
export class TopBooksModule { }
