import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../book';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit{
  book: BehaviorSubject<Book> = new BehaviorSubject({});
 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) { }



ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  if (!id) {
    alert('No id provided');
}
this.apiService.getBook(id !).subscribe((book) => {
  this.book.next(book);
});
}

editBook(book: Book) {
  this.apiService.updateBook(this.book.value._id || '', book)
    .subscribe({
      next: () => {
        this.router.navigate(['/books']);
      },
      error: (error) => {
        alert('Failed to update book');
        console.error(error);
      }
    })
}

}
