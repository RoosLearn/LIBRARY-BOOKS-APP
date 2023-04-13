import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../book';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-add-book',
   templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  constructor(private router : Router,
    private apiService : ApiService){ }

    addBook(book: Book) {
      this.apiService.createBook(book)
        .subscribe({
          next: () => {
            this.router.navigate(['/books']);
          },
          error: (error) => {
            alert("Failed to create Book");
            console.error(error);
          }
        });
    }

}
