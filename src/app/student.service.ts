import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }
  private id : number = 0;
  private isAdmin : number = 0;

  setId(sid : number){
    this.id = sid;
  }
  setCheckAdmin(check : number)
  {
    this.isAdmin = check;
  }
  getCheckAdmin(){
    return this.isAdmin;
  }

  getId(){
    return this.id;
  }
}
