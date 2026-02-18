import {Component, Input, Output, EventEmitter, inject} from '@angular/core';
import {Author} from '../../../shared/models/author.model';
import {BookService} from '../../../core/services/book.service';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-author-list',
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './author-list.html',
  styleUrl: './author-list.scss',
})
export class AuthorList {
  displayedColumns: string[] = ['name', 'surname', 'actions'];
  @Input() authors: Author[] = [];
  @Output() authorDeleted = new EventEmitter<void>();

  private bookService = inject(BookService);

  deleteAuthor(id: number) {
    this.bookService.deleteAuthor(id).subscribe(() => {
      this.authorDeleted.emit();
    });
  }
}
