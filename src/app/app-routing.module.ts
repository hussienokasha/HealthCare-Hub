import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CartComponent } from "./Features/Views/cart/cart.component";
import { ContactComponent } from "./Features/Views/contact/contact.component";
import { DoctorDashComponent } from "./Features/Views/Dashboards/doctor-dash/doctor-dash.component";
import { AppointmentsComponent } from "./Features/Views/Dashboards/lab-dash/appointments/appointments.component";
import { FeedbackComponent } from "./Features/Views/Dashboards/lab-dash/feedback/feedback.component";
import { LabDashComponent } from "./Features/Views/Dashboards/lab-dash/lab-dash.component";
import { LabTestsComponent } from "./Features/Views/Dashboards/lab-dash/lab-tests/tests.component";
import { NursesComponent } from "./Features/Views/Dashboards/lab-dash/nurses/nurses.component";
import { NurseDashComponent } from "./Features/Views/Dashboards/nurse-dash/nurse-dash.component";
import { DoctorsComponent } from "./Features/Views/doctors/doctors.component";
import { ForgetPasswordComponent } from "./Features/Views/forget-password/forget-password.component";
import { HomeComponent } from "./Features/Views/home/home.component";
import { LabsComponent } from "./Features/Views/labs/labs.component";
import { LoginComponent } from "./Features/Views/login/login.component";
import { NotFoundComponent } from "./Features/Views/not-found/not-found.component";
import { PharmacyComponent } from "./Features/Views/pharmacies/pharmacies.component";
import { ProfileSittingComponent } from "./Features/Views/profile-sitting/profile-sitting.component";
import { ResetPasswordComponent } from "./Features/Views/reset-password/reset-password.component";
import { SignupComponent } from "./Features/Views/signup/signup.component";
import { TestsComponent } from "./Features/Views/tests/tests.component";
import { VerifyEmailComponent } from "./Features/Views/verify-email/verify-email.component";
import { AdminDashComponent } from "./Features/Views/Dashboards/admin-dash/admin-dash.component";
import { SharedModule } from "./Shared/shared.module";
import { CheckoutComponent } from "./Features/Views/checkout/checkout.component";
import { TestDetailsComponent } from "./Features/Views/test-details/test-details.component";
import { ManageDoctorsComponent } from "./Features/Views/Dashboards/admin-dash/manage-doctors/manage-doctors.component";
import { ManageLabsComponent } from "./Features/Views/Dashboards/admin-dash/manage-labs/manage-labs.component";
import { ManageMedicineComponent } from "./Features/Views/Dashboards/admin-dash/manage-medicine/manage-medicine.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'labs', component: LabsComponent },
  { path: 'tests', component: TestsComponent },
  { path: 'test/:id', component: TestDetailsComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'pharmacy', component: PharmacyComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'dashboard/nurse', component: NurseDashComponent },
  { path: 'dashboard/doctor', component: DoctorDashComponent },
  {
    path: 'dashboard/admin-lab', component: LabDashComponent, children: [
      { path: 'appointment', component: AppointmentsComponent, },
      { path: 'nurses', component: NursesComponent, },
      { path: 'lab-tests', component: LabTestsComponent, },
      { path: 'feedback', component: FeedbackComponent, },
    ]
  },
  { path: 'dashboard/admin', component: AdminDashComponent ,children:[
    {path:'manage-doctors',component:ManageDoctorsComponent},
    {path:'manage-labs',component:ManageLabsComponent},
    {path:'manage-medicine',component:ManageMedicineComponent},
  ]},
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'verify', component: VerifyEmailComponent },
  { path: 'ForgetPassword', component: ForgetPasswordComponent },
  { path: 'ResetPassword', component: ResetPasswordComponent },
  { path: 'ChangePassword', component: ResetPasswordComponent },
  { path: 'profile', component: ProfileSittingComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
