import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorList } from './author-list';
import { BookService } from '../../../core/services/book.service';
// Removed unused 'id' variable
import { of } from 'rxjs';

describe('AuthorList', () => {
  let component: AuthorList;
  let fixture: ComponentFixture<AuthorList>;
  let bookServiceSpy: { deleteAuthor: (id: number) => void }; // Changed 'any' to 'void'

  beforeEach(async () => {
    bookServiceSpy = {
      deleteAuthor: vi.fn(() => of({}))
    };
    await TestBed.configureTestingModule({
      imports: [AuthorList],
      providers: [{ provide: BookService, useValue: bookServiceSpy }]
    }).compileComponents();
    fixture = TestBed.createComponent(AuthorList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit authorDeleted when deleteAuthor is called', () => {
    const emitSpy = vi.spyOn(component.authorDeleted, 'emit');
    component.deleteAuthor(1);
    expect(bookServiceSpy.deleteAuthor).toHaveBeenCalledWith(1);
    expect(emitSpy).toHaveBeenCalled();
  });
});
