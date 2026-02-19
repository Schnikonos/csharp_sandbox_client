import { Observable } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookList } from './book-list';
import { BookService } from '../../../core/services/book.service';
// Removed unused imports
import { of } from 'rxjs';

describe('BookList', () => {
  let component: BookList;
  let fixture: ComponentFixture<BookList>;
  let bookServiceMock: { deleteBook: (id?: number) => Observable<void> };

  beforeEach(async () => {
    bookServiceMock = {
      deleteBook: vi.fn(() => of(undefined))
    };
    await TestBed.configureTestingModule({
      imports: [BookList],
      providers: [{ provide: BookService, useValue: bookServiceMock }]
    }).compileComponents();
    fixture = TestBed.createComponent(BookList);
    component = fixture.componentInstance as BookList;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit bookDeleted when deleteBook is called', () => {
    const emitSpy = vi.spyOn(component.bookDeleted, 'emit');
    component.deleteBook(1);
    expect(bookServiceMock.deleteBook).toHaveBeenCalledWith(1);
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should return author name for valid authorId', () => {
    component.authors = [
      { id: 1, name: 'John', surname: 'Doe' },
      { id: 2, name: 'Jane', surname: 'Smith' }
    ];
    expect(component.getAuthorName(1)).toBe('John Doe');
    expect(component.getAuthorName(2)).toBe('Jane Smith');
  });

  it('should return empty string for invalid authorId', () => {
    component.authors = [
      { id: 1, name: 'John', surname: 'Doe' }
    ];
    expect(component.getAuthorName(999)).toBe('');
  });
});
