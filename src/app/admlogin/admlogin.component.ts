import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, NumberValueAccessor, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { User } from '../../Model/usermodel';
// import { City } from '../Model/user.model';
import { StudentService } from '../student.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { SplitterModule } from 'primeng/splitter';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-admlogin',
  standalone: true,
  imports: [ButtonModule, RadioButtonModule, CommonModule, DialogModule, ToastModule, ConfirmPopupModule, SplitterModule, InputNumberModule, DropdownModule, RouterLink, RouterModule, RouterOutlet, InputTextModule, ReactiveFormsModule, FloatLabelModule],
  templateUrl: './admlogin.component.html',
  styleUrl: './admlogin.component.scss'
})
export class AdmloginComponent {
  stulist: User[] = [];
  eCheck : boolean = false;
  pCheck : boolean = false;

  http = inject(HttpClient);
  router = inject(Router);
  stuservice = inject(StudentService);
  // ngOnInit() : void{
  // }
  // getdata(){
  //   this.http.get<User[]>("http://localhost:3000/studentList").subscribe((res: User[]) => {
  //     this.stulist = res;
  //   })
  // }
  loginForm : FormGroup = new FormGroup({
    email : new FormControl('',[Validators.required, Validators.email]),
    pass : new FormControl('', Validators.required)
  });
  login(){
    const value = this.loginForm.value;
    // for (let i = 0; i < this.stulist.length; i++) {
      // const element = this.stulist[i];
      if(value.email == ("admin@email.com")){
        this.eCheck = true;
        if(value.pass == ("admin@123")){
          this.pCheck = true;
          // this.stuservice.setId(element.id);
          this.stuservice.setCheckAdmin(2);
          this.router.navigate(['/showdata']);            
          }        
      }
    // }
    if (this.eCheck == true) {
      if (this.pCheck == false ) {
        alert("Invalid Password...!!!");
      }
    }
    else{
      alert("Invalid Email...!!!")
    }
  }

}
