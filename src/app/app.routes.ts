import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StuloginComponent } from './stulogin/stulogin.component';
import { AdmloginComponent } from './admlogin/admlogin.component';
import { ShowdataComponent } from './showdata/showdata.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';

export const routes: Routes = [
    {path: '', component:LoginComponent},
    {path:'slogin', component:StuloginComponent},
    {path:'alogin', component:AdmloginComponent},
    {path:'showdata', component:ShowdataComponent},
    {path:'forgotPass', component: ForgotpassComponent}
];
