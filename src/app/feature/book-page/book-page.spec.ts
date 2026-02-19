import { Observable } from 'rxjs';
import { Author } from '../../shared/models/author.model';
import { Book } from '../../shared/models/book.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPage } from './book-page';

import { BookService } from '../../core/services/book.service';
import { of } from 'rxjs';

describe('BookPage', () => {
  let component: BookPage;
  let fixture: ComponentFixture<BookPage>;
  let bookServiceMock: { getBooks: () => Observable<Book[]>; getAuthors: () => Observable<Author[]>; addBook: () => Observable<Book>; deleteBook: () => Observable<void> };

  beforeEach(async () => {
    bookServiceMock = {
      getBooks: () => of([] as Book[]),
      getAuthors: () => of([] as Author[]),
      addBook: () => of({} as Book),
      deleteBook: () => of(undefined)
    };
    await TestBed.configureTestingModule({
      imports: [BookPage],
      providers: [{ provide: BookService, useValue: bookServiceMock }]
    }).compileComponents();
    fixture = TestBed.createComponent(BookPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
