import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
   
  formdata = {name:"", email:"", password:""};
  submit = false;
  errorMessage = "";
  loading = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }


  onSubmit(){
        
        this.loading=true;

        //call signup service
        this.auth
        .signup(this.formdata.name, this.formdata.email, this.formdata.password)
        .subscribe({
          next : data => {
            //stores token from response data
            this.auth.storeToken(data.idToken);
            console.log('Sign Up idToken is ' +data.idToken);
            this.auth.canAuthenticate();
          },
          error:data=>{
            if(data.error.error.message == "INVALID_EMAIL"){
              this.errorMessage = "Invalid Email";
            } else if (data.error.error.message=="EMAIL_EXISTS"){
              this.errorMessage = "Email Already Exists!"
            } else {
              this.errorMessage = "Unknown error occured while creating this account"
            }
          }
        }).add(()=>{
            this.loading=false;
            console.log('Sign Up completed!')
        })
  }
}
