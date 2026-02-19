import { Observable } from 'rxjs';
import { Author } from '../../shared/models/author.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorPage } from './author-page';

import { BookService } from '../../core/services/book.service';
import { of } from 'rxjs';

describe('AuthorPage', () => {
  let component: AuthorPage;
  let fixture: ComponentFixture<AuthorPage>;
  let bookServiceMock: { getAuthors: () => Observable<Author[]>; addAuthor: () => Observable<Author>; deleteAuthor: () => Observable<void> };

  beforeEach(async () => {
    bookServiceMock = {
      getAuthors: () => of([] as Author[]),
      addAuthor: () => of({} as Author),
      deleteAuthor: () => of(undefined)
    };
    await TestBed.configureTestingModule({
      imports: [AuthorPage],
      providers: [{ provide: BookService, useValue: bookServiceMock }]
    }).compileComponents();
    fixture = TestBed.createComponent(AuthorPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
