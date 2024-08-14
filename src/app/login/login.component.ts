import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, NumberValueAccessor, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
// import { User } from '../Model/user.model';
// import { City } from '../Model/user.model';
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
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, RadioButtonModule, CommonModule, DialogModule, ToastModule, ConfirmPopupModule, SplitterModule, InputNumberModule, DropdownModule, RouterLink, RouterModule, RouterOutlet, InputTextModule, ReactiveFormsModule, FloatLabelModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  visible = false;
  
  showLog(){
    this.visible = true;
  }

    userForm: FormGroup = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    gender: new FormControl(''),
    mobile: new FormControl(null, [Validators.required, Validators.min(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormGroup({
      city: new FormControl('', Validators.required),
      post: new FormControl(''),
      ps: new FormControl(''),
      pinno: new FormControl(null, Validators.required),
      state: new FormControl('', Validators.required),
    })
  });
}
