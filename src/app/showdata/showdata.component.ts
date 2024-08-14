import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, NumberValueAccessor, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { User } from '../../Model/usermodel';
import { City } from '../../Model/usermodel';
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
  selector: 'app-showdata',
  standalone: true,
  imports: [RouterOutlet, InputTextModule, FormsModule, ReactiveFormsModule, FloatLabelModule, ButtonModule, RadioButtonModule, CommonModule, DialogModule, HttpClientModule, InputTextModule, ToastModule, ConfirmPopupModule, SplitterModule, InputNumberModule, DropdownModule, RouterModule, RouterLink],
  templateUrl: './showdata.component.html',
  styleUrl: './showdata.component.scss'
  
})
export class ShowdataComponent {
  visible: boolean = false;

  stulist: User[] = [];
  stulist2: User[] = [];
  isSubUp: boolean = true;
  id: number = 0;
  cities: City[] | undefined;
  checkAdm: number = 0;
  sid: number = 0;

  stuservice = inject(StudentService);
  http = inject(HttpClient);
  route = inject(Router);

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) { }

  cancel(form: FormGroup) {
    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have Cancelled', life: 2000 });
    form.reset();
    this.isSubUp = true;
  }


  showDialog() {
    // console.log("showdialog called");
    this.visible = true;
  }

  ngOnInit(): void {
    this.cityInitialize();
    this.checkAdm = this.stuservice.getCheckAdmin();
    this.sid = this.stuservice.getId();
    console.log(this.checkAdm);
    if (this.checkAdm == 2) {
      this.getData();
    }
    else if(this.checkAdm == 1) {
      this.getOneData();
    }
    else{
      this.route.navigate(['']);
    }

  }

  
  userForm: FormGroup = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    gender: new FormControl(''),
    mobile: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    address: new FormGroup({
      city: new FormControl(''),
      post: new FormControl(''),
      ps: new FormControl(''),
      pinno: new FormControl(null, Validators.required),
      state: new FormControl('', Validators.required),
    })
  });
  takeInput() {
    return this.userForm.value;
  }
  getData() {
    this.http.get<User[]>("http://localhost:3000/studentList").subscribe((res: User[]) => {
      this.stulist = res;
      // console.log(res);
    })
  }
  getOneData() {
    this.http.get<User>("http://localhost:3000/studentList/" + `${this.sid}`).subscribe((res: User) => {
      this.stulist2 = [res];
      // alert("called");
      console.log(this.stulist2);

    })
  }
  onSubmit(form: FormGroup) {
    // debugger;
    if (this.checkAdm == 2) {
      const obj = this.takeInput();
      // alert("called");
      this.http.post<User>("http://localhost:3000/studentList", obj).subscribe((res: User) => {
        this.getData();
      })
      // console.log(obj);
      form.reset();
      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Submitted', life: 2000 });
    }
  }
  editData(tmpid: number, data: User) {
    // Forms data can be fetched from the database(here json-server) in many ways the 3 ways are
    // No. 1;
    // this.userForm.controls['fname'].setValue(data.fname);
    // this.userForm.controls['lname'].setValue(data.lname);
    // this.userForm.controls['date'].setValue(data.date);
    // this.userForm.controls['gender'].setValue(data.gender);
    // this.userForm.controls['mobile'].setValue(data.mobile);
    // this.userForm.controls['email'].setValue(data.email);

    // No. 2;
    this.http.get<User>("http://localhost:3000/studentList/" + `${tmpid}`).subscribe((res: User) => {
      // this.userForm = new FormGroup({
      //   fname: new FormControl(res.fname),
      //   lname: new FormControl(res.lname),
      //   date: new FormControl(res.date),
      //   gender: new FormControl(res.gender),
      //   mobile: new FormControl(res.mobile),
      //   email: new FormControl(res.email),
      //   password: new FormControl(res.password),
      //   address: new FormGroup({
      //     city: new FormControl(res.address.city),
      //     post: new FormControl(res.address.post),
      //     ps: new FormControl(res.address.ps),
      //     pinno: new FormControl(res.address.pinno),
      //     state: new FormControl(res.address.state),
      //   })
      // });

      // No. 3;
      this.userForm.patchValue({
        fname: res.fname,
        lname: res.lname,
        date: res.date,
        gender: res.gender,
        mobile: res.mobile,
        email: res.email,
        password: res.password,
        address: {
          city: res.address.city,
          post: res.address.post,
          ps: res.address.ps,
          pinno: res.address.pinno,
          state: res.address.state,
        }
      });
      this.userForm.markAllAsTouched();
      this.userForm.markAsDirty();
    });
    this.id = tmpid;
    this.isSubUp = false;
    this.visible = true;
  }
  update(form: FormGroup) {
      const obj2 = this.takeInput();
      this.http.put("http://localhost:3000/studentList/" + `${this.id}`, obj2).subscribe(() => {
        if (this.checkAdm) {
          this.getData();
        } else {
          this.getOneData();
        }
      })
    form.reset();
    this.isSubUp = true;
    this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Updated', life: 2000 });
  }
  delData(tmpid: number) {
      this.http.delete("http://localhost:3000/studentList/" + `${tmpid}`).subscribe(() => {
        if (this.checkAdm == 2) {
          this.getData();
        } else if(this.checkAdm == 1){
          this.getOneData();
        }
      })
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 2000 });
  }
  confirm2(event: Event, tmpid: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.delData(tmpid);
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 2000 });
      }
    });
  }
  cityInitialize() {
    this.cities = [
      { name: 'Andhra Pradesh' },
      { name: 'Arunachal Pradesh' },
      { name: 'Assam' },
      { name: 'Bihar' },
      { name: 'Chhattisgarh' },
      { name: 'Goa' },
      { name: 'Gujarat' },
      { name: 'Haryana' },
      { name: 'Himachal Pradesh' },
      { name: 'Jharkhand' },
      { name: 'Karnataka' },
      { name: 'Kerala' },
      { name: 'Madhya Pradesh' },
      { name: 'Maharashtra' },
      { name: 'Manipur' },
      { name: 'Meghalaya' },
      { name: 'Mizoram' },
      { name: 'Nagaland' },
      { name: 'Odisha' },
      { name: 'Punjab' },
      { name: 'Rajasthan' },
      { name: 'Sikkim' },
      { name: 'Tamil Nadu' },
      { name: 'Telangana' },
      { name: 'Tripura' },
      { name: 'Uttar Pradesh' },
      { name: 'Uttarakhand' },
      { name: 'West Bengal' }

    ];
  }

}
