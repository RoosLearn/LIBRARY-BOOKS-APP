import { Component , Inject, inject, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../_services/api.service';
import { BehaviorSubject } from 'rxjs';

import { Book } from '../book';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{

  @Input()
  initialState: BehaviorSubject<Book> = new BehaviorSubject({});
  
  @Output()
  formValuesChanged = new EventEmitter<Book>();
  
  @Output()
  formSubmitted = new EventEmitter<Book>();
  
  bookForm: FormGroup = new FormGroup({});
  
  constructor(private fb: FormBuilder) { }
  
  get name() { return this.bookForm.get('name')!; }
  get author() { return this.bookForm.get('author')!; }
  get genre() { return this.bookForm.get('genre')!; }
  get year() { return this.bookForm.get('year')!; }
  

 ngOnInit(): void {
  this.initialState.subscribe(book => {
    this.bookForm = this.fb.group({
      name: [ book.name, [Validators.required] ],
      author : [ book.author, [ Validators.required, Validators.minLength(3) ] ],
      genre : [ book.genre, [Validators.required] ],
      year : [ book.year, [Validators.required] ]
    });
  });

  this.bookForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
}
submitForm() {
  this.formSubmitted.emit(this.bookForm.value);
}
}


   








