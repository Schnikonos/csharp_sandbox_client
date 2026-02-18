
import {AfterViewInit, Component} from '@angular/core';
import {BehaviorSubject, firstValueFrom} from 'rxjs';
import {Book} from '../../shared/models/book.model';
import {Author} from '../../shared/models/author.model';
import {BookService} from '../../core/services/book.service';
import {BookList} from './book-list/book-list';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {NgFor} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-book-page',
  imports: [
    BookList,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelectModule,
    MatOptionModule,
    NgFor,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './book-page.html',
  styleUrl: './book-page.scss',
})
export class BookPage {
  books$: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  authors$: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>([]);
  bookTitle: string = '';
  selectedAuthorId: number | null = null;

  constructor(private bookService: BookService) {
    this.findBooks();
    this.findAuthors();
  }

  findBooks() {
    this.bookService.getBooks().subscribe(b => this.books$.next(b));
  }

  findAuthors() {
    this.bookService.getAuthors().subscribe(a => this.authors$.next(a));
  }

  async addBook() {
    if (!this.bookTitle || this.selectedAuthorId == null) return;
    const book = {title: this.bookTitle, authorId: this.selectedAuthorId} as Partial<Book>;
    await firstValueFrom(this.bookService.addBook(book));
    this.bookTitle = '';
    this.selectedAuthorId = null;
    this.findBooks();
  }

  onBookDeleted() {
    this.findBooks();
  }
}
