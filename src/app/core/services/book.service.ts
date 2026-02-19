import {inject, Injectable} from '@angular/core';
import {Author} from '../../shared/models/author.model';
import {Book} from '../../shared/models/book.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);

  public getAuthors() {
    return this.http.get<Author[]>('/api/author/all');
  }

  public addAuthor(author: Author) {
    return this.http.post<Author>('/api/author', author);
  }

  public deleteAuthor(id: number) {
    return this.http.delete(`/api/author/${id}`);
  }
    // Book methods
    public getBooks() {
      return this.http.get<Book[]>('/api/book');
    }

    public addBook(book: Book) {
      return this.http.post<Book>('/api/book', book);
    }

    public deleteBook(id: number) {
      return this.http.delete(`/api/book/${id}`);
    }
}
