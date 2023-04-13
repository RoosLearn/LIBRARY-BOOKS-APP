import { Component,  ViewChild, OnInit} from '@angular/core';
import { AuthService } from '../_services/auth.service';

import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../_services/api.service';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Book } from '../book';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  books$: Observable<Book[]> = new Observable();
 
  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
    this.fetchBooks();
  }

  deleteBook(id: string): void {
    this.apiService.deleteBook(id).subscribe({
      next: () => this.fetchBooks()
    });
  }
  
  private fetchBooks(): void {
    this.books$ = this.apiService.getBooks();
  }
  }
  


  

 

 