import { Routes } from '@angular/router';
import {BookPage} from './feature/book-page/book-page';
import {AuthorPage} from './feature/author-page/author-page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full'
  }, {
    path: 'author',
    component: AuthorPage
  }, {
    path: 'books',
    component: BookPage
  }
];
