import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { EmailValidator, FormControl, FormControlName, FormGroup, FormsModule, NumberValueAccessor, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { User } from '../../Model/usermodel';
// import { City } from '../Model/user.model'
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
  selector: 'app-forgotpass',
  standalone: true,
  imports: [ButtonModule, RadioButtonModule, CommonModule, DialogModule, ToastModule, ConfirmPopupModule, SplitterModule, InputNumberModule, DropdownModule, RouterLink, RouterModule, RouterOutlet, InputTextModule, ReactiveFormsModule, FloatLabelModule],
  templateUrl: './forgotpass.component.html',
  styleUrl: './forgotpass.component.scss'
})
export class ForgotpassComponent {
  passCheck: boolean = false;
  stulist: User[] = [];

  router = inject(Router);
  http = inject(HttpClient);
  messageService = inject(MessageService);

  passForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    date: new FormControl('', Validators.required),
    mobile: new FormControl(null, Validators.required),
    password: new FormControl('', Validators.required)

  })

  ngOnInit(): void {
    this.getdata();
  }
  getdata() {
    this.http.get<User[]>("http://localhost:3000/studentList").subscribe((res: User[]) => {
      this.stulist = res;
    })
  }

  onSubmit(form: FormGroup) {
    const value = this.passForm.value;
    for (let i = 0; i < this.stulist.length; i++) {
      const element = this.stulist[i];
      if (value.email == element.email) {
        if ((value.date == element.date) && (value.mobile == element.mobile)) {
          this.passCheck = true;
          this.http.patch("http://localhost:3000/studentList/" + `${element.id}`, { password: value.password }).subscribe(() => {
            alert("Password Changed");
            this.router.navigate(['/slogin']);
          })
        }
      }
    }
    if (!this.passCheck) {
      alert("Record doesn't match");
    }

    // console.log(obj);
    form.reset();
    
  }
  cancel(form: FormGroup) {
    // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have Cancelled', life: 2000 });
    form.reset();
    this.router.navigate(['/slogin']);
  }

}
