import { inject } from '@angular/core';
import {Component} from '@angular/core';
import {BehaviorSubject, firstValueFrom} from 'rxjs';
import {Author} from '../../shared/models/author.model';
import {BookService} from '../../core/services/book.service';
import {AuthorList} from './author-list/author-list';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-author-page',
  imports: [
    AuthorList,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './author-page.html',
  styleUrl: './author-page.scss',
})
export class AuthorPage {
  authors$: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>([]);
  authorName = '';
  authorSurname = '';

  private bookService = inject(BookService);
  constructor() {
    this.findAuthors();
  }

  findAuthors() {
    this.bookService.getAuthors().subscribe((a: Author[]) => this.authors$.next(a));
  }

  async addAuthor() {
    const author = {name: this.authorName, surname: this.authorSurname};
    await firstValueFrom(this.bookService.addAuthor(author));
    this.findAuthors();
  }

  onAuthorDeleted() {
    this.findAuthors();
  }
}
