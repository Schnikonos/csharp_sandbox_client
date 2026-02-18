import {Component, Input, Output, EventEmitter, inject} from '@angular/core';
import {Book} from '../../../shared/models/book.model';
import {Author} from '../../../shared/models/author.model';
import {BookService} from '../../../core/services/book.service';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-book-list',
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
})
export class BookList {
  displayedColumns: string[] = ['title', 'author', 'actions'];
  @Input() books: Book[] = [];
  @Input() authors: Author[] = [];
  @Output() bookDeleted = new EventEmitter<void>();

  private bookService = inject(BookService);

  getAuthorName(authorId: number): string {
    const author = this.authors.find(a => a.id === authorId);
    return author ? `${author.name} ${author.surname}` : '';
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(() => {
      this.bookDeleted.emit();
    });
  }
}
