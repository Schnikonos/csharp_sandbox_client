import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { Author } from '../../shared/models/author.model';
import { Book } from '../../shared/models/book.model';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        BookService
      ]
    });
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch authors', () => {
    const mockAuthors: Author[] = [
      { id: 1, name: 'John', surname: 'Doe' },
      { id: 2, name: 'Jane', surname: 'Smith' }
    ];
    service.getAuthors().subscribe(authors => {
      expect(authors).toEqual(mockAuthors);
    });
    const req = httpMock.expectOne('/api/author/all');
    expect(req.request.method).toBe('GET');
    req.flush(mockAuthors);
  });

  it('should add an author', () => {
    const newAuthor: Author = { name: 'Alice', surname: 'Wonderland' };
    const mockResponse: Author = { id: 3, name: 'Alice', surname: 'Wonderland' };
    service.addAuthor(newAuthor).subscribe(author => {
      expect(author).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('/api/author');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newAuthor);
    req.flush(mockResponse);
  });

  it('should delete an author', () => {
    const authorId = 1;
    service.deleteAuthor(authorId).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const req = httpMock.expectOne(`/api/author/${authorId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should fetch books', () => {
    const mockBooks: Book[] = [
      { id: 1, title: 'Book One', authorId: 1 },
      { id: 2, title: 'Book Two', authorId: 2 }
    ];
    service.getBooks().subscribe(books => {
      expect(books).toEqual(mockBooks);
    });
    const req = httpMock.expectOne('/api/book');
    expect(req.request.method).toBe('GET');
    req.flush(mockBooks);
  });

  it('should add a book', () => {
    const newBook: Book = { title: 'New Book', authorId: 1 };
    const mockResponse: Book = { id: 3, title: 'New Book', authorId: 1 };
    service.addBook(newBook).subscribe(book => {
      expect(book).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('/api/book');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newBook);
    req.flush(mockResponse);
  });

  it('should delete a book', () => {
    const bookId = 1;
    service.deleteBook(bookId).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const req = httpMock.expectOne(`/api/book/${bookId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
