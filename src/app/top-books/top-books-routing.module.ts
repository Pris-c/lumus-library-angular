import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopBooksComponent } from './top-books.component';

const routes: Routes = [{ path: '', component: TopBooksComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopBooksRoutingModule { }
