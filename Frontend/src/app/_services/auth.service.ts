import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router, private http : HttpClient) { }

  isAuthenticated():boolean{
    if (sessionStorage.getItem('token')!==null) {
      return true;
    }
    return false; 
  }

 canAccess(){
  if (!this.isAuthenticated()) {
    //redirect to login
    this.router.navigate(['/login']);
  }
 }

 signup(name:string,email:string,password:string){
   //send data to register api 

   return this.http
   .post<{idToken:string}>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjopNbPoweYmndGx5Rj17RYfztZaDdzlA',
   {displayName:name, email:email,password:password}
   );
 }


storeToken(token:string){
    sessionStorage.setItem('token',token);
}

login(email:String, password:string){
  //send data to login api

  return this.http
  .post<{idToken:string}>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjopNbPoweYmndGx5Rj17RYfztZaDdzlA',
   {email:email, password:password})
};

canAuthenticate(){
  if (this.isAuthenticated()) {
    //redirect to library
    this.router.navigate(['/books']);
  }
}

removeToken(){
  sessionStorage.removeItem('token');
}

}
